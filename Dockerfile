FROM node:alpine as build

ARG API
ENV API $API

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build

# production
FROM nginx:alpine
# COPY default.conf /etc/nginx/conf.d/default.conf
RUN apk update && apk add bash

COPY --from=build /app/build /var/www/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]


