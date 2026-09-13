# Centro Diurno Intelligente

English version

An MVP management system for a day centre. It provides a web portal for administrators and a mobile app for users, both connected to the same Node.js/Express API and MySQL database.

## Features

- Administrator portal for login, user creation, activities, moods and personal goals.
- User mobile app for login, check-in requests, mood submissions, assigned activities and personal progress.
- JWT-protected API and securely hashed passwords.
- Check-ins, moods and activity completions remain pending until an administrator approves them.
- Points are awarded only once and only after approval.

## Technology

- Backend: Node.js, Express and MySQL
- Admin portal: React
- Mobile app: Expo and React Native

## Getting started

1. Start MySQL and create the database by running `backend/sql/schema.sql`.
2. Copy `backend/.env.example` to `backend/.env`, then provide your MySQL credentials and a secure JWT secret.
3. Start the API:

```bash
cd backend
npm install
npm run dev
```

4. Start the administrator portal:

```bash
cd admin-web
npm install
npm run dev
```

5. Start the mobile app:

```bash
cd mobile-app
npm install
npx expo start
```

To use the mobile app on a physical device, set `EXPO_PUBLIC_API_URL` in `mobile-app/.env` to the computer's LAN address, ending with `/api`. The device and computer must be connected to the same Wi-Fi/LAN network. Restart Expo after changing the file.

Create the initial administrator account with `npm run seed` in the `backend` directory, using the credentials specified in `backend/.env`.

## Project status

AI predictions, notifications and QR/GPS features are planned as future extensions and are not simulated in this MVP.

---

## Versione italiana

MVP del gestionale per centro diurno. Il progetto comprende:

- `backend`: API REST Node.js/Express, JWT e MySQL;
- `admin-web`: portale web dell'amministratore;
- `mobile-app`: starter Expo/React Native per gli utenti.

## Avvio rapido

1. Avvia MySQL e crea il database eseguendo `backend/sql/schema.sql`.
2. Copia `backend/.env.example` in `backend/.env` e inserisci le credenziali MySQL.
3. Avvia l'API:

```bash
cd backend
npm install
npm run dev
```

4. Avvia il portale:

```bash
cd admin-web
npm install
npm run dev
```

5. Avvia l'app mobile con Expo:

```bash
cd mobile-app
npm install
npx expo start
```

Per usare l'app da un telefono, modificare l'unico valore in
`mobile-app/.env`: `EXPO_PUBLIC_API_URL`. Deve contenere l'indirizzo LAN del
computer e terminare con `/api`. Il telefono e il computer devono essere sulla
stessa rete Wi-Fi/LAN; dopo aver modificato `.env`, riavviare Expo.

L'account admin iniziale viene creato con `npm run seed` usando i valori presenti nel file `.env`.

## Flussi implementati

- admin: login, creazione utenti, attività, stati d'animo e traguardo;
- utente: login, richiesta check-in, visualizzazione attività/percorso, invio stato d'animo;
- admin: approvazione check-in e stato d'animo con password;
- assegnazione automatica dei punti dopo l'approvazione;
- percorso a milestone basato sui punti totali.

Le previsioni AI, le notifiche e il QR/GPS sono predisposti come estensioni successive e non vengono simulati nel MVP.
