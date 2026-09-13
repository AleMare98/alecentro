# TASK-001 — Fondazioni del sistema

## Obiettivo

Creare i tre progetti eseguibili, il database locale e un primo flusso di autenticazione senza ancora implementare check-in o punti.

## Storia utente

Come sviluppatore, voglio avviare API, portale, app e MySQL con istruzioni ripetibili, così da costruire le funzionalità su una base verificabile.

## Incluso

- solution ASP.NET Core con health check;
- progetto React e progetto React Native;
- MySQL locale e prima migrazione `users`;
- login, JWT, refresh token e cambio obbligatorio della password iniziale;
- account admin iniziale creato tramite configurazione/seed sicuro;
- `.env.example`, README di avvio e test base.

## Escluso

- gestione utenti via UI;
- check-in, stati d'animo, attività, punti e milestone;
- pubblicazione in produzione.

## Criteri di accettazione

- [ ] Un nuovo sviluppatore avvia il sistema seguendo il README.
- [ ] L'health check verifica anche la connessione MySQL.
- [ ] L'admin accede con credenziali iniziali e deve cambiare password.
- [ ] Password e refresh token sono salvati soltanto come hash.
- [ ] Un token scaduto o alterato riceve `401`.
- [ ] Nessun segreto reale è versionato.
- [ ] Build e test passano.

