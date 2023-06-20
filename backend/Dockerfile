FROM node:20-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

FROM base AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm run build

FROM node:20-alpine AS prod-base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production

FROM prod-base
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/bin ./
ENTRYPOINT [ "node", "./server.js" ]
