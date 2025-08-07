FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache bash netcat-openbsd
RUN npm install -g nodemon
RUN npm install -g ts-node

COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm install 

COPY . .

EXPOSE 8000
EXPOSE 4000

ENTRYPOINT [ "npm run dev" ]