# ============================================
# STAGE 1: Builder - Install all dependencies
# ============================================
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files first for layer caching
COPY package*.json ./

# Install ONLY production dependencies in builder
RUN npm ci --omit=dev && \
    npm cache clean --force

# Copy application code
COPY . .

# ============================================
# STAGE 2: Production - Minimal runtime image
# ============================================
FROM node:22-alpine AS production

# Metadata
LABEL maintainer="your-email@example.com"
LABEL version="1.0"
LABEL description="TaskFlow application - Multi-stage production build"

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY --chown=nodejs:nodejs package*.json ./

# Copy node_modules from builder (already production-only)
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy application files from builder
COPY --from=builder --chown=nodejs:nodejs /app/server.js ./
COPY --from=builder --chown=nodejs:nodejs /app/database.js ./
COPY --from=builder --chown=nodejs:nodejs /app/models ./models
COPY --from=builder --chown=nodejs:nodejs /app/public ./public

# Switch to non-root user
USER nodejs

# Expose application port
EXPOSE 3000

# Health check (optional but recommended)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["npm", "start"]