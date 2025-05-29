FROM node:14-alpine3.12
WORKDIR /app
COPY package*.json ./   # Copies backend/package*.json
RUN npm install
COPY index.js ./       # Copies backend/index.js
EXPOSE 4000
CMD ["node", "index.js"]
