FROM node:14-alpine3.12

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy package files and install dependencies
# Optionally, change ownership of node_modules to the new user if needed
COPY package*.json ./
RUN npm install
# RUN chown -R appuser:appgroup /app/node_modules # Uncomment if npm install needs to run as root but files should be owned by appuser

# Copy application code and set ownership
# Copy only what's needed. Ensure index.js is at the root of what's copied or adjust paths.
COPY index.js ./
# If you had a src directory for backend, you'd copy it too:
# COPY src ./src/
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

EXPOSE 4000
CMD ["node", "index.js"]
