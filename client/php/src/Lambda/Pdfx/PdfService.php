<?php declare(strict_types = 1);

namespace JuicyFx\Juicy\Lambda\Pdfx;

use GuzzleHttp\ClientInterface;
use JuicyFx\Juicy\Exceptions\Logical\InvalidArgumentException;

class PdfService
{

	/** @var ClientInterface */
	protected $client;

	public function __construct(ClientInterface $client)
	{
		$this->client = $client;
	}

	/**
	 * @param mixed[] $args
	 * @param mixed[] $options
	 */
	public function url(string $url, array $args = [], array $options = []): PdfResponse
	{
		return new PdfResponse(
			$this->client->request('GET', '/url/', array_merge(
				['query' => array_merge($args, ['url' => $url])],
				$options
			))
		);
	}

	/**
	 * @param mixed[] $args
	 * @param mixed[] $options
	 */
	public function raw(string $raw, array $args = [], array $options = []): PdfResponse
	{
		return new PdfResponse(
			$this->client->request('GET', '/raw/', array_merge(
				['query' => array_merge($args, ['raw' => $raw])],
				$options
			))
		);
	}

	/**
	 * @param mixed[] $data
	 * @param mixed[] $args
	 * @param mixed[] $options
	 */
	public function json(array $data, array $args = [], array $options = []): PdfResponse
	{
		if (!isset($data['body'])) {
			throw new InvalidArgumentException('Missing body data');
		}

		$json = ['data' => $data['body']];

		if (isset($data['headerTemplate'])) {
			$json['headerTemplate'] = $data['headerTemplate'];
		}

		if (isset($data['footerTemplate'])) {
			$json['footerTemplate'] = $data['footerTemplate'];
		}

		return new PdfResponse(
			$this->client->request('POST', '/post/', array_merge(
				['json' => $json],
				['query' => $args],
				$options
			))
		);
	}

}
