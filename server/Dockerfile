# ----------------------------
# Stage 1: Build
# ----------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy source code
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

# Build TypeScript
RUN npx tsc

# ----------------------------
# Stage 2: Production image
# ----------------------------
FROM node:20-alpine AS production

WORKDIR /app

# Copy built JS files and Prisma schema
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Set environment variables (can be overridden via .env)
ENV NODE_ENV=production
ENV DATABASE_URL="postgresql://USER:PASSWORD@YOUR_SUPABASE_HOST:5432/DB_NAME"

# Expose app port
EXPOSE 3000

# Run Prisma generate (for runtime client)
RUN npx prisma generate

# Start the server
CMD ["node", "dist/index.js"]