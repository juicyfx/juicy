<?php declare(strict_types=1);

namespace App;

use Nette\Utils\Json;

class Http
{

	public static function error(string $error, int $code = 400): void
	{
		self::json(['error' => $error], $code);
	}

	public static function json(array $data, int $code = 200): void
	{
		Http::header('content-type', 'application/json');
		Http::code($code);
		echo Json::encode($data);
		exit();
	}

	public static function cors(): void
	{
		Http::header('Access-Control-Allow-Origin', '*');
		Http::header('Access-Control-Allow-Methods', '*');
		Http::header('Access-Control-Allow-Headers', '*');
	}

	public static function header(string $name, string $value): void
	{
		header($name . ': ' . $value, false);
	}

	public static function code(int $code): void
	{
		http_response_code($code);
	}

}