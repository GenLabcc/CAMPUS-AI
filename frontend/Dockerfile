# Stage 1: Build Stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Pass build-time environment variables
# This allows Vite to bake the API URL into the javascript files
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build for production
RUN npm run build

# Stage 2: Serve Stage (Using Nginx)
FROM nginx:alpine

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the build stage to Nginx's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
