# Music Library Microfrontend Vercel Deployment Script
# Run this script from the music-library directory

Write-Host "🎵 Deploying Music Library Microfrontend to Vercel..." -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Check if Vercel CLI is installed
try {
    $vercelVersion = vercel --version 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Vercel CLI not found"
    }
    Write-Host "✅ Vercel CLI found: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# Check if user is logged in
try {
    $user = vercel whoami 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Logged in as: $user" -ForegroundColor Green
    } else {
        throw "Not logged in"
    }
} catch {
    Write-Host "🔐 Please login to Vercel..." -ForegroundColor Yellow
    vercel login
}

# Build the project
Write-Host "🏗️  Building the project..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed. Please fix the errors and try again." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# Deploy to Vercel
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Blue
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "🎉 Deployment completed!" -ForegroundColor Green
    Write-Host "📝 Don't forget to note the deployment URL for the main app configuration." -ForegroundColor Yellow
} else {
    Write-Host "❌ Deployment failed. Please check the errors above." -ForegroundColor Red
}
