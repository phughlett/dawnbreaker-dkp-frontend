FROM node:alpine AS build

ENV REACT_APP_API $REACT_APP_API

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build

# production
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /var/www/html
EXPOSE 5000