# Stage 1: Build
FROM node:18-alpine as build

WORKDIR /build

# Set environment variables for build
ENV VITE_MASTER_KEY=miClaveMaestraSegura123!
ENV VITE_SALT=mi_salt_unica
ENV VITE_ITERATIONS=100
ENV API_URL=http://localhost:3000
ENV SERVER_KEY_PRIVATE=497ead433b0248cf1cf23be3bca0133cd4af94c3be24615f82dd9dbfd6a45599
ENV VITE_SERVER_KEY_PUBLIC=046512a948f37d9bba485e0cf0c1d697d9a93dd3dcae3213a23e31cc92041412388d478a4ba3c3442993be8c7228fbd7826bc3fae1539f8f28a09290db100f6314
ENV KEY_SECRET=l%N6v@x6YBe44Lz0l

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /build/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 