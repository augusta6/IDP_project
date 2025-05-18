## 6296347 | 2025-05-18
- DONE TOKEN

### Added:
- Adăugare fallback pentru `logout` și tratare JWT invalid sau expirat.

### Changed:
- Implementare verificare JWT token în `booking-service` cu `verifyToken.js`.
- Utilizarea corectă a `jsonwebtoken` în container.


## f39b409 | 2025-05-17 
- test2 token

### Added:
- Testare rutare completă prin Kong pentru `booking-service`.
- Verificare JWT transmis prin header `Authorization`.

### Changed:
- Teste CURL și ajustare rutare Kong.


## b0ccd64 | 2025-05-17
- test token

### Changed:
- Încercare rutare cu token JWT emis de `auth-service`.


## ed1798f | 2025-05-16 
- try token

### Added:
- Adăugat `verifyToken` ca middleware în `routes.js` în cadrul serviciului de booking.
- Integrare inițială cu tokenuri JWT între `auth-service` și `booking-service`.


## 2c126be | 2025-05-16
- functionalitati done

### Changed:
- Verificarea rutelor și funcțiilor asociate serviciilor implementate.
- Generare token JWT pe login.


## accc4c2 | 2025-05-04
- Adaugă workflow CI/CD pentru Docker

### Added:
- Implementare inițială pentru workflow CI/CD folosind GitLab CI.


## 84d9c35 | 2025-05-04
- portainer swarm

### Added:
- Adăugat serviciul Portainer pentru monitorizare și UI în Docker.
- Configurare volum persistent `portainer_data`.


## 7a6f1e6 | 2025-05-04
- grafana prom

### Added:
- Adăugat Grafana + Prometheus pentru observabilitate.
- Configurare fișier `prometheus.yml`.


## 2cbac17 | 2025-05-04 
- Kong integrated

### Added:
- Integrare completă Kong ca API Gateway.
- Script `kong-setup.sh` creat pentru automatizarea rutelor și serviciilor.


## 4881049 - augusta6 (2025-04-15)
- booking done

### Added:
- **Booking Service:** Inițializare și dezvoltare funcționalitate de rezervare.
- Implementarea funcțiilor în booking-service pentru a implementa endpointurilor de rezervare prin axios. 

### Changed:
- Definirea noilor endpointuri în database-service pentru booking
- Definirea functiilor de verificarea disponibilitatilor, de adaugare de camere


## d3f28ab - augusta6 (2025-04-15)
- auth done

### Added:
- **Auth Service:** Sistemul de autentificare a fost adăugat, cu funcționalități de login și înregistrare:
    - expune endpointuri pentru înregistrare și autentificare
    - generează token JWT
    - validează utilizatorul prin apel către un database-service, nu direct în baza de date
    - trimite cereri HTTP către database-service pentru a crea sau verifica un utilizator

### Changed:
- Modificarea structurii proiectului pentru organizarea pe microservicii, inclusiv autentificare (auth-service),
booking (booking-service) și interacțiune cu baza de date (db-service).
- Configurează MySQL containerul în docker-compose.yml să folosească scriptul init.sql.


## 16f95bc - augusta6 (2025-04-12)

### Added:
- Adăugarea de task-uri și TODO-uri pentru dezvoltare ulterioară.


## b66d509 - andreeaalexandru (2025-04-12)

### Added:
- Crearea structurii inițiale a proiectului (inițial auth-service și db-service).
- Inițializarea bazei de date (app_db) cu scheme și tabele de bază (users, reservations, USER_RESERVATIONS).
- Au fost adăugate fișiere de configurare inițiale pentru rulare locală și containerizare:
    - Pornirea locală a serviciilor (npm install, npm start, scripturi de setup)
    - Eventual rulare simultană (docker-compose.yml)
    - Configurarea conexiunii la baza de date (.env, config.js)
- Integrare Adminer - utilitar gestionare DB



## 6305eb6 - augusta6 (2025-04-12)

### Added:
- Initializare repository proiect.