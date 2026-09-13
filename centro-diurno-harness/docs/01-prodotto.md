# Prodotto e regole di dominio

## Obiettivo

Il sistema aiuta gli utenti del centro diurno a registrare la presenza, comunicare come si sentono e avanzare lungo un percorso motivazionale a punti, sotto la supervisione degli amministratori.

## Ruoli

### Amministratore

- crea e disattiva gli account degli utenti;
- imposta una password iniziale da cambiare al primo accesso;
- assegna attività personalizzate;
- crea il catalogo degli stati d'animo con nome, icona/colore e punti;
- assegna a ogni utente un traguardo finale espresso in punti;
- approva check-in e registrazioni dello stato d'animo tramite riautenticazione;
- consulta progressi e audit delle operazioni.

### Utente

- accede dall'app mobile con le credenziali ricevute;
- richiede il check-in;
- seleziona uno stato d'animo disponibile;
- vede attività assegnate, punteggio, milestone e traguardo;
- non può assegnarsi punti né approvare operazioni.

## Flussi principali

### Configurazione utente

1. L'amministratore crea l'account.
2. Il sistema salva soltanto l'hash della password.
3. L'amministratore assegna attività, traguardo e stati d'animo utilizzabili.
4. L'utente cambia la password al primo accesso.

### Check-in

1. L'utente autenticato richiede il check-in.
2. Il backend crea una richiesta `PENDING` senza punti.
3. Un amministratore si riautentica sul dispositivo e approva.
4. Il backend registra approvatore e orario e porta il check-in in `APPROVED`.

### Stato d'animo e punti

1. È necessario un check-in approvato nella giornata.
2. L'utente seleziona uno stato d'animo assegnato e attivo.
3. Il backend crea una registrazione `PENDING` e fotografa i punti configurati in quel momento.
4. Un amministratore si riautentica e approva.
5. Nella stessa transazione il backend imposta `APPROVED`, crea un solo movimento punti e aggiorna il progresso.

### Attività e punti

1. L'utente con check-in approvato richiede il completamento di un'attività assegnata.
2. Il backend crea una richiesta `PENDING` e fotografa i punti dell'attività.
3. L'amministratore approva la richiesta.
4. Nella stessa transazione il backend accredita i punti una sola volta.

## Regole MVP

- Un solo check-in approvato per utente e giornata del centro.
- Una sola registrazione approvata dello stato d'animo per check-in. Una nuova registrazione richiede una futura estensione esplicita.
- Una stessa attività può essere approvata una sola volta per utente e giornata.
- Un'approvazione non può essere eseguita dall'utente interessato.
- I punti dello stato d'animo possono essere zero o positivi; non sono modificati retroattivamente.
- Il progresso è la somma dei movimenti punti approvati, non un valore scritto dal client.
- Il traguardo è raggiunto quando `puntiTotali >= puntiObiettivo`.
- Il percorso mostra cinque stadi, ognuno pari a un quinto del punteggio massimo personale.
- Disattivare un account o uno stato d'animo non cancella lo storico.

## Fuori dall'MVP

- GPS/geofencing, notifiche push, sondaggi, chat, gamification competitiva;
- modalità offline con sincronizzazione;
- integrazione con sistemi sanitari;
- multi-centro e multi-tenant;
- analisi cliniche o diagnosi basate sugli stati d'animo.

Queste funzioni richiedono task e valutazioni separate.
