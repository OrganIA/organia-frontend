FROM node:alpine as install-deps

WORKDIR /app
COPY package.json .
RUN npm install

FROM install-deps as build
COPY . .
CMD npm run build -- --no-clean
