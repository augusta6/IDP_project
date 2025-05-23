#!/bin/bash
KONG_API="http://localhost:8001"

echo "Reînregistrare servicii și rute în Kong..."

echo "Ștergere rute existente..."
for route in $(curl -s $KONG_API/routes | jq -r '.data[].id'); do
  curl -s -X DELETE $KONG_API/routes/$route
done

echo "Ștergere servicii existente..."
for svc in auth-service booking-service notification-service database-service; do
  curl -s -X DELETE $KONG_API/services/$svc
done

# Auth Service — ruta directă
curl -s -X POST $KONG_API/services \
  --data name=auth-service \
  --data url=http://auth-service:3001

curl -s -X POST $KONG_API/routes \
  --data service.name=auth-service \
  --data paths[]=/api/auth \
  --data strip_path=false


# Booking Service
curl -s -X POST $KONG_API/services \
  --data name=booking-service \
  --data url=http://booking-service:3002

curl -s -X POST $KONG_API/routes \
  --data service.name=booking-service \
  --data paths[]=/api/booking \
  --data strip_path=false


# Notification Service
curl -s -X POST $KONG_API/services \
  --data name=notification-service \
  --data url=http://notification-service:3003

curl -s -X POST $KONG_API/routes \
  --data service.name=notification-service \
  --data paths[]=/api/notify \
  --data strip_path=false

# Database Service
curl -s -X POST $KONG_API/services \
  --data name=database-service \
  --data url=http://database-service:3004

curl -s -X POST $KONG_API/routes \
  --data service.name=database-service \
  --data paths[]=/api/db \
  --data strip_path=false

echo "Toate serviciile au fost înregistrate!!!!"
