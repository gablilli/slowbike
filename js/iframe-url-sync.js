/**
 * iframe-url-sync.js
 * Synchronizes iframe navigation with browser URL to enable:
 * - URL updates as users navigate
 * - Bookmarking and sharing
 * - Browser back/forward navigation
 * - Deep linking support
 */

(function() {
  'use strict';

  console.log('[iframe-url-sync] Script loaded and executing');

  const iframe = document.querySelector('iframe');
  console.log('[iframe-url-sync] Iframe element:', iframe);
  
  if (!iframe) {
    console.error('[iframe-url-sync] No iframe found! Exiting.');
    return;
  }

  const WIXSTUDIO_BASE = 'https://gabrielelilli1105.wixstudio.io/slowbike';
  const WIXSTUDIO_COM = 'https://gabrielelilli1105.wixstudio.com/slowbike';
  const SITE_BASE = window.location.origin;
  
  // Map Wix paths to local paths
  const pathMapping = {
    '/slowbike': '/',
    '/slowbike/': '/',
    '/slowbike/percorsi': '/pagine/percorsi.html',
    '/slowbike/montecucco': '/pagine/montecucco.html',
    '/slowbike/tourcastelli': '/pagine/tourcastelli.html',
    '/slowbike/bevelle': '/pagine/bevelle.html',
    '/slowbike/laghetti-scagliae': '/pagine/laghetti-scagliae.html',
    '/slowbike/valdichiascio': '/pagine/valdichiascio.html',
    '/slowbike/contattaci': '/pagine/contattaci.html',
    '/slowbike/blog': '/pagine/blog.html'
  };
  
  // Map paths to page titles
  const titleMapping = {
    '/': 'Home | SlowBike Gubbio',
    '/pagine/percorsi.html': 'Percorsi | SlowBike Gubbio',
    '/pagine/montecucco.html': 'Percorso del Monte Cucco | SlowBike Gubbio',
    '/pagine/tourcastelli.html': 'Tour dei Castelli | SlowBike Gubbio',
    '/pagine/bevelle.html': 'Bevelle | SlowBike Gubbio',
    '/pagine/laghetti-scagliae.html': 'Laghetti di Scagliae | SlowBike Gubbio',
    '/pagine/valdichiascio.html': 'Val di Chiascio | SlowBike Gubbio',
    '/pagine/contattaci.html': 'Contattaci | SlowBike Gubbio',
    '/pagine/blog.html': 'Blog | SlowBike Gubbio'
  };

  // Reverse mapping for local to Wix
  const reverseMapping = {};
  Object.keys(pathMapping).forEach(key => {
    const localPath = pathMapping[key];
    const wixPath = key.replace('/slowbike', '');
    if (localPath !== '/') {
      const cleanLocal = localPath.replace('/pagine/', '').replace('.html', '');
      reverseMapping['/' + cleanLocal] = wixPath || '/';
      reverseMapping[localPath] = wixPath || '/';
    }
  });

  let isUpdatingFromHistory = false;
  let lastIframeUrl = '';

  /**
   * Get the Wix path from current page
   */
  function getWixPathFromCurrentPage() {
    const currentPath = window.location.pathname;
    
    // If we're on index.html or root
    if (currentPath === '/' || currentPath === '/index.html') {
      return '/';
    }
    
    // Check reverse mapping
    if (reverseMapping[currentPath]) {
      return reverseMapping[currentPath];
    }
    
    // Extract page name from path
    const pageName = currentPath.replace('/pagine/', '').replace('.html', '');
    return '/' + pageName;
  }

  /**
   * Update iframe URL based on browser URL
   */
  function updateIframeFromUrl() {
    const wixPath = getWixPathFromCurrentPage();
    const targetUrl = WIXSTUDIO_BASE + wixPath;
    
    if (iframe.src !== targetUrl && !lastIframeUrl.includes(wixPath)) {
      isUpdatingFromHistory = true;
      iframe.src = targetUrl;
      lastIframeUrl = targetUrl;
      setTimeout(() => { isUpdatingFromHistory = false; }, 1000);
    }
  }

  /**
   * Monitor iframe navigation and sync to browser URL
   */
  function monitorIframeNavigation() {
    console.log('[iframe-url-sync] Starting to monitor iframe navigation');
    
    // Listen for postMessage events from the iframe
    window.addEventListener('message', function(event) {
      // Check if message is from Wix iframe
      if (event.origin.includes('wixstudio.io') || event.origin.includes('wixstudio.com')) {
        console.log('[iframe-url-sync] Received postMessage from iframe:', event.data);
        
        // Try to extract URL information from the message
        if (event.data && typeof event.data === 'object') {
          // Look for URL-related data in various possible formats
          const url = event.data.url || event.data.href || event.data.location || event.data.path;
          if (url) {
            console.log('[iframe-url-sync] URL from postMessage:', url);
            processIframeUrl(url);
          }
        }
      }
    });
    
    try {
      // Try to access iframe content (will fail due to CORS, but we can check src)
      const currentIframeSrc = iframe.contentWindow.location.href;
    } catch (e) {
      // Expected - can't access cross-origin iframe
      // We'll use a different approach with postMessage or polling
    }

    // Poll iframe src attribute changes (works when iframe.src actually changes)
    setInterval(() => {
      if (isUpdatingFromHistory) return;
      
      const currentSrc = iframe.src;
      if (currentSrc && currentSrc !== lastIframeUrl) {
        console.log('[iframe-url-sync] Detected iframe.src change:', currentSrc);
        lastIframeUrl = currentSrc;
        processIframeUrl(currentSrc);
      }
    }, 500);
  }
  
  /**
   * Process iframe URL and update browser URL
   */
  function processIframeUrl(url) {
    // Extract path from Wix URL
    let wixPath = '';
    if (url.includes('wixstudio.io/slowbike')) {
      wixPath = url.replace(WIXSTUDIO_BASE, '').split('?')[0].split('#')[0];
    } else if (url.includes('wixstudio.com/slowbike')) {
      wixPath = url.replace(WIXSTUDIO_COM, '').split('?')[0].split('#')[0];
    } else if (url.startsWith('/')) {
      // Relative path
      wixPath = url.split('?')[0].split('#')[0];
    }
    
    console.log('[iframe-url-sync] Extracted Wix path:', wixPath);
    
    // Find matching local path
    let newPath = null;
    const fullWixPath = '/slowbike' + wixPath;
    
    if (pathMapping[fullWixPath]) {
      newPath = pathMapping[fullWixPath];
    } else if (wixPath === '' || wixPath === '/') {
      newPath = '/';
    }
    
    console.log('[iframe-url-sync] Mapped to local path:', newPath);
    
    // Update browser URL and title if we found a mapping
    if (newPath && window.location.pathname !== newPath) {
      const newUrl = SITE_BASE + newPath;
      console.log('[iframe-url-sync] Updating browser URL to:', newUrl);
      
      // Update page title
      const newTitle = titleMapping[newPath] || 'SlowBike Gubbio';
      document.title = newTitle;
      console.log('[iframe-url-sync] Updated page title to:', newTitle);
      
      // Update browser URL
      window.history.pushState({ path: newPath }, newTitle, newUrl);
    } else if (!newPath && wixPath) {
      console.warn('[iframe-url-sync] No mapping found for Wix path:', wixPath);
    }
  }

  /**
   * Handle browser back/forward buttons
   */
  window.addEventListener('popstate', function(event) {
    if (event.state && event.state.path) {
      updateIframeFromUrl();
    }
  });

  /**
   * Initialize on page load
   */
  function init() {
    console.log('[iframe-url-sync] Initializing URL sync');
    console.log('[iframe-url-sync] Iframe element found:', !!iframe);
    
    // Set initial state
    const initialPath = window.location.pathname;
    window.history.replaceState({ path: initialPath }, '', window.location.href);
    
    // Wait for iframe to be ready
    iframe.addEventListener('load', function() {
      console.log('[iframe-url-sync] Iframe loaded, src:', iframe.src);
      lastIframeUrl = iframe.src;
      setTimeout(() => {
        monitorIframeNavigation();
      }, 1000);
    });
    
    // Start monitoring if already loaded
    if (iframe.contentWindow) {
      console.log('[iframe-url-sync] Iframe already has contentWindow, starting monitoring');
      monitorIframeNavigation();
    }
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
