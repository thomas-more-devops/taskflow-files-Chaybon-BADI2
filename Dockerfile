# ---------- STAGE 1: Builder ----------
FROM node:22-alpine AS builder

# Werkdirectory binnen container
WORKDIR /app

# Alleen package files kopiëren (zorgt voor layer caching)
COPY package*.json ./

# Dependencies installeren (npm ci = snellere, schonere install)
RUN npm ci --only=production

# Kopieer nu de volledige code
COPY . .

# ---------- STAGE 2: Production ----------
FROM node:22-alpine AS production

# Maak een niet-root user aan voor veiligheid
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Kopieer node_modules en app code uit de builder stage
COPY --from=builder /app /app

# Zorg dat de user de juiste rechten heeft
RUN chown -R appuser:appgroup /app

# Wissel naar non-root user
USER appuser

# Expose poort (optioneel, enkel informatief)
EXPOSE 3000

# Start command
CMD ["npm", "start"]
