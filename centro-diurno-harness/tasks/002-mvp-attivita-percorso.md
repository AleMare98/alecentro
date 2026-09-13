# TASK-002 — Attività approvabili e percorso personale

## Obiettivo

Completare il flusso MVP con attività che assegnano punti solo dopo approvazione amministrativa, storico check-in, traguardi personali e percorso mobile a cinque stadi.

## Incluso

- assegnazione di attività e stati d'animo a utenti tramite chiavi esterne;
- richiesta attività `PENDING` dopo check-in approvato;
- approvazione amministrativa con punti assegnati una sola volta al giorno;
- storico check-in nel portale amministratore;
- massimo punti configurabile per utente;
- progress bar mobile con soglie al 20%, 40%, 60%, 80% e 100% del massimo personale;
- disattivazione logica amministrativa di attività e stati d'animo.

## Criteri di accettazione

- [ ] Un'attività non approvata non modifica il punteggio dell'utente.
- [ ] Una seconda richiesta della stessa attività nella giornata riceve `409`.
- [ ] L'approvazione concorrente non assegna punti duplicati.
- [ ] L'utente vede soltanto attività e stati d'animo assegnati a sé.
- [ ] Lo storico admin mostra check-in pending e approvati.
- [ ] Il massimo personale aggiorna correttamente le cinque soglie della progress bar.
- [ ] La disattivazione mantiene lo storico e nasconde l'elemento all'utente.
