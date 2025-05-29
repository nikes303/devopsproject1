FROM node:20-alpine
RUN addgroup -S appgroup && adduser -S -D -H appuser -G appgroup
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts --only=production
COPY index.js ./
RUN chown -R appuser:appgroup /app
USER appuser
EXPOSE 4000
CMD ["node", "index.js"]
