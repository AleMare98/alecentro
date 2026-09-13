# Modello dati MySQL

Questo è il modello logico minimo. Nomi e tipi esatti possono seguire le convenzioni del codice, ma vincoli e relazioni devono restare equivalenti.

| Tabella | Campi principali | Note |
| --- | --- | --- |
| `users` | `id`, `username`, `password_hash`, `role`, `must_change_password`, `is_active`, `created_at` | `username` univoco; ruoli `ADMIN`, `USER` |
| `user_goals` | `user_id`, `title`, `target_points` | un solo traguardo per utente; massimo modificabile dall'admin |
| `activities` | `id`, `title`, `description`, `points`, `active` | catalogo gestito dall'admin |
| `user_activities` | `user_id`, `activity_id`, `assigned_at` | chiave composta, relazione molti-a-molti |
| `moods` | `id`, `name`, `points`, `active` | `points >= 0` |
| `user_moods` | `user_id`, `mood_id`, `assigned_at` | stati disponibili per utente |
| `checkins` | `id`, `user_id`, `checkin_date`, `status`, `approved_at` | un solo check-in per utente/giorno; storico visibile all'admin |
| `mood_entries` | `id`, `user_id`, `mood_id`, `status`, `points_awarded`, `created_at`, `approved_at` | richiesta pending e punti dopo approvazione |
| `activity_entries` | `id`, `user_id`, `activity_id`, `activity_date`, `points_snapshot`, `status`, `points_awarded`, `created_at`, `approved_at` | una richiesta per attività, utente e giorno |
| `point_transactions` | `id`, `user_id`, `mood_entry_id`, `points`, `created_at` | `mood_entry_id` univoco impedisce doppi punti |
| `refresh_tokens` | `id`, `user_id`, `token_hash`, `expires_at`, `revoked_at` | mai salvare il token originale |
| `audit_logs` | `id`, `actor_user_id`, `action`, `entity_type`, `entity_id`, `occurred_at`, `metadata_json` | niente password, token o testo sensibile inutile |

## Vincoli essenziali

- Foreign key su tutte le relazioni.
- Indici su `username`, date di check-in, chiavi esterne e campi usati nei filtri.
- `point_transactions.mood_entry_id` deve essere `UNIQUE`.
- `activity_entries` deve impedire una seconda richiesta della stessa attività nello stesso giorno.
- Le approvazioni e la creazione del movimento punti avvengono in un'unica transazione.
- Lo storico non viene cancellato quando una configurazione è disattivata.
- Le migrazioni devono essere reversibili quando possibile e provate su un database vuoto.

## Dati personali

Raccogliere solo i dati realmente necessari. Per l'MVP il nome utente può essere uno pseudonimo; nome, cognome, dati sanitari e note libere non sono necessari salvo requisito approvato.
