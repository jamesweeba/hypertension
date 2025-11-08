FROM node:20.11.1-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# RUN npm run build

# Step 2: Create production image
FROM node:20.11.1-alpine AS runner

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 1800

CMD ["node", "index.js"]