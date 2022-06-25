<?php declare(strict_types = 1);

namespace App;

use Latte\CompileException;
use Latte\Engine;
use Latte\Loaders\StringLoader;
use Nette\Http\Request;
use Nette\Http\RequestFactory;
use Nette\Http\Response;
use Nette\Utils\Json;
use Throwable;

final class App
{
	private const MAX_LENGTH = 10000;

	private Engine $latte;

	private Request $request;

	private function __construct()
	{
		$this->latte = new Engine();
		$this->latte->setLoader(new StringLoader());
		$this->latte->setTempDirectory(Utils::getTmp());

		$this->request = (new RequestFactory())->fromGlobals();
		$this->response = new Response();
	}

	public static function create(): self
	{
		return new self();
	}

	public function run(): void
	{
		$this->setupCors();

		$input = null;
		if ($this->request->isMethod('GET')) {
			$input = $this->request->getQuery('code');
		} else if ($this->request->isMethod('POST')) {
			$input = $this->request->getRawBody();
		}

		$res = [
			'version' => Engine::VERSION,
		];

		if ($input === null) {
			$res['error'] = ['message' => 'No code given'];
			$this->send($res, 400);

		} elseif (strlen($input) > self::MAX_LENGTH) {
			$res['error'] = ['message' => 'Code is too long'];
			$this->send($res, 400);
		}

		set_error_handler(function (int $severity, string $message) use (& $res) {
			if (error_reporting() & $severity) {
				$res['error'] ??= ['message' => $message];
			}
		});

		try {
			$res['output'] = $this->process($input);
			$this->send($res);

		} catch (CompileException $e) {
			$res['error'] = [
				'message' => $e->getMessage(),
				'line' => $e->position?->line,
				'column' => $e->position?->column,
			];
			$this->send($res, 422);

		} catch (Throwable $e) {
			$res['error'] = ['message' => $e->getMessage()];
			$this->send($res, 500);
		}
	}

	private function process(string $input): string
	{
		$output = $this->latte->renderToString($input);

		// Save input/output
		if (Utils::getStorer() !== null) {
			$this->store($input, $output);
		}

		return $output;
	}

	private function store(string $input, string $output): void
	{
		try {
			$data = Json::encode([
				'input' => $input,
				'output' => $output,
				'version' => Engine::VERSION,
			]);

			$ctx = stream_context_create([
				'http' => [
					'method' => 'POST',
					'timeout' => 1,
					'header' => implode("\r\n", [
						"Content-type: application/json",
						"Content-Length: " . strlen($data),
					]),
					'content' => $data,
				],
			]);
			file_get_contents(Utils::getStorer(), false, $ctx);
		} catch (Throwable $e) {
			fwrite(fopen('php://stdout', 'w'), $e->getMessage() . PHP_EOL);
		}
	}

	private function setupCors(): void
	{
		$this->response->addHeader('Access-Control-Allow-Origin', '*');
		$this->response->addHeader('Access-Control-Allow-Methods', '*');
		$this->response->addHeader('Access-Control-Allow-Headers', '*');
	}

	/**
	 * @return no-return
	 */
	public function send(array $data, int $code = 200): void
	{
		$this->response->setCode($code);
		$this->response->addHeader('content-type', 'application/json');
		echo Json::encode($data);
		exit();
	}

}
