# Stage 1: Build the Next.js application
FROM node:18-alpine as builder

# Set the working directory
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache build-base python3

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the application using a lightweight image
FROM node:18-alpine as runner

# Set the working directory
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/.next ./.next

# Check if the public directory exists and copy if it does
RUN if [ -d /app/public ]; then mkdir -p ./public && cp -r /app/public/* ./public/; fi

# Copy package.json and package-lock.json
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install only production dependencies
RUN npm install --production

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]