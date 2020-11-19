<?php declare(strict_types=1);

use App\Http;
use App\Utils;
use GuzzleHttp\Client;
use InstagramScraper\Instagram;
use InstagramScraper\Model\Media;
use Symfony\Component\Cache\Adapter\PhpFilesAdapter;
use Symfony\Component\Cache\Psr16Cache;

require __DIR__ . '/../vendor/autoload.php';

[$username, $password] = Utils::getCredentials();

$count = intval($_GET['count'] ?? 10);
$account = $_GET['_user'] ?? null;

if (empty($account)) {
	Http::error('Missing username');
}

$cache = new PhpFilesAdapter('instagram', 0, Utils::getTmp());
$instagram = Instagram::withCredentials(new Client(), $username, $password, new Psr16Cache($cache));
$instagram->login();
$medias = $instagram->getMedias($account, $count);

$output = array_map(fn(Media $media) => Utils::dump($media), $medias);
Http::json($output);
