# API essenziali

| Metodo | Endpoint | Accesso | Scopo |
|---|---|---|---|
| POST | `/api/auth/login` | pubblico | accesso |
| GET | `/api/me` | utente | dati personali, attività e stati d'animo |
| POST | `/api/me/checkins` | utente | crea check-in pending |
| POST | `/api/me/moods` | utente | invia stato d'animo pending |
| POST | `/api/me/activities/:id/complete` | utente | richiede l'approvazione di un'attività |
| POST | `/api/admin/users` | admin | crea utente |
| POST | `/api/admin/moods` | admin | crea e assegna uno stato d'animo (`userId`) |
| DELETE | `/api/admin/moods/:id` | admin | disattiva uno stato d'animo assegnato |
| POST | `/api/admin/activities` | admin | crea e assegna un'attività (`userId`) |
| DELETE | `/api/admin/activities/:id` | admin | disattiva un'attività assegnata |
| GET | `/api/admin/pending` | admin | richieste da approvare |
| GET | `/api/admin/checkins/history` | admin | storico dei check-in |
| POST | `/api/admin/checkins/:id/approve` | admin | approva check-in |
| POST | `/api/admin/moods/:id/approve` | admin | approva e assegna punti |
| POST | `/api/admin/activities/:id/approve` | admin | approva attività e assegna punti |
| PUT | `/api/admin/users/:id/goal` | admin | imposta il punteggio massimo personale |
