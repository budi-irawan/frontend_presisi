FROM node:18-alpine as build-stage

WORKDIR /home/vue/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --force

FROM nginx:stable-alpine as production-stage

COPY - from=build-stage /home/vue/app/dist /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]