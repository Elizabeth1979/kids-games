#!/bin/bash

# Kids Games - Development Server Starter
# This script makes it easy to start your development server

echo "======================================"
echo "🎮 Kids Games - Starting Dev Server"
echo "======================================"
echo ""

# Navigate to the project directory
cd "$(dirname "$0")"

echo "📂 Current directory: $(pwd)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (first time setup)..."
    npm install
    echo ""
fi

echo "🔍 Checking for existing dev servers..."
echo ""

# Kill any existing Next.js dev server processes
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "⚠️  Found existing server on port 3000, stopping it..."
    kill -9 $(lsof -ti:3000) 2>/dev/null || true
    sleep 1
fi

# Clean up any lock files
if [ -f ".next/dev/lock" ]; then
    echo "🧹 Cleaning up lock files..."
    rm -f .next/dev/lock
fi

echo ""
echo "🚀 Starting development server..."
echo ""
echo "Your app will be available at:"
echo "👉 http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "======================================"

# Start the dev server
npm run dev
