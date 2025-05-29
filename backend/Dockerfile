FROM node:14-alpine3.12
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY index.js ./
RUN chown -R appuser:appgroup /app
USER appuser
EXPOSE 4000
CMD ["node", "index.js"]
