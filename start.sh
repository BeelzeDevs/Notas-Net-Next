#!/bin/bash

# Configuraci√≥n de base de datos
DB_NAME="challenge-Aprile"
DB_USER="postgres"
DB_PASSWORD="admin"
DB_PORT=5432
DB_HOST="localhost"

SCHEMA_FILE="./database/schema.sql"
SEED_FILE="./database/seed.sql"

# Rutas relativas
BACKEND_DIR="./backend"
FRONTEND_DIR="./frontend"

export PGPASSWORD=$DB_PASSWORD

echo "Ì∑® Eliminando base de datos '$DB_NAME' si existe..."
dropdb -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" "$DB_NAME" 2>/dev/null && echo "‚úÖ Base de datos eliminada." || echo "‚ö†Ô∏è  No se pudo eliminar (puede que no exista)."

echo "Ì¥é Verificando existencia de la base de datos..."
DB_EXIST=$(psql -U $DB_USER -h $DB_HOST -p $DB_PORT -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'")
if [ "$DB_EXIST" == "1" ]; then
  echo "‚úÖ La base de datos '$DB_NAME' ya existe."
else
  echo "‚öôÔ∏è Creando la base de datos '$DB_NAME'..."
  createdb -U $DB_USER -h $DB_HOST -p $DB_PORT $DB_NAME
  if [ $? -ne 0 ]; then
    echo "‚ùå Error al crear la base de datos. Abortando."
    exit 1
  fi
fi

echo "Ì≥¶ Verificando estructura (schema)..."
TABLE_EXISTS=$(psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -tAc "SELECT to_regclass('public.notas');")

if [ "$TABLE_EXISTS" == "notas" ]; then
  echo "‚úÖ Las tablas ya est√°n creadas."
else
  echo "Ì∑± Creando estructura de base de datos desde '$SCHEMA_FILE'..."
  psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -f "$SCHEMA_FILE"
fi

echo "Ìº± Verificando si hay datos en 'notas'..."
HAS_DATA=$(psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -tAc "SELECT COUNT(*) FROM notas;" 2>/dev/null)

if [[ "$HAS_DATA" =~ ^[0-9]+$ && "$HAS_DATA" -gt 0 ]]; then
  echo "‚ö†Ô∏è  La tabla 'notas' ya contiene datos. No se ejecutar√° el seed."
else
  echo "Ì≥§ Insertando datos iniciales desde '$SEED_FILE'..."
  psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -f "$SEED_FILE"
fi

# Liberar puerto 5000 - Linux/macOS
echo "Ì∑π Liberando puerto 5000 (Unix)..."
if command -v lsof &> /dev/null; then
  PID5000=$(lsof -t -i:5000)
  if [ -n "$PID5000" ]; then
    kill -9 "$PID5000"
    echo "  Ìªë Proceso en puerto 5000 detenido (PID $PID5000)"
  fi
else
  echo "  ‚ö†Ô∏è 'lsof' no est√° instalado. Saltando limpieza Unix."
fi

# Liberar puerto 5000 - Windows
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  echo "Ì∑π Liberando puerto 5000 (Windows)..."
  for pid in $(netstat -aon | grep ':5000' | awk '{print $5}' | uniq); do
    taskkill //PID $pid //F 2> /dev/null
    echo "  Ìªë Proceso en puerto 5000 detenido (PID $pid)"
  done
fi


echo "Ì∑π Liberando puerto 3000 si est√° ocupado..." 
PID3000=$(lsof -t -i:3000)
if [ -n "$PID3000" ]; then 
  kill -9 "$PID3000" 
  echo "  Ìªë Proceso en puerto 3000 detenido (PID $PID3000)" 
fi
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  echo "Ì∑π Liberando puerto 3000 en Windows..."
  for pid in $(netstat -aon | grep :3000 | awk '{print $5}' | uniq); do
    taskkill //PID $pid //F 2> /dev/null
  done
fi

echo "Ì∫Ä Iniciando backend..."
cd $BACKEND_DIR
dotnet restore
dotnet run &
BACKEND_PID=$!
cd ..

echo "Ìºê Iniciando frontend..."
cd $FRONTEND_DIR
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "‚úÖ Todo corriendo:"
echo "Ì¥π Backend en proceso $BACKEND_PID"
echo "Ì¥π Frontend en proceso $FRONTEND_PID"
echo ""
echo "Para detener todo, us√°: kill $BACKEND_PID $FRONTEND_PID"
