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

# Stage 2: Serve the application using a smaller base image
FROM node:18-alpine as runner

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy package.json and install only production dependencies
COPY --from=builder /app/package.json ./package.json
RUN npm install --production --no-cache && npm cache clean --force

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
