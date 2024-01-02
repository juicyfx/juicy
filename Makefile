.PHONY: install
install:
	npx lerna exec npm install

.PHONY: compile
compile:
	npx lerna run compile
