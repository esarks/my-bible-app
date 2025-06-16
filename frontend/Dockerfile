# Build stage
FROM node:20 as builder
WORKDIR /app

# 🔑 Add the env file BEFORE build so Vite can access it
COPY .env .env

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Ensure vite is executable
RUN chmod +x node_modules/.bin/vite

# Build the Vite app (env vars must be present here!)
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
