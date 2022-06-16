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

		if ($text === null || $text === '') {
			$this->error([
				'error' => [
					'message' => 'No code given',
				],
				'version' => Engine::VERSION,
			], 400);
		}

		try {
			$output = $this->latte->renderToString($text);
			$this->send([
				'output' => $output,
				'version' => Engine::VERSION,
			]);
		} catch (CompileException $e) {
			$this->error([
				'error' => [
					'message' => $e->getMessage(),
					'line' => $e->position?->line ?? null,
					'column' => $e->position?->column ?? null,
				],
				'version' => Engine::VERSION,
			], 422);
		} catch (Throwable $e) {
			$this->error([
				'error' => [
					'message' => $e->getMessage(),
				],
				'version' => Engine::VERSION,
			], 500);
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
	private function error(array $error, int $code = 400): void
	{
		$this->response->setCode($code);
		$this->response->addHeader('content-type', 'application/json');
		echo Json::encode($error);
		exit();
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
