# Stage 1: Build React App
FROM node:20 AS build

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copier le reste du code source
COPY . .

# Construire l’application avec Vite
RUN npm run build

# Stage 2: Setup Nginx pour servir l’app
FROM nginx:latest

# Copier les fichiers build de l’étape précédente vers Nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour l'accès à l’application
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
