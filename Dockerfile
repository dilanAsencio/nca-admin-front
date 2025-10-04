FROM node:18-alpine AS dev

WORKDIR /app

# Copiamos package.json y package-lock.json primero (mejor cacheo)
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto de Next.js
EXPOSE 3000

# Comando de arranque en modo desarrollo
CMD ["npm", "run", "dev"]
