# Regole operative per gli agenti

## Missione

Sviluppare un gestionale accessibile per un centro diurno, mantenendo il codice comprensibile a sviluppatori junior e proteggendo dati personali e informazioni sullo stato emotivo degli utenti.

## Ordine delle fonti

Quando due istruzioni sono in conflitto, seguire questo ordine:

1. richiesta esplicita e corrente del responsabile del progetto;
2. regole di sicurezza e privacy;
3. questo file;
4. documenti in `docs/`;
5. task corrente;
6. convenzioni già presenti nel codice.

Non inventare requisiti mancanti. Fare una domanda soltanto se la scelta cambia dati, sicurezza, flusso utente o criteri di accettazione. Per dettagli reversibili, scegliere l'opzione più semplice e dichiarare l'assunzione.

## Contesto obbligatorio

Prima di lavorare leggere, nell'ordine:

1. `docs/01-prodotto.md`;
2. `docs/02-architettura.md`;
3. il documento specifico coinvolto dal task;
4. il task in `tasks/`.

Se si modifica una regola di dominio, un endpoint, lo schema dati o una decisione architetturale, aggiornare nello stesso task anche il relativo documento.

## Vincoli non negoziabili

- Un solo backend e un solo database MySQL. Non introdurre microservizi, code, event bus, CQRS o Kubernetes senza una decisione approvata.
- Portale amministratore e app mobile usano la stessa API; non accedono direttamente a MySQL.
- Le password e i codici di approvazione non sono mai salvati né registrati in chiaro.
- Uno stato d'animo genera punti una sola volta e solo dopo l'approvazione dell'amministratore.
- Un check-in è valido solo dopo l'approvazione dell'amministratore.
- Il punteggio è calcolato dal backend, mai accettato dal client.
- Le operazioni sensibili devono essere autorizzate lato backend e inserite nell'audit log.
- UI con base bianca, testo principale `#4C7F71`; i paesaggi umbri sono decorativi e devono mantenere contrasto e leggibilità.
- Privilegiare nomi espliciti, funzioni brevi e flussi lineari. Evitare astrazioni create per un solo uso.

## Flusso di lavoro

1. Riassumere obiettivo, assunzioni e criteri di accettazione.
2. Ispezionare il codice esistente e lo stato Git; non sovrascrivere modifiche estranee.
3. Proporre un piano di massimo 5 passi.
4. Implementare il cambiamento minimo completo, verticalmente: dati, backend, UI e test solo quando coinvolti.
5. Eseguire test, lint, build e `bash scripts/check-harness.sh`.
6. Verificare manualmente almeno il percorso principale e un errore significativo.
7. Consegnare un riepilogo con file modificati, verifiche eseguite, limiti e migrazioni richieste.

## Regole di codice

- Controller: validazione del trasporto e chiamata al service; niente logica di business.
- Service applicativo: casi d'uso e transazioni.
- Dominio: regole pure e indipendenti dal framework quando utili.
- Repository/infrastruttura: persistenza e servizi esterni.
- DTO separati dalle entità del database.
- Date in UTC nel database e nelle API; conversione nel fuso locale soltanto nella UI.
- Migrazioni versionate; mai modificare manualmente un database condiviso.
- Errori API nel formato indicato in `docs/04-api.md`; niente stack trace al client.
- Non aggiungere dipendenze se la piattaforma standard risolve chiaramente il problema.

## Definition of Done

Un task è concluso soltanto se:

- tutti i criteri di accettazione sono verificati;
- autorizzazione e validazione sono lato server;
- test automatici coprono percorso felice e regola critica;
- build, test e lint passano;
- nessun segreto o dato sensibile appare in codice e log;
- schema, API e documentazione sono sincronizzati;
- UI verificata almeno a larghezza mobile e desktop quando coinvolta;
- eventuali limitazioni residue sono dichiarate.

## Divieti

- Non eseguire cancellazioni massive o migrazioni distruttive senza conferma.
- Non cambiare stack, schema o contratto API fuori dal task.
- Non disabilitare test o controlli di sicurezza per far passare la build.
- Non usare immagini remote senza licenza o attribuzione verificabile.
- Non confondere un mock riuscito con una verifica reale del flusso.

