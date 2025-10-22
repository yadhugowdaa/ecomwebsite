@echo off
echo.
echo ========================================
echo   Lunox E-Commerce - Service Status
echo ========================================
echo.

docker-compose ps

echo.
echo ========================================
echo   Service Health Checks
echo ========================================
echo.

echo Checking User Service...
curl -s http://localhost:4000/health 2>nul
if %errorlevel% equ 0 (
    echo [OK] User Service is running
) else (
    echo [WAIT] User Service not ready yet
)

echo.
echo Checking Catalog Service...
curl -s http://localhost:4001/health 2>nul
if %errorlevel% equ 0 (
    echo [OK] Catalog Service is running
) else (
    echo [WAIT] Catalog Service not ready yet
)

echo.
echo Checking Order Service...
curl -s http://localhost:4002/health 2>nul
if %errorlevel% equ 0 (
    echo [OK] Order Service is running
) else (
    echo [WAIT] Order Service not ready yet
)

echo.
echo Checking Frontend...
curl -s http://localhost:3000 2>nul | findstr "<!DOCTYPE" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Frontend is running
) else (
    echo [WAIT] Frontend not ready yet
)

echo.
echo ========================================
echo   Access Your Application
echo ========================================
echo   Frontend: http://localhost:3000
echo   User API: http://localhost:4000
echo   Catalog API: http://localhost:4001
echo   Order API: http://localhost:4002
echo ========================================
echo.
pause


