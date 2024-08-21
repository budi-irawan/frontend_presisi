# Gunakan image Node.js sebagai base image
FROM node:18-alpine

# Set working directory
WORKDIR /home/node/app2

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode sumber aplikasi
COPY . .

# Build aplikasi Vue.js
RUN npm run build --force

# Stage 2: Nginx untuk serving aplikasi
FROM nginx:alpine

# Salin build output ke direktori yang dilayani Nginx
COPY --from=build /home/node/app2/dist /usr/share/nginx/html

# Expose port yang digunakan oleh Nginx
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
