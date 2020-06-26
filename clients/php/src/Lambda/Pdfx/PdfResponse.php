<?php declare(strict_types = 1);

namespace JuicyFx\Juicy\Lambda\Pdfx;

use Psr\Http\Message\ResponseInterface;

class PdfResponse
{

	/** @var ResponseInterface */
	protected $origin;

	/** @var mixed */
	protected $parsed;

	public function __construct(ResponseInterface $origin)
	{
		$this->origin = $origin;
	}

	public function getOrigin(): ResponseInterface
	{
		return $this->origin;
	}

	public function getStatusCode(): int
	{
		return $this->origin->getStatusCode();
	}

	/**
	 * @return mixed
	 */
	public function getData()
	{
		return $this->getParsedBody();
	}

	public function save(string $filename): void
	{
		file_put_contents($filename, $this->getData());
	}

	/**
	 * @return mixed
	 */
	protected function getParsedBody()
	{
		if ($this->parsed === null) {
			$body = $this->origin->getBody();
			$body->rewind();
			$this->parsed = $body->getContents();
		}

		return $this->parsed;
	}

}
