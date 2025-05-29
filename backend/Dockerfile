FROM node:14-alpine3.12
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY index.js ./
COPY src ./src/
EXPOSE 4000
CMD ["node","index.js"]
