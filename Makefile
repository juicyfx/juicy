.PHONY: compile php-qa php-tests php-coverage

###########################################################
# PACKAGES ################################################
###########################################################

compile:
	npx lerna run compile

###########################################################
# CLIENT: PHP #############################################
###########################################################

PHP_DIR = client/php
PHP_VENDOR_BIN = ${PHP_DIR}/vendor/bin

php-vendor: composer.json composer.lock
	composer install

php-qa: php-vendor
	${PHP_VENDOR_BIN}/linter client/php/src client/php/tests
	${PHP_VENDOR_BIN}/codesniffer --standard=client/php/ruleset.xml client/php/src client/php/tests
	${PHP_VENDOR_BIN}/phpstan analyse -l max -c client/php/phpstan.neon client/php/src

php-tests: php-vendor
	${PHP_VENDOR_BIN}/tester -s -p php --colors 1 -C client/php/tests/cases

php-coverage: php-vendor
	${PHP_VENDOR_BIN}/tester -s -p phpdbg --colors 1 -C --coverage ./coverage.xml --coverage-src client/php/src client/php/tests/cases
