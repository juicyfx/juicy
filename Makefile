.PHONY: compile php-qa php-tests php-coverage

###########################################################
# PACKAGES ################################################
###########################################################

bootstrap:
	npx lerna bootstrap --no-ci

compile:
	npx lerna run compile

###########################################################
# CLIENT: PHP #############################################
###########################################################

PHP_DIR = clients/php
PHP_VENDOR_BIN = ${PHP_DIR}/vendor/bin

php-vendor: composer.json composer.lock
	composer install

php-qa: php-vendor
	${PHP_VENDOR_BIN}/linter clients/php/src clients/php/tests
	${PHP_VENDOR_BIN}/codesniffer --standard=clients/php/ruleset.xml clients/php/src clients/php/tests
	${PHP_VENDOR_BIN}/phpstan analyse -l max -c clients/php/phpstan.neon clients/php/src

php-tests: php-vendor
	${PHP_VENDOR_BIN}/tester -s -p php --colors 1 -C clients/php/tests/cases

php-coverage: php-vendor
	${PHP_VENDOR_BIN}/tester -s -p phpdbg --colors 1 -C --coverage ./coverage.xml --coverage-src clients/php/src clients/php/tests/cases
