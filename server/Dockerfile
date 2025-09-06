################################
# Stage: dev (for local dev)
################################
FROM node:22-slim AS dev
WORKDIR /app
RUN apt-get update && apt-get install -y openssl libssl-dev

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

################################
# Stage: builder
# (compile TypeScript)
################################
FROM node:22-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y openssl libssl-dev

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

RUN apt-get update && apt-get install -y openssl libssl-dev
# Copy only what we need from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# If your app uses prisma/runtime or migration files at runtime, copy prisma folder
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# Start the app (expects "start" script -> node dist/index.js)
CMD ["npm", "run", "start"]

################################
# Stage: test (integration / unit tests)
################################

FROM node:22-slim AS test
WORKDIR /app

RUN apt-get update && apt-get install -y openssl libssl-dev

COPY package.json package-lock.json ./
ENV DATABASE_URL=postgres://test:test@db:5432/test_db
ENV NODE_ENV=test

RUN rm -rf node_modules/@prisma/client
RUN npm ci
COPY . .

RUN npx prisma generate

RUN rm -rf .env .env.test .env.example

# Run tests directly
CMD ["npm", "run", "test", "--", "--runInBand"]
