# ============================
# Build Stage
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (cache friendly)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build React app
RUN npm run build

# ============================
# Production Stage
# ============================
FROM nginx:alpine

# Remove default nginx site
RUN rm -rf /usr/share/nginx/html/*

# Copy build output to nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

# Expose web port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
