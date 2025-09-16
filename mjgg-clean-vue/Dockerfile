# Stage 1: Build da aplicação
FROM node:20-alpine AS build

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código fonte
COPY . .

# Build da aplicação (gera a pasta /dist)
RUN npm run build

# Stage 2: Servir com Nginx
FROM nginx:alpine

# Remove configuração default do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia build da aplicação para Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia configuração customizada do Nginx (opcional)
 COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expondo porta 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
