# Sicurezza e privacy

Gli stati d'animo possono rivelare informazioni delicate. Applicare minimizzazione, controllo accessi e tracciabilità fin dall'MVP. Questo documento è una base tecnica, non sostituisce una valutazione legale/GDPR.

## Autenticazione

- Password con Argon2id o bcrypt configurato secondo linee guida correnti; salt gestito dalla libreria.
- Password iniziale temporanea e cambio obbligatorio al primo accesso.
- Access token breve; refresh token revocabile salvato solo come hash.
- Rate limiting su login e riautenticazioni; risposta generica contro l'enumerazione account.
- Logout revoca il refresh token.

## Autorizzazione

- Controllo del ruolo a ogni endpoint, lato server.
- Un utente legge e modifica soltanto le proprie risorse.
- L'amministratore deve essere attivo e riautenticato per approvare.
- Ogni query per risorsa dell'utente include anche il vincolo sull'identità, non soltanto l'ID ricevuto.

## Protezione dati

- HTTPS sempre; cifratura dei backup; segreti fuori dal repository.
- Log senza password, token, header Authorization o dettagli emotivi non necessari.
- Audit di creazione utenti, configurazioni, approvazioni e cambi di ruolo.
- Le approvazioni delle attività e l'assegnazione dei punti sono autorizzate lato server e non accettano punteggi dal client.
- Backup automatici con prova periodica di ripristino.
- Politiche di conservazione e cancellazione definite con il titolare del trattamento.
- Esportazione o cancellazione dati gestita tramite procedura amministrativa verificata.

## Minacce da testare

- utente che chiama endpoint admin;
- utente che cambia `userId` nella richiesta;
- doppio tap/doppia approvazione che assegna punti due volte;
- utente che tenta di completare un'attività non assegnata, disattivata o senza check-in approvato;
- password admin errata o tentativi ripetuti;
- token scaduto, revocato o di account disattivato;
- input malevolo e SQL injection;
- dati sensibili presenti nei log o nei messaggi di errore.
