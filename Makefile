lint:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npm start

deploy:
	git push

start:
	make start-backend & make start-frontend

build:
	rm frontend/build -rf
	npm run build