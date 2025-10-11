# JavaScript Files

## 📄 File Overview

### `index.js`
Script per la pagina principale che gestisce il preloader:
- Mostra/nasconde il preloader video
- Gestisce la visualizzazione basata su localStorage (24 ore)
- Timer fisso di 4800ms per il mobile

### `mobile-fix.js`
Script per ottimizzare la visualizzazione dell'iframe su dispositivi mobili:
- Regola la posizione dell'iframe (`top: -30px`)
- Aumenta l'altezza per nascondere header Wix (`height: 108%`)
- Si attiva solo su schermi ≤ 900px di larghezza

### `iframe-url-sync.js` 🆕
**Soluzione per Issue #5** - Sincronizzazione URL iframe con browser:

#### Funzionalità:
- ✅ Sincronizza navigazione iframe con URL browser
- ✅ Abilita bookmarking di pagine specifiche
- ✅ Supporta condivisione URL
- ✅ Gestisce pulsanti back/forward del browser
- ✅ Supporta deep linking

#### Come funziona:
1. Monitora cambiamenti nell'URL dell'iframe (polling 500ms)
2. Quando l'URL dell'iframe cambia, aggiorna l'URL del browser
3. Quando l'utente usa back/forward, aggiorna l'iframe di conseguenza

#### Mappatura path:
```javascript
Wix path → Local path
/slowbike/percorsi → /pagine/percorsi.html
/slowbike/montecucco → /pagine/montecucco.html
// ... ecc
```

#### Utilizzo:
Aggiungere alla fine del `<body>` di ogni pagina HTML:
```html
<script src="/js/iframe-url-sync.js"></script>
```

#### Documentazione completa:
- Panoramica tecnica: `/IFRAME_SOLUTION.md`
- Guida utente: `/SOLUZIONE_ISSUE_5.md`
- Diagrammi di flusso: `/COME_FUNZIONA.md`

## 🔧 Manutenzione

### Aggiungere una nuova pagina:
1. Crea il file HTML con iframe
2. Aggiungi `<script src="/js/iframe-url-sync.js"></script>`
3. Aggiungi mappatura path in `iframe-url-sync.js`:
   ```javascript
   const pathMapping = {
     // ... esistenti ...
     '/slowbike/nuova-pagina': '/pagine/nuova-pagina.html',
   };
   ```

## 🐛 Debug

Per debug in console browser:
```javascript
// Verifica URL corrente
console.log(window.location.href);

// Verifica URL iframe
console.log(document.querySelector('iframe').src);

// Monitora eventi popstate
window.addEventListener('popstate', (e) => {
  console.log('Navigation:', e.state);
});
```
