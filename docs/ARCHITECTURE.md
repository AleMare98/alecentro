# Architettura MVP

Il backend espone una REST API unica. Il portale web e l'app mobile sono due client separati che usano la stessa API e lo stesso database MySQL.

```text
Portale Admin ─┐
               ├── API Express ─── MySQL
App React Native┘
```

Il backend separa autenticazione, autorizzazione, gestione dei dati e approvazione delle richieste. L'approvazione dello stato d'animo usa una transazione per aggiornare richiesta e punti in modo atomico.
