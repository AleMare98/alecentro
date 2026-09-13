# Contratto API iniziale

Prefisso: `/api/v1`. Tutte le rotte richiedono HTTPS. `ADMIN` e `USER` indicano i ruoli autorizzati.

| Metodo e rotta | Ruolo | Scopo | Risposte principali |
| --- | --- | --- | --- |
| `POST /auth/login` | pubblico | login e token | `200`, `400`, `401` |
| `POST /auth/refresh` | pubblico con refresh token | rinnovo token | `200`, `401` |
| `POST /auth/change-password` | autenticato | cambio password | `204`, `400`, `401` |
| `POST /admin/users` | ADMIN | crea utente | `201`, `400`, `409` |
| `PATCH /admin/users/{id}` | ADMIN | attiva/disattiva utente | `200`, `400`, `404` |
| `PUT /admin/users/{id}/goal` | ADMIN | assegna traguardo | `200`, `400`, `404` |
| `PUT /admin/users/{id}/activities` | ADMIN | assegna attività | `204`, `400`, `404` |
| `POST /admin/moods` | ADMIN | crea e assegna stato d'animo (`userId`) | `201`, `400`, `409` |
| `DELETE /admin/moods/{id}` | ADMIN | disattiva stato d'animo | `204`, `401`, `403`, `404` |
| `POST /admin/activities` | ADMIN | crea e assegna attività (`userId`) | `201`, `400`, `409` |
| `DELETE /admin/activities/{id}` | ADMIN | disattiva attività | `204`, `401`, `403`, `404` |
| `PUT /admin/users/{id}/moods` | ADMIN | assegna stati d'animo | `204`, `400`, `404` |
| `POST /me/check-ins` | USER | richiede check-in | `201`, `401`, `409` |
| `POST /admin/check-ins/{id}/approve` | ADMIN + riautenticazione | approva check-in | `200`, `401`, `403`, `404`, `409` |
| `GET /me/moods` | USER | stati disponibili | `200`, `401` |
| `POST /me/mood-entries` | USER | invia stato d'animo | `201`, `400`, `401`, `409` |
| `POST /me/activities/{id}/complete` | USER | richiede approvazione attività | `201`, `401`, `404`, `409` |
| `POST /admin/mood-entries/{id}/approve` | ADMIN + riautenticazione | approva e accredita punti | `200`, `401`, `403`, `404`, `409` |
| `POST /admin/activities/{id}/approve` | ADMIN | approva attività e accredita punti | `200`, `401`, `403`, `404`, `409` |
| `GET /admin/check-ins/history` | ADMIN | storico check-in | `200`, `401`, `403` |
| `GET /admin/pending` | ADMIN | richieste pending di check-in, stati d'animo e attività | `200`, `401`, `403` |
| `GET /me/progress` | USER | punti, milestone e traguardo | `200`, `401`, `404` |

## Approvazione con password

Il body di approvazione può contenere la password dell'amministratore soltanto sulla connessione HTTPS e non deve essere registrato nei log. Il backend verifica password, ruolo e stato dell'account, applica rate limiting e poi esegue l'operazione. Una successiva evoluzione può usare un PIN di approvazione separato e cifrato/derivato in modo sicuro.

## Formato errori

Usare Problem Details (`application/problem+json`):

```json
{
  "type": "https://example.local/problems/check-in-required",
  "title": "Check-in approvato richiesto",
  "status": 409,
  "code": "CHECK_IN_REQUIRED",
  "traceId": "00-abcd"
}
```

Il client decide il messaggio UI usando `code`; non analizza il testo di `title`.

## Idempotenza e concorrenza

- Le richieste duplicate non devono creare più check-in, registrazioni approvate o movimenti punti.
- Le richieste attività duplicate nella stessa giornata restituiscono `409`.
- L'approvazione attività usa il punteggio fotografato alla richiesta, non il valore eventualmente modificato dopo.
- L'API restituisce `409` quando lo stato corrente non consente l'operazione.
- Gli endpoint di approvazione ricontrollano lo stato dentro la transazione.
