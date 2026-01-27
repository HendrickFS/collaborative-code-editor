# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY public ./public
COPY src ./src

RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install serve to run the production build
RUN npm install -g serve

# Copy built app from builder
COPY --from=builder /app/build ./build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
