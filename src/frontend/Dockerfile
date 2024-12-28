# Imagen base de Node.js
FROM node:18

# Crear directorio de trabajo
WORKDIR /src

# Copiar archivos del frontend
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto del frontend
EXPOSE 3000

# Servir la aplicación usando un servidor estático como serve
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
