FROM node:16-slim as install-deps

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci

FROM install-deps as build
COPY . .
CMD npm run build -- --no-clean
