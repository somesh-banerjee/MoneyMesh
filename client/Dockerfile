# ===================================
# Build Stage
# ===================================
FROM node:20-alpine as build

WORKDIR /usr/src/app

ARG VITE_GRAPHQL_ENDPOINT=http://localhost:23000
ENV VITE_GRAPHQL_ENDPOINT=$VITE_GRAPHQL_ENDPOINT

COPY package*.json ./

RUN npm ci

COPY . .

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

# Development Stage — Debian/glibc avoids Alpine musl + npm optional-deps bugs
# ===================================
FROM node:22-bookworm-slim as development

WORKDIR /usr/src/app

COPY package*.json ./
COPY scripts/container-dev.sh ./scripts/container-dev.sh
RUN chmod +x ./scripts/container-dev.sh \
    && npm install --include=optional --no-package-lock

COPY . .

EXPOSE 5173

CMD ["./scripts/container-dev.sh"]
