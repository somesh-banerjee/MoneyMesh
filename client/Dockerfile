# ===================================
# Build Stage
# ===================================
FROM node:20-alpine as build

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# ===================================
# Production Stage
# ===================================
FROM nginx:alpine as production

# Copy built assets from build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# ===================================
# Development Stage
# ===================================
FROM node:20-alpine as development

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev", "--", "--host"]
