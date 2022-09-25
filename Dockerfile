FROM node:alpine as build

ARG API
ENV API $API

WORKDIR /app

COPY . /app

RUN npm install
# EXPOSE 3000
# CMD ["npm", "start"]


# production
RUN npm run build
FROM nginx:alpine
COPY conf.d /etc/nginx/conf.d
COPY cert.pem /etc/nginx/ssl/
COPY key.pem /etc/nginx/ssl/
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
# CMD ["apk", "add", "bash"]
# CMD ["nginx", "-g", "daemon off;"]


