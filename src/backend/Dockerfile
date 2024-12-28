# Imagen base de Node.js
FROM node:18

# Crear directorio de trabajo
WORKDIR /src

# Copiar archivos del backend
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto del backend
EXPOSE 3001

# Comando para iniciar el backend
CMD ["npm", "start:dev"]
