# Build Vite React static files
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve with lightweight Nginx webserver
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port 80 for traffic
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
