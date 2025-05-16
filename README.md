# IDP_project

TODO:
- validating /mnt/c/Users/vasil/Desktop/Poli/IDP/proiect/IDP_project/docker-compose.yml: services.booking-service.networks must be a list
- creare docker for cerere-rezervare
- creare notif-system


TODO #2:
- de modificat mesajul din e-mail
- de modificat parametrii din comanda de booking
- de adaugat camere in init.sql


Register:
curl -X POST http://localhost:3001/api/auth/register \
-H "Content-Type: application/json" \
-d '{"email": "test@email.com", "password": "parola123"}'


CU KONG:
curl -X POST http://localhost:8000/api/auth/register   -H "Content-Type: application/json"   -d '{"email":"test@email.com", "password":"parola123"}'

Creare Camera:
curl -X POST http://localhost:3004/api/rooms \
-H "Content-Type: application/json" \
-d '{
  "name": "Camera Misterelor",
  "description": "Temă detectiv",
  "min_players": 2,
  "max_players": 6,
  "duration_minutes": 60
}'


CU KONG:




REZERVARE CAMERA
CU KONG:
curl -X POST http://localhost:8000/api/bookings   -H "Content-Type: application/json"   -d '{
    "user_id": 1,
    "room_id": 1,
    "booking_time": "2025-04-15 12:00:00"
  }'

curl -X POST http://localhost:3004/api/bookings \
-H "Content-Type: application/json" \
-d '{"user_id": 1, "room_id": 1, "booking_time": "2025-04-15 12:00:00"}'


ENDPOINTS:
/api/bookings | GET | Obține rezervări (opțional ?user_id=...)
/api/rooms/available | GET | Camere disponibile într-un interval
/api/rooms | POST | Adaugă o cameră nouă

