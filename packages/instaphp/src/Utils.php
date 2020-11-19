<?php declare(strict_types=1);

namespace App;

use ReflectionClass;

final class Utils
{

	public static function isVercel(): bool
	{
		return !empty(getenv('NOW_REGION'));
	}

	public static function getCredentials(): array
	{
		$username = getenv('INSTAGRAM_USER');
		$password = getenv('INSTAGRAM_PASSWORD');

		if (empty($username) || empty($password)) {
			Http::error('Missing credentials');
		}

		return [$username, $password];
	}

	public static function getTmp(): string
	{
		return self::isVercel() ? '/tmp' : __DIR__ . '/../tmp';
	}

	public static function dump(object $obj): array
	{
		$output = [];

		$rc = new ReflectionClass($obj);
		foreach ($rc->getProperties() as $property) {
			$property->setAccessible(true);
			$output[$property->getName()] = $property->getValue($obj);
		}

		return $output;
	}

}
