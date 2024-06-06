build-frontend:
	rm -rf frontend/build
	npm run build
	npx start-server -s ./frontend/build

install:
	npm ci

start-frontend:
	cd frontend && npm start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build: build-frontend