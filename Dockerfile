# Angiv det grundlæggende image, der skal bruges
FROM node:14-alpine

# Opret en arbejdsmappe til vores applikation
WORKDIR /app

# Kopier package.json og package-lock.json til arbejdsområdet
COPY package*.json ./

# Installer afhængigheder
RUN npm install

# Kopier resten af applikationskoden til arbejdsområdet
COPY . .

# Eksponer porten, som serveren lytter på
EXPOSE 3000

# Start applikationen
CMD [ "node", "index.js" ]
