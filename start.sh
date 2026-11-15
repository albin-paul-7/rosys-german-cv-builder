#!/bin/bash

export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin:$HOME/.local/bin:$PATH"

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "=========================================================="
echo " Starting Rosy's German School CV Studio"
echo "=========================================================="

# Kill any previous node processes on port 5001 / 3000
kill $(lsof -t -i:5001) 2>/dev/null
kill $(lsof -t -i:3000) 2>/dev/null
pkill -f cloudflared 2>/dev/null

# Start Backend
cd "$DIR/backend"
node server.js > /tmp/rosys-backend.log 2>&1 &
BACKEND_PID=$!
echo "✓ Backend server running on port 5001 (PID: $BACKEND_PID)"

# Start Frontend
cd "$DIR/frontend"
npm run dev > /tmp/rosys-frontend.log 2>&1 &
FRONTEND_PID=$!
echo "✓ Frontend dev server running on port 3000 (PID: $FRONTEND_PID)"

# Start Cloudflare Tunnel
cloudflared tunnel --url http://localhost:5001 > /tmp/rosys-tunnel.log 2>&1 &
TUNNEL_PID=$!
echo "✓ Cloudflare Tunnel connecting..."

sleep 4

PUBLIC_URL=$(grep -o 'https://[a-zA-Z0-9.-]*trycloudflare.com' /tmp/rosys-tunnel.log 2>/dev/null | head -n 1)

echo "=========================================================="
echo " 🌐 PUBLIC LINK (Share with students):"
if [ -n "$PUBLIC_URL" ]; then
  echo "    $PUBLIC_URL"
else
  echo "    Tunnel starting... check /tmp/rosys-tunnel.log"
fi
echo ""
echo " 💻 LOCAL LINK (For you on this Mac):"
echo "    http://localhost:3000"
echo "=========================================================="

open http://localhost:3000

wait
