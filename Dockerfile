FROM node:18-alpine

WORKDIR /home/node/app2

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --force

FROM nginx:alpine

COPY --from=build /home/node/app2/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]