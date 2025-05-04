#!/bin/bash

KONG_API="http://localhost:8001"

echo "📡 Înregistrare servicii și rute în Kong..."

# Auth Service
curl -s -X POST $KONG_API/services \
  --data name=auth-service \
  --data url=http://auth-service:3001
curl -s -X POST $KONG_API/routes \
  --data service.name=auth-service \
  --data paths[]=/auth

# Booking Service
curl -s -X POST $KONG_API/services \
  --data name=booking-service \
  --data url=http://booking-service:3002
curl -s -X POST $KONG_API/routes \
  --data service.name=booking-service \
  --data paths[]=/booking

# Notification Service
curl -s -X POST $KONG_API/services \
  --data name=notification-service \
  --data url=http://notification-service:3003
curl -s -X POST $KONG_API/routes \
  --data service.name=notification-service \
  --data paths[]=/notify

# Database Service
curl -s -X POST $KONG_API/services \
  --data name=database-service \
  --data url=http://database-service:3004
curl -s -X POST $KONG_API/routes \
  --data service.name=database-service \
  --data paths[]=/db

echo "✅ Serviciile au fost înregistrate în Kong!"
