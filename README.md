# Centro Diurno Intelligente

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
