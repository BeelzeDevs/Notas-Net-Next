#!/bin/bash

# Configuración de base de datos
DB_NAME="challenge-Aprile"
DB_USER="postgres"
DB_PASSWORD="admin"
DB_PORT=5432
DB_HOST="localhost"
SQL_FILE="./database/bbdd.sql"

# Rutas relativas
BACKEND_DIR="./backend"
FRONTEND_DIR="./frontend"

echo "�� Verificando existencia de la base de datos..."

export PGPASSWORD=$DB_PASSWORD

# Verificar si la base ya existe
DB_EXIST=$(psql -U $DB_USER -h $DB_HOST -p $DB_PORT -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'")

if [ "$DB_EXIST" == "1" ]; then
  echo "✅ La base de datos '$DB_NAME' ya existe."
else
  echo "⚙️ Creando la base de datos '$DB_NAME'..."
  createdb -U $DB_USER -h $DB_HOST -p $DB_PORT $DB_NAME
  if [ $? -ne 0 ]; then
    echo "❌ Error al crear la base de datos. Abortando."
    exit 1
  fi
fi

echo "� Importando datos desde '$SQL_FILE'..."
psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -f $SQL_FILE

echo "� Iniciando backend..."
cd $BACKEND_DIR
dotnet restore
dotnet run &
BACKEND_PID=$!
cd ..

echo "� Iniciando frontend..."
cd $FRONTEND_DIR
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Todo corriendo:"
echo "� Backend en proceso $BACKEND_PID"
echo "� Frontend en proceso $FRONTEND_PID"
echo ""
echo "Para detener todo, usá: kill $BACKEND_PID $FRONTEND_PID"
