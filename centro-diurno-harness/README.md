# Harness engineering — Gestionale Centro Diurno

Questo pacchetto contiene il contesto e le regole operative che un agente AI deve seguire quando sviluppa il progetto.

## Come usarlo

1. Copia tutto il contenuto del pacchetto nella radice della repository.
2. Compila una nuova attività partendo da `tasks/TASK_TEMPLATE.md`.
3. Chiedi all'agente di leggere `AGENTS.md` e di svolgere il task.
4. Prima di accettare il lavoro, esegui `bash scripts/check-harness.sh` e i test del progetto.

`AGENTS.md` è il punto di ingresso. I file in `docs/` definiscono prodotto, architettura, dati, API, interfaccia, sicurezza e qualità.

## Stack iniziale consigliato

- Backend: ASP.NET Core Web API, architettura monolitica a livelli.
- Portale amministratore: React.
- App mobile: React Native.
- Database: una sola istanza MySQL.
- Autenticazione: JWT di breve durata e refresh token.

Lo stack può essere cambiato con una decisione esplicita, ma la semplicità è un requisito del progetto.

## Primo prompt consigliato

> Leggi AGENTS.md e tutti i documenti che esso indica. Poi analizza tasks/001-primo-task.md. Prima di modificare il codice, scrivi un piano breve, segnala eventuali ambiguità bloccanti e indica i criteri di accettazione che verificherai.

