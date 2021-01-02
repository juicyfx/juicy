.PHONY: bootstrap compile

###########################################################
# PACKAGES ################################################
###########################################################

bootstrap:
	npx lerna bootstrap --no-ci

compile:
	npx lerna run compile
