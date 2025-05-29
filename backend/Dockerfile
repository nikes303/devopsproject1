FROM node:14-alpine3.12
WORKDIR /app
copy package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node","index.js"]
