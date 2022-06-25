<?php declare(strict_types = 1);

namespace App;

final class Utils
{

	public static function isVercel(): bool
	{
		return !empty($_ENV['NOW_REGION'] ?? '');
	}

	public static function getStorer(): ?string
	{
		$storer = $_ENV['STORER_URL'] ?? '';

		return !empty($storer) ? $storer : null;
	}

	public static function getTmp(): string
	{
		return self::isVercel() ? '/tmp' : __DIR__ . '/../tmp';
	}

}
