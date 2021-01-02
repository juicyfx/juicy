<?php declare(strict_types = 1);

function createCurl()
{
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	return $ch;
}

function fromJson()
{
	$ch = createCurl();
	curl_setopt($ch, CURLOPT_URL, "https://pdfx.vercel.app/post/?displayHeaderFooter=1&marginTop=100&marginBottom=100");
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
		'data' => 'HELLO PHP',
		'headerTemplate' => '<div style="font-size: 30px">THIS IS HEADER</div>',
		'footerTemplate' => '<div style="font-size: 30px">THIS IS FOOTER</div>',
	]));
	curl_setopt($ch, CURLOPT_HTTPHEADER, [
		'Content-Type: application/json',
	]);
	$result = curl_exec($ch);
	curl_close($ch);

	file_put_contents(__DIR__ . '/php-pdf1.pdf', $result);
}

function fromRaw()
{
	$ch = createCurl();
	curl_setopt($ch, CURLOPT_URL, "https://pdfx.vercel.app/post/");
	curl_setopt($ch, CURLOPT_POSTFIELDS, 'HELLO RAW');
	curl_setopt($ch, CURLOPT_HTTPHEADER, [
		'Content-Type: text/plain',
	]);
	$result = curl_exec($ch);
	curl_close($ch);

	file_put_contents(__DIR__ . '/php-pdf2.pdf', $result);
}

function fromUrl()
{
	$ch = createCurl();
	curl_setopt($ch, CURLOPT_URL, "https://pdfx.vercel.app/url/?url=http://f3l1x.io/&displayHeaderFooter=1&marginTop=100&marginBottom=100");
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
		'data' => 'HELLO PHP',
		'headerTemplate' => '<div style="font-size: 30px">THIS IS HEADER</div>',
		'footerTemplate' => '<div style="font-size: 30px">THIS IS FOOTER</div>',
	]));
	curl_setopt($ch, CURLOPT_HTTPHEADER, [
		'Content-Type: application/json',
	]);
	$result = curl_exec($ch);
	curl_close($ch);

	file_put_contents(__DIR__ . '/php-pdf3.pdf', $result);
}

fromJson();
fromRaw();
fromUrl();
