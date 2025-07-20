#!/bin/sh

max_attempts=20
attempt=1

until ./wait-for-it.sh db:3306 --timeout=10 --quiet; do
  if [ $attempt -eq $max_attempts ]; then
    echo "DB did not become available after $max_attempts attempts. Exiting."
    exit 1
  fi
  echo "DB not ready. Retry $attempt/$max_attempts..."
  attempt=$((attempt + 1))
  sleep 5
done

echo "DB is ready. Starting application..."
exec java -jar app.jar
