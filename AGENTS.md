# Regole del progetto

## Obiettivo
Realizzare il gestionale del centro diurno con un portale amministratore e un'app mobile utente.

## Vincoli obbligatori

- database unico MySQL;
- interfaccia bianca, testo principale `#4C7F71`, immagini dell'Umbria quando usate;
- codice semplice e leggibile per un progetto ITS;
- ogni azione dell'utente che assegna punti richiede approvazione dell'amministratore;
- le password non vengono mai salvate in chiaro;
- le API protette richiedono JWT.

## Verifica prima della consegna

1. controllare `GET /health`;
2. controllare login admin e login utente;
3. controllare che check-in e stati d'animo restino `PENDING` fino all'approvazione;
4. controllare che i punti vengano assegnati una sola volta;
5. eseguire `npm run build` nel portale web.
