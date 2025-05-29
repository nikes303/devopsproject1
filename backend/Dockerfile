FROM node:14-alpine3.12
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY index.js ./
EXPOSE 4000
CMD ["node", "index.js"]
