# Gebruik Node.js 22 Alpine als basis image
FROM node:22-alpine

# Stel werkdirectory in
WORKDIR /app

# Kopieer package bestanden
COPY package*.json ./

# Kopieer applicatie code
COPY server.js ./

# Expose poort 3000
EXPOSE 3000

# Start commando
CMD ["npm", "start"]