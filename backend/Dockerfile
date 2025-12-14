# ===================================
# Development Stage
# ===================================
FROM node:22-alpine as development

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies including dev dependencies
RUN npm install

# Copy application code
COPY . .

# Expose application port
EXPOSE 3000

# Command to run the application in development
CMD ["npm", "run", "start:dev"]

# ===================================
# Production Build Stage
# ===================================
FROM node:22-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from development stage
COPY --from=development /usr/src/app/dist ./dist

# Expose application port
EXPOSE 3000

# Command to run the application in production
CMD ["node", "dist/main"]