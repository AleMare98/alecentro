# Architettura semplice

## Struttura

```text
Portale React ─┐
               ├── HTTPS ── ASP.NET Core API ── MySQL
App React Native┘
```

Il backend è un monolite modulare con quattro livelli pratici:

```text
API/Controller → Application/Service → Domain → Infrastructure/Repository
```

Non è necessario creare un progetto separato per ogni livello all'inizio. Una singola solution con cartelle chiare è sufficiente; separare assembly solo quando porta un beneficio dimostrabile.

## Moduli funzionali

- Identity: accesso, refresh token, ruoli, cambio password.
- Users: profilo, attivazione, traguardo.
- Activities: catalogo, assegnazioni, richieste di completamento e approvazioni punti.
- Moods: catalogo, assegnazioni, registrazioni e approvazioni.
- Attendance: check-in, approvazioni e storico consultabile dall'amministratore.
- Progress: punti, massimo personale e cinque stadi di avanzamento.
- Audit: operazioni amministrative sensibili.

I moduli condividono lo stesso deployment e lo stesso database, ma non devono scrivere direttamente nelle tabelle di un altro modulo fuori dai service applicativi.

## Struttura repository proposta

```text
apps/
  admin-web/
  mobile/
  api/
tests/
  api-unit/
  api-integration/
docs/
tasks/
scripts/
```

## Scelte di semplicità

- REST JSON; nessun GraphQL.
- Elaborazione sincrona; nessuna coda nell'MVP.
- Transazioni MySQL per approvazione e assegnazione punti.
- Immagini paesaggistiche distribuite come asset ottimizzati, con fonte/licenza documentata.
- Un ambiente locale via Docker Compose è consigliato, ma non obbligatorio per capire il codice.

## Configurazione

Le variabili sensibili provengono dall'ambiente o da un secret store:

- `ConnectionStrings__Default`
- `Jwt__SigningKey`
- `Jwt__Issuer`
- `Jwt__Audience`

Nel repository può esistere soltanto un `.env.example` con valori fittizi.
