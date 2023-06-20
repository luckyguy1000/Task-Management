FROM node:20-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM base as builder
WORKDIR /usr/src/app
RUN npm run build

FROM nginx:latest
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
