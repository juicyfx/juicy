# JuicyFx (PHP)

PHP API client for [Juicy Functions](https://github.com/juicyfx/juicy)

## Usage

```
composer juicyfx/juicy
```

## Versions

| State       | Version | Branch   | PHP     |
|-------------|---------|----------|---------|
| dev         | `^0.2`  | `master` | `^7.2`  |
| stable      | `^0.1`  | `master` | `^7.2`  |

## Usage

### Podfuk

```php
$client = JuicyFx::createPodfuk();

$response = $client->pdf()->url('https://f3l1x.io');

$response = $client->pdf()->raw('raw string');

$response = $client->pdf()->json([);
    'body' => 'post body'
]);

$response = $client->pdf()->json([
    'body' => 'post data',
    'headerTemplate' => '<div style="font-size: 30px;">HEADER</div>',
    'footerTemplate' => '<div style="font-size: 30px;">FOOTER</div>',
], [
    'displayHeaderFooter' => 1,
    'marginTop' => 100,
    'marginBottom' => 100,
]);
```

[All options](https://pptr.dev/#?product=Puppeteer&version=v1.12.2&show=api-pagepdfoptions) from puppeteer (page.pdf()) are supported.

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/f3l1x">
            <img width="150" height="150" src="https://avatars2.githubusercontent.com/u/538058?v=3&s=150">
        </a>
        </br>
        <a href="https://github.com/f3l1x">Milan Felix Šulc</a>
      </td>
    </tr>
  </tbody>
</table>
