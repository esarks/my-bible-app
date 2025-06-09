# Use Node.js for the build step
FROM node:20 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use nginx to serve the built frontend
FROM nginx:alpine

# Copy the build output to nginx's html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config to change the listen port to 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 to match Cloud Run's expected port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

