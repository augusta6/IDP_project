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