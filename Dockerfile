# Stage 1: Build dell'app Angular
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve con Nginx
FROM nginx:alpine AS production

# Copia i file buildati
COPY --from=builder /app/dist/salzano-services/browser /usr/share/nginx/html

# Config Nginx per Angular routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
