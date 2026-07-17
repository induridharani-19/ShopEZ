# Use lightweight Node image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy dependency configs
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy source code files
COPY . .

# Expose backend API port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
