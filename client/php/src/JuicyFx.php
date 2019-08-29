<?php declare(strict_types = 1);

namespace JuicyFx\Juicy;

use GuzzleHttp\Client;
use JuicyFx\Juicy\Lambda\Pdfx\PdfxClient;

class JuicyFx
{

	public const PDFX_URL = 'https://pdfx.juicyfx1.now.sh';
	public const PDFX_DEFAULTS = [
		'base_uri' => self::PDFX_URL,
		'http_errors' => 'false',
	];

	/**
	 * @param mixed[] $options
	 */
	public static function createPdfx(array $options = []): PdfxClient
	{
		return new PdfxClient(new Client(array_merge(self::PDFX_DEFAULTS, $options)));
	}

}
