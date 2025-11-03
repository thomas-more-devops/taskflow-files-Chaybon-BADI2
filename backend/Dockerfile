FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

FROM node:22-alpine
WORKDIR /app
# curl toevoegen voor healthcheck
RUN apk add --no-cache curl \
    && addgroup -g 1001 -S nodejs \
    && adduser -S taskflow -u 1001 -G nodejs
COPY --from=builder --chown=taskflow:nodejs /app ./
USER taskflow
EXPOSE 3000
CMD ["node", "server.js"]
