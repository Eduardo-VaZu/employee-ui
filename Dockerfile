# --- ETAPA 1: Build ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- ETAPA 2: Servidor Nginx ---
FROM nginx:alpine
# Copiamos el build de Vite (carpeta dist) a Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Copiamos nuestra config personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]