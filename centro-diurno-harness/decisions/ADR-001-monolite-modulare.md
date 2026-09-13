# ADR-001 — Monolite modulare con database unico

- Stato: accettata
- Data: 2026-07-31

## Contesto

Il progetto è sviluppato da un piccolo gruppo e richiede codice semplice, un portale web, un'app mobile e un database MySQL unico.

## Decisione

Usare un'unica API ASP.NET Core organizzata per moduli funzionali e un'unica istanza MySQL. React e React Native consumano la stessa API REST.

## Conseguenze

- sviluppo, debug e deployment più semplici;
- transazioni immediate per approvazioni e punti;
- separazione logica mantenuta tramite service e moduli;
- eventuale divisione futura possibile, ma non pianificata nell'MVP.

Una proposta di microservizio deve dimostrare un problema concreto che il monolite non riesce a risolvere e richiede una nuova ADR approvata.

