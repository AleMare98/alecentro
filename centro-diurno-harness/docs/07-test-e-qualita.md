# Strategia di test

## Piramide minima

- Unit test: regole punti, milestone, stati consentiti e autorizzazioni pure.
- Integration test: API + MySQL reale in container per vincoli, transazioni e concorrenza.
- UI/component test: rendering degli stati principali.
- Un piccolo test end-to-end: creazione utente → check-in → attività → approvazioni → progresso.

## Casi obbligatori

1. Check-in approvato correttamente.
2. Secondo check-in nello stesso giorno rifiutato.
3. Stato d'animo senza check-in approvato rifiutato.
4. Stato non assegnato o disattivato rifiutato.
5. Password amministratore errata rifiutata e senza dati nei log.
6. Due approvazioni concorrenti producono un solo movimento punti.
7. Cambio dei punti nel catalogo non modifica lo storico già approvato.
8. Utente non può leggere risorse di un altro utente.
9. Milestone corretta sotto, sopra e uguale al traguardo.
10. Attività senza check-in approvato rifiutata.
11. Seconda richiesta della stessa attività nella giornata rifiutata.
12. Approvazione attività concorrente assegna punti una sola volta.
13. Storico check-in restituisce richieste pending e approvate.
14. Massimo personale e cinque stadi della progress bar sono calcolati correttamente.

## Comandi attesi

Il repository finale deve offrire comandi equivalenti, preferibilmente raccolti in script:

```bash
dotnet build
dotnet test
npm run lint --prefix apps/admin-web
npm test --prefix apps/admin-web
npm run lint --prefix apps/mobile
npm test --prefix apps/mobile
bash scripts/check-harness.sh
```

Se una parte non esiste ancora, il task deve indicarlo chiaramente; non fingere una verifica.
