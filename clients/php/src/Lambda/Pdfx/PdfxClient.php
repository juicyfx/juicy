<?php declare(strict_types = 1);

namespace JuicyFx\Juicy\Lambda\Pdfx;

use GuzzleHttp\ClientInterface;

class PdfxClient
{

	/** @var ClientInterface */
	protected $client;

	public function __construct(ClientInterface $client)
	{
		$this->client = $client;
	}

	public function pdf(): PdfService
	{
		return new PdfService($this->client);
	}

}
