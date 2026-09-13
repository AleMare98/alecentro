# UI e accessibilità

## Identità visiva

- Sfondo base: `#FFFFFF`.
- Testo e colore principale: `#4C7F71`.
- Testo lungo: usare un verde più scuro derivato, se necessario per raggiungere almeno contrasto WCAG AA.
- Paesaggi umbri: hero, header o sfondo leggero con overlay bianco; mai dietro testo senza contrasto verificato.
- Non affidarsi solo al colore per stato, errore o avanzamento.

## Mobile

Il percorso principale deve essere lineare e con poche scelte:

1. Accedi.
2. Richiedi check-in.
3. Attendi/ottieni approvazione amministratore.
4. Scegli come ti senti con icona, testo e area tocco ampia.
5. Attendi/ottieni approvazione.
6. Completa un'attività assegnata e attendi l'approvazione.
7. Visualizza avanzamento e milestone.

La richiesta di password amministratore deve apparire in una schermata/modale distinta, oscurare i caratteri, non conservarli e cancellarli subito dopo l'invio.

## Portale amministratore

Navigazione minima:

- Dashboard
- Utenti
- Attività
- Stati d'animo
- Approvazioni
- Storico check-in
- Audit

Le azioni distruttive usano disattivazione e conferma esplicita. Tabelle e form devono avere label, messaggi di errore associati e navigazione da tastiera.

## Componente progresso

Mostrare:

- punti correnti e punti obiettivo;
- barra di progresso limitata visivamente al 100%, anche se i punti lo superano;
- cinque stadi calcolati come 20%, 40%, 60%, 80% e 100% del massimo personale;
- testo semplice per milestone raggiunta o successiva;
- stato vuoto comprensibile se il traguardo non è ancora configurato.

## Test UI minimi

- contrasto testo/sfondo;
- ridimensionamento testo al 200%;
- aree tocco di almeno 44×44 px;
- schermate mobile piccola, mobile standard e desktop per il portale;
- loading, errore, stato vuoto e rete assente.
