FROM node:alpine as install-deps

WORKDIR /app
COPY package.json .
RUN npm install

FROM node:alpine as build
COPY . .
RUN npm run build
