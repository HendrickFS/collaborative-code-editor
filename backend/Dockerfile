# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build 2>/dev/null || echo "No build script defined"

# Runtime stage
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/src ./src
COPY tsconfig.json ./

ENV NODE_ENV=production
ENV PORT=1234

EXPOSE 1234

CMD ["npm", "run", "dev"]
