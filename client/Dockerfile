# client/Dockerfile.dev
FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run Vite in dev mode, allowing connections from outside container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]