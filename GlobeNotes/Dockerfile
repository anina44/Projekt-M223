### Stage 1: Build Frontend
FROM node:20-alpine AS build
WORKDIR /app

# Paketdateien kopieren
COPY package*.json ./

# Dependencies installieren (sauberer als npm install in CI)
RUN npm ci

# Restliches Projekt kopieren
COPY . .

# Build erzeugen
RUN npm run build

### Stage 2: Serve mit NGINX
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Built frontend nach nginx Webroot kopieren
COPY --from=build /app/dist /usr/share/nginx/html

# Port freigeben
EXPOSE 80
