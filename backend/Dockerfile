FROM node:14-alpine3.12 # Consider updating this to node:20-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./  # Add if you have it, remove if not
RUN npm install
COPY index.js ./
EXPOSE 4000
CMD ["node", "index.js"]
