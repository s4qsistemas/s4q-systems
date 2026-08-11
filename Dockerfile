# Usar una imagen de Nginx muy ligera
FROM nginx:alpine

# Copiar el contenido de tu carpeta 'public' al directorio web de Nginx
COPY ./public /usr/share/nginx/html

# Exponer el puerto interno 80 del contenedor
EXPOSE 80
