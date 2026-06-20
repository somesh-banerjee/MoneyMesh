# ===================================
# Development Stage (local Docker use only — not used by compose)
# ===================================
FROM node:22-alpine as development

WORKDIR /usr/src/app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm install && npm run prisma:generate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

# ===================================
# Build Stage
# ===================================
FROM node:22-alpine as build

WORKDIR /usr/src/app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm ci

COPY . .

RUN npm run prisma:generate && npm run build

# ===================================
# Production Stage
# ===================================
FROM node:22-alpine as production

ENV NODE_ENV=production

WORKDIR /usr/src/app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./
COPY docker-entrypoint.sh ./

RUN npm ci --omit=dev \
    && npm install prisma@7.8.0 --no-save \
    && chmod +x docker-entrypoint.sh

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/src/generated ./src/generated

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "dist/main"]
