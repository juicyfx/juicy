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

		$text = null;
		if ($this->request->isMethod('GET')) {
			$text = $this->request->getQuery('code');
		} else if ($this->request->isMethod('POST')) {
			$text = $this->request->getRawBody();
		}

		$res = [
			'version' => Engine::VERSION,
		];

		if ($text === null) {
			$res['error'] = ['message' => 'No code given'];
			$this->send($res, 400);

		} elseif (strlen($text) > self::MAX_LENGTH) {
			$res['error'] = ['message' => 'Code is too long'];
			$this->send($res, 400);
		}

		set_error_handler(function (int $severity, string $message) use (& $res) {
			if (error_reporting() & $severity) {
				$res['error'] ??= ['message' => $message];
			}
		});

		try {
			$res['output'] = $this->latte->renderToString($text);
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
