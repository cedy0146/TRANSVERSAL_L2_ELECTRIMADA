#!/bin/bash
# Script pour libérer le port 3001

PID=$(lsof -ti :3001)
if [ -n "$PID" ]; then
  echo "Processus trouvé sur port 3001 (PID: $PID). Arrêt..."
  kill -9 $PID
  echo "Port 3001 libéré."
else
  echo "Aucun processus sur port 3001."
fi

echo "Prêt pour npm run dev."

