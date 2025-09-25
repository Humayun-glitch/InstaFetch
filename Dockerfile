# Use Node.js 18 as base image
FROM node:18-slim

# Install Python 3 and pip
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY requirements.txt ./

# Install Node.js dependencies
RUN npm ci --only=production

# Install Python dependencies
RUN pip3 install -r requirements.txt

# Copy application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
