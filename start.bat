@echo off
echo 🚀 Starting Lunox E-Commerce Platform...
echo.

REM Check if .env exists
if not exist .env (
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo ✅ .env file created. Please update it with your configuration.
    echo.
)

echo 🐳 Starting Docker containers...
docker-compose up -d

echo.
echo ⏳ Waiting for services to be ready...
timeout /t 10 /nobreak > nul

echo.
echo ✅ All services are starting up!
echo.
echo 📱 Access your application:
echo    Frontend:        http://localhost:3000
echo    User Service:    http://localhost:4000
echo    Catalog Service: http://localhost:4001
echo    Order Service:   http://localhost:4002
echo.
echo 📊 View logs:
echo    docker-compose logs -f
echo.
echo 🛑 Stop services:
echo    docker-compose down
echo.
echo Happy coding! 🎉
pause


