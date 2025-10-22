#!/bin/bash

echo "🚀 Starting Lunox E-Commerce Platform..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configuration."
    echo ""
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

echo "🐳 Starting Docker containers..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

echo ""
echo "✅ All services are starting up!"
echo ""
echo "📱 Access your application:"
echo "   Frontend:        http://localhost:3000"
echo "   User Service:    http://localhost:4000"
echo "   Catalog Service: http://localhost:4001"
echo "   Order Service:   http://localhost:4002"
echo ""
echo "📊 View logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Stop services:"
echo "   docker-compose down"
echo ""
echo "Happy coding! 🎉"


