<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Accept, Content-Type');

echo "
<Page>
    <P>PHP EXAMPLE</P>
    <Button>Count Me</Button>
</Page>
";