FROM node:22-alpine

WORKDIR /app

RUN npm install -g vite

COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm install 

COPY . .

EXPOSE 5173

ENTRYPOINT [ "npm", "run", "dev" ]