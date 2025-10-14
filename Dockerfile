# Gebruik Node.js 22 Alpine als basis image
FROM node:22-alpine

# Stel /app in als werkdirectory
WORKDIR /app

# Kopieer package.json en package-lock.json (indien aanwezig) voor layer caching
COPY package*.json ./

# Installeer alleen productie dependencies
RUN npm install --omit=dev

# Kopieer de rest van de applicatiecode
COPY . .

# Expose poort 3000
EXPOSE 3000

# Start de applicatie
CMD ["npm", "start"]