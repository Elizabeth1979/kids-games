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
