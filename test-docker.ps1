# PowerShell test script for Docker build and run
# Usage: .\test-docker.ps1

$ErrorActionPreference = "Stop"

Write-Host "Testing FlacronBuild Docker Setup" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
try {
    docker info | Out-Null
    Write-Host "Docker is running" -ForegroundColor Green
} catch {
    Write-Host "Docker is not running. Please start Docker Desktop and try again." -ForegroundColor Red
    exit 1
}

# Check if .env file exists
if (Test-Path .env) {
    Write-Host ".env file found" -ForegroundColor Green
} else {
    Write-Host "Warning: .env file not found. You'll need to provide environment variables when running the container." -ForegroundColor Yellow
    Write-Host "   Create a .env file or pass environment variables via -e flags" -ForegroundColor Yellow
}

# Build the image
Write-Host ""
Write-Host "Building Docker image..." -ForegroundColor Cyan

# Read Firebase env vars from .env file if it exists
$buildArgs = @()
if (Test-Path .env) {
    $envContent = Get-Content .env
    foreach ($line in $envContent) {
        if ($line -match "^VITE_FIREBASE_") {
            $buildArgs += "--build-arg"
            $buildArgs += $line.Trim()
        }
    }
}

if ($buildArgs.Count -gt 0) {
    docker build -t flacronbuild:latest @buildArgs .
} else {
    Write-Host "Warning: No VITE_FIREBASE_* variables found in .env file" -ForegroundColor Yellow
    Write-Host "Building without Firebase config - app may not work correctly" -ForegroundColor Yellow
    docker build -t flacronbuild:latest .
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "Docker image built successfully" -ForegroundColor Green
} else {
    Write-Host "Docker build failed" -ForegroundColor Red
    exit 1
}

# Check if container already exists and remove it
$existingContainer = docker ps -a --format "{{.Names}}" | Select-String -Pattern "^flacronbuild$"
if ($existingContainer) {
    Write-Host ""
    Write-Host "Removing existing container..." -ForegroundColor Yellow
    docker rm -f flacronbuild 2>&1 | Out-Null
}

# Run the container
Write-Host ""
Write-Host "Starting container..." -ForegroundColor Cyan

if (Test-Path .env) {
    docker run -d `
        --name flacronbuild `
        -p 5000:5000 `
        --env-file .env `
        flacronbuild:latest
} else {
    Write-Host "Running without .env file. Make sure to set environment variables!" -ForegroundColor Yellow
    Write-Host "   Example: docker run -d --name flacronbuild -p 5000:5000 -e DATABASE_URL=... flacronbuild:latest" -ForegroundColor Yellow
    docker run -d `
        --name flacronbuild `
        -p 5000:5000 `
        -e NODE_ENV=production `
        -e PORT=5000 `
        flacronbuild:latest
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "Container started successfully" -ForegroundColor Green
} else {
    Write-Host "Failed to start container" -ForegroundColor Red
    exit 1
}

# Wait a bit for the app to start
Write-Host ""
Write-Host "Waiting for application to start..." -ForegroundColor Cyan
Start-Sleep -Seconds 5

# Check container status
$runningContainer = docker ps --format "{{.Names}}" | Select-String -Pattern "^flacronbuild$"
if ($runningContainer) {
    Write-Host "Container is running" -ForegroundColor Green
} else {
    Write-Host "Container stopped unexpectedly" -ForegroundColor Red
    Write-Host "Container logs:" -ForegroundColor Yellow
    docker logs flacronbuild
    exit 1
}

# Test health endpoint
Write-Host ""
Write-Host "Testing health endpoint..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/projects" -Method GET -TimeoutSec 5 -UseBasicParsing -ErrorAction SilentlyContinue
    $statusCode = $response.StatusCode
} catch {
    $statusCode = 000
}

if ($statusCode -eq 200 -or $statusCode -eq 401 -or $statusCode -eq 403) {
    Write-Host "Application is responding (HTTP $statusCode)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Docker setup is working!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Useful commands:" -ForegroundColor Cyan
    Write-Host "   View logs:    docker logs -f flacronbuild"
    Write-Host "   Stop:         docker stop flacronbuild"
    Write-Host "   Start:        docker start flacronbuild"
    Write-Host "   Remove:       docker rm -f flacronbuild"
    Write-Host ""
    Write-Host "Application URL: http://localhost:5000" -ForegroundColor Cyan
} else {
    Write-Host "Application might still be starting (HTTP $statusCode)" -ForegroundColor Yellow
    Write-Host "Container logs:" -ForegroundColor Yellow
    docker logs --tail 20 flacronbuild
    Write-Host ""
    Write-Host "Try checking logs: docker logs -f flacronbuild" -ForegroundColor Yellow
}
