################################
# Stage: dev (for local dev)
################################
FROM node:22-slim AS dev
WORKDIR /app

# Copy package files first to use Docker cache for deps
COPY package.json package-lock.json ./

# Install all deps (including dev)
RUN npm ci

# Copy source
COPY . .

# Generate Prisma client (so imports work)
RUN npx prisma generate

# Expose port (informational)
EXPOSE 3000

# Default command for development (expects "dev" script)
CMD ["npm", "run", "dev"]


################################
# Stage: builder
# (compile TypeScript)
################################
FROM node:22-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Make Prisma client available at build time (if you import it)
RUN npx prisma generate

# Build TypeScript to dist/
RUN npm run build


################################
# Stage: prod (final image)
################################
FROM node:22-slim AS prod
WORKDIR /app

# Copy only what we need from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# If your app uses prisma/runtime or migration files at runtime, copy prisma folder
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# Start the app (expects "start" script -> node dist/index.js)
CMD ["npm", "run", "start"]
