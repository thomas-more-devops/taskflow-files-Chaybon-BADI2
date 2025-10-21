# Gebruik Node.js 22 Alpine als basis image
FROM node:22-alpine

# Metadata - Information about image
LABEL maintainer="your-email@example.com"
LABEL version="1.0"
LABEL description="TaskFlow application"

# Stel /app in als werkdirectory
WORKDIR /app

# Kopieer package.json en package-lock.json (indien aanwezig) voor layer caching
COPY package*.json ./

# Install Dependencies
RUN npm ci
# npm ci = clean install (faster, more reliable than npm install)
# --only=production = skip dev dependencies

# Kopieer de rest van de applicatiecode
COPY . .
# Copies everything except .dockerignore entries

# Expose poort 3000
EXPOSE 3000

# Start de applicatie
CMD ["npm", "start"]
# What runs when container starts
