FROM node:alpine as build

ARG API
ENV API $API

WORKDIR /app

COPY . /app

RUN npm install
EXPOSE 3000
CMD ["npm", "start"]


# production
# RUN npm run build
# FROM nginx:alpine
# COPY default.conf /etc/nginx/conf.d/default.conf

# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# EXPOSE 443
# # CMD ["apk", "add", "bash"]
# CMD ["nginx", "-g", "daemon off;"]


