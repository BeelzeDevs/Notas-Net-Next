#!/bin/bash

# Configuración de base de datos
DB_NAME="challenge-Aprile"
DB_USER="postgres"
DB_PASSWORD="admin"
DB_PORT=5432
DB_HOST="localhost"

SCHEMA_FILE="./database/schema.sql"
SEED_FILE="./database/seed.sql"

# Rutas relativas
BACKEND_DIR="./Backend"
FRONTEND_DIR="./frontend"

export PGPASSWORD=$DB_PASSWORD

echo "-Eliminando base de datos '$DB_NAME' si existe..."
dropdb -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" "$DB_NAME" 2>/dev/null && echo "✅ Base de datos eliminada." || echo "⚠️  No se pudo eliminar (puede que no exista)."

echo "- Verificando existencia de la base de datos..."
DB_EXIST=$(psql -U $DB_USER -h $DB_HOST -p $DB_PORT -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'")
if [ "$DB_EXIST" == "1" ]; then
  echo " ✅ La base de datos '$DB_NAME' ya existe."
else
  echo " ⚙️ Creando la base de datos '$DB_NAME'..."
  createdb -U $DB_USER -h $DB_HOST -p $DB_PORT $DB_NAME
  if [ $? -ne 0 ]; then
    echo " ❌ Error al crear la base de datos. Abortando."
    exit 1
  fi
fi

echo "- Verificando estructura (schema)..."
TABLE_EXISTS=$(psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -tAc "SELECT to_regclass('public.notas');")

if [ "$TABLE_EXISTS" == "notas" ]; then
  echo " ✅ Las tablas ya están creadas."
else
  echo "- Creando estructura de base de datos desde '$SCHEMA_FILE'..."
  psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -f "$SCHEMA_FILE"
fi

echo "- Verificando si hay datos en 'notas'..."
HAS_DATA=$(psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -tAc "SELECT COUNT(*) FROM notas;" 2>/dev/null)

if [[ "$HAS_DATA" =~ ^[0-9]+$ && "$HAS_DATA" -gt 0 ]]; then
  echo "⚠️  La tabla 'notas' ya contiene datos. No se ejecutará el seed."
else
  echo "- Insertando datos iniciales desde '$SEED_FILE'..."
  psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -f "$SEED_FILE"
fi

# Liberar puerto 5000 - Linux/macOS
echo "- Liberando puerto 5000 (Unix)..."
if command -v lsof &> /dev/null; then
  PID5000=$(lsof -t -i:5000)
  if [ -n "$PID5000" ]; then
    kill -9 "$PID5000"
    echo "  Proceso en puerto 5000 detenido (PID $PID5000)"
  fi
else
  echo "  ⚠️ 'lsof' no está instalado. Saltando limpieza Unix."
fi

# Liberar puerto 5000 - Windows
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  echo "- Liberando puerto 5000 (Windows)..."
  for pid in $(netstat -aon | grep ':5000' | awk '{print $5}' | uniq); do
    taskkill //PID $pid //F 2> /dev/null
    echo "  Proceso en puerto 5000 detenido (PID $pid)"
  done
fi


echo "- Liberando puerto 3000 si está ocupado..." 
PID3000=$(lsof -t -i:3000)
if [ -n "$PID3000" ]; then 
  kill -9 "$PID3000" 
  echo "  Proceso en puerto 3000 detenido (PID $PID3000)" 
fi
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  echo " Liberando puerto 3000 en Windows..."
  for pid in $(netstat -aon | grep :3000 | awk '{print $5}' | uniq); do
    taskkill //PID $pid //F 2> /dev/null
  done
fi

echo "- Iniciando backend..."
cd $BACKEND_DIR
dotnet restore
dotnet run &
BACKEND_PID=$!
cd ..

echo "- Iniciando frontend..."
cd $FRONTEND_DIR
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo " ✅ Todo corriendo:"
echo "-> Backend en proceso $BACKEND_PID"
echo "-> Frontend en proceso $FRONTEND_PID"
echo ""
echo "Para detener todo, usá: kill $BACKEND_PID $FRONTEND_PID"
