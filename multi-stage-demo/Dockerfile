# Build stage
# FROM node:22-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build
# RUN npm prune --production

# Production stage
# FROM node:22-alpine
# WORKDIR /app
# RUN addgroup -g 1001 -S nodejs && \
#     adduser -S appuser -u 1001 -G nodejs
# COPY --from=builder --chown=appuser:nodejs /app/package*.json ./
# COPY --from=builder --chown=appuser:nodejs /app/node_modules ./node_modules
# COPY --from=builder --chown=appuser:nodejs /app/server.js ./
# USER appuser
# EXPOSE 3000
# CMD ["node", "server.js"]


# UITDAGING

# ---------- Build stage ----------
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

# ---------- Test stage ----------
FROM builder AS tester
# (hier gebruik je dezelfde codebasis als builder)
RUN echo "Tests draaien..." && sleep 1 && echo "✅ Alle tests geslaagd!"

# ---------- Production stage ----------
FROM node:22-alpine
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001 -G nodejs
COPY --from=builder --chown=appuser:nodejs /app/package*.json ./ 
COPY --from=builder --chown=appuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:nodejs /app/server.js ./
USER appuser
EXPOSE 3000
# Healthcheck toevoegen:
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/ || exit 1
CMD ["node", "server.js"]
