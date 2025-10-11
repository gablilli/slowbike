# Soluzione per Issue #5: Problemi con iframe

## Il Problema
Quando si incorpora un sito web in un iframe, gli utenti non ottengono l'esperienza completa del sito:
- L'URL del browser non si aggiorna durante la navigazione
- Non è possibile aggiungere pagine ai preferiti o condividerle
- I pulsanti avanti/indietro del browser non funzionano correttamente
- I link diretti (deep linking) non funzionano
- Problemi SEO

## La Soluzione Implementata

Invece di rifare completamente il sito, è stata implementata una **soluzione JavaScript che sincronizza la navigazione dell'iframe con l'URL del browser**.

### Come Funziona

1. **Sincronizzazione URL**: Lo script `js/iframe-url-sync.js` monitora la navigazione nell'iframe e aggiorna l'URL del browser di conseguenza.

2. **Navigazione Browser**: Quando l'utente usa i pulsanti avanti/indietro del browser, lo script carica la pagina corrispondente nell'iframe.

3. **Deep Linking**: Gli utenti possono ora condividere URL specifici (es. `/pagine/percorsi.html`) e l'iframe caricherà automaticamente la pagina corretta.

4. **Mappatura Path**: Lo script mappa i percorsi Wix ai percorsi locali:
   - `/slowbike/percorsi` → `/pagine/percorsi.html`
   - `/slowbike/montecucco` → `/pagine/montecucco.html`
   - E così via...

### File Modificati

- **Nuovo file**: `js/iframe-url-sync.js` - Script principale per la sincronizzazione
- **Aggiornati**: Tutti i file HTML con iframe ora includono questo script
  - `index.html`
  - `pagine/percorsi.html`
  - `pagine/montecucco.html`
  - `pagine/tourcastelli.html`
  - `pagine/bevelle.html`
  - `pagine/laghetti-scagliae.html`
  - `pagine/valdichiascio.html`
  - `pagine/contattaci.html`
  - `pagine/blog.html`
  - `pagine/404.html`

### Vantaggi di Questa Soluzione

✅ **Modifiche minime**: Non richiede il refactoring completo del sito  
✅ **URL condivisibili**: Gli utenti possono ora condividere e salvare link specifici  
✅ **Navigazione browser**: I pulsanti avanti/indietro funzionano correttamente  
✅ **Deep linking**: I link diretti alle pagine specifiche funzionano  
✅ **Cronologia**: La cronologia del browser registra correttamente le pagine visitate  
✅ **Bookmarking**: Gli utenti possono aggiungere pagine specifiche ai preferiti  

### Limitazioni

⚠️ **CORS**: A causa delle restrizioni di sicurezza del browser (CORS), lo script non può accedere direttamente al contenuto dell'iframe cross-origin. Per questo motivo, utilizza il polling dell'attributo `src` dell'iframe per rilevare i cambiamenti.

⚠️ **SEO**: Anche se questa soluzione migliora l'esperienza utente, per una soluzione SEO completa sarebbe comunque necessario rifare il sito senza iframe.

⚠️ **Polling**: Lo script usa un intervallo di 500ms per monitorare i cambiamenti nell'iframe. Questo è un compromesso tra reattività e performance.

### Possibili Miglioramenti Futuri

Se in futuro si decide di migliorare ulteriormente la soluzione senza rifare il sito:

1. **postMessage API**: Se si ha controllo sul sito Wix, si potrebbe usare `window.postMessage()` per una comunicazione più efficiente tra iframe e parent.

2. **Service Worker**: Potrebbe essere utilizzato per intercettare le richieste e gestire meglio la sincronizzazione.

3. **Meta tag SEO**: Aggiungere meta tag dinamici per ogni pagina per migliorare leggermente il SEO.

## Test Consigliati

Per verificare che la soluzione funzioni:

1. Apri il sito e naviga tra le diverse pagine
2. Verifica che l'URL nel browser cambi durante la navigazione
3. Usa i pulsanti avanti/indietro del browser
4. Copia un URL specifico e aprilo in una nuova scheda
5. Aggiungi una pagina ai preferiti e poi riaprila

## Conclusione

Questa soluzione fornisce un miglioramento significativo dell'esperienza utente senza richiedere un refactoring completo del sito. Risolve i principali problemi di usabilità mantenendo l'architettura esistente basata su iframe.
