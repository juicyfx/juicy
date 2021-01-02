<?php declare(strict_types = 1);

use App\Http;
use App\Utils;
use Contributte\Utils\FileSystem;
use Contributte\Utils\Strings;
use Nette\Neon\Neon;
use PHPStan\Analyser\Analyser;
use PHPStan\DependencyInjection\ContainerFactory;

require __DIR__ . '/../vendor/autoload.php';

Http::cors();

$code = $_POST['code'] ?? $_GET['code'] ?? '';
$level = $_POST['level'] ?? $_GET['level'] ?? 'max';

$tmpDir = Utils::getTmp();
$rootDir = Utils::getRoot();

$codeFile = $tmpDir . '/tmp.php';
if (empty($code)) Http::error('Missing code');
$code = '<?php ' . Strings::replacePrefix($code, '<?php');
FileSystem::write($codeFile, $code);

$configFiles = [
	'phar://' . $rootDir . '/vendor/phpstan/phpstan/phpstan.phar/conf/staticReflection.neon',
];

$configFile = $tmpDir . '/phpstan.neon';
$neon = Neon::encode([
	'includes' => $configFiles,
	'parameters' => [
		'inferPrivatePropertyTypeFromConstructor' => true,
		'treatPhpDocTypesAsCertain' => $event['treatPhpDocTypesAsCertain'] ?? true,
		'phpVersion' => $event['phpVersion'] ?? 80000,
	],
]);
FileSystem::write($configFile, $neon);

require_once 'phar://' . $rootDir . '/vendor/phpstan/phpstan/phpstan.phar/stubs/runtime/ReflectionUnionType.php';

$containerFactory = new ContainerFactory($tmpDir);
$container = $containerFactory->create($tmpDir, [sprintf('%s/config.level%s.neon', $containerFactory->getConfigDirectory(), $level), $configFile], [$codeFile]);

/** @var Analyser $analyser */
$analyser = $container->getByType(Analyser::class);
$results = $analyser->analyse([$codeFile], null, null, false, [$codeFile])->getErrors();

$errors = [];
foreach ($results as $result) {
	$errors[] = [
		'message' => $result->getMessage(),
		'line' => $result->getLine(),
	];
}

Http::json(['result' => $errors, 'level' => $level]);
