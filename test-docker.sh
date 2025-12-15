#!/bin/bash

# Test script for Docker build and run
# Usage: ./test-docker.sh

set -e

echo "🐳 Testing FlacronBuild Docker Setup"
echo "======================================"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker Desktop and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker is running${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  Warning: .env file not found. You'll need to provide environment variables when running the container.${NC}"
    echo "   Create a .env file or pass environment variables via -e flags"
else
    echo -e "${GREEN}✅ .env file found${NC}"
fi

# Build the image
echo ""
echo "📦 Building Docker image..."
docker build -t flacronbuild:latest .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Docker image built successfully${NC}"
else
    echo -e "${RED}❌ Docker build failed${NC}"
    exit 1
fi

# Check if container already exists and remove it
if docker ps -a --format '{{.Names}}' | grep -q "^flacronbuild$"; then
    echo ""
    echo "🗑️  Removing existing container..."
    docker rm -f flacronbuild > /dev/null 2>&1
fi

# Run the container
echo ""
echo "🚀 Starting container..."

if [ -f .env ]; then
    docker run -d \
        --name flacronbuild \
        -p 5000:5000 \
        --env-file .env \
        flacronbuild:latest
else
    echo -e "${YELLOW}⚠️  Running without .env file. Make sure to set environment variables!${NC}"
    echo "   Example: docker run -d --name flacronbuild -p 5000:5000 -e DATABASE_URL=... flacronbuild:latest"
    docker run -d \
        --name flacronbuild \
        -p 5000:5000 \
        -e NODE_ENV=production \
        -e PORT=5000 \
        flacronbuild:latest
fi

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Container started successfully${NC}"
else
    echo -e "${RED}❌ Failed to start container${NC}"
    exit 1
fi

# Wait a bit for the app to start
echo ""
echo "⏳ Waiting for application to start..."
sleep 5

# Check container status
if docker ps --format '{{.Names}}' | grep -q "^flacronbuild$"; then
    echo -e "${GREEN}✅ Container is running${NC}"
else
    echo -e "${RED}❌ Container stopped unexpectedly${NC}"
    echo "📋 Container logs:"
    docker logs flacronbuild
    exit 1
fi

# Test health endpoint
echo ""
echo "🏥 Testing health endpoint..."
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/projects || echo "000")

if [ "$response" = "200" ] || [ "$response" = "401" ] || [ "$response" = "403" ]; then
    echo -e "${GREEN}✅ Application is responding (HTTP $response)${NC}"
    echo ""
    echo -e "${GREEN}🎉 Docker setup is working!${NC}"
    echo ""
    echo "📋 Useful commands:"
    echo "   View logs:    docker logs -f flacronbuild"
    echo "   Stop:         docker stop flacronbuild"
    echo "   Start:        docker start flacronbuild"
    echo "   Remove:       docker rm -f flacronbuild"
    echo ""
    echo "🌐 Application URL: http://localhost:5000"
else
    echo -e "${YELLOW}⚠️  Application might still be starting (HTTP $response)${NC}"
    echo "📋 Container logs:"
    docker logs --tail 20 flacronbuild
    echo ""
    echo "💡 Try checking logs: docker logs -f flacronbuild"
fi

