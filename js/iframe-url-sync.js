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

  const iframe = document.querySelector('iframe');
  if (!iframe) return;

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
    try {
      // Try to access iframe content (will fail due to CORS, but we can check src)
      const currentIframeSrc = iframe.contentWindow.location.href;
    } catch (e) {
      // Expected - can't access cross-origin iframe
      // We'll use a different approach with postMessage or polling
    }

    // Poll iframe src attribute changes
    setInterval(() => {
      if (isUpdatingFromHistory) return;
      
      const currentSrc = iframe.src;
      if (currentSrc && currentSrc !== lastIframeUrl) {
        lastIframeUrl = currentSrc;
        
        // Extract path from Wix URL
        let wixPath = '';
        if (currentSrc.includes('wixstudio.io/slowbike')) {
          wixPath = currentSrc.replace(WIXSTUDIO_BASE, '');
        } else if (currentSrc.includes('wixstudio.com/slowbike')) {
          wixPath = currentSrc.replace(WIXSTUDIO_COM, '');
        }
        
        // Find matching local path
        let newPath = null;
        const fullWixPath = '/slowbike' + wixPath;
        
        if (pathMapping[fullWixPath]) {
          newPath = pathMapping[fullWixPath];
        } else if (wixPath === '' || wixPath === '/') {
          newPath = '/';
        }
        
        // Update browser URL if we found a mapping
        if (newPath && window.location.pathname !== newPath) {
          const newUrl = SITE_BASE + newPath;
          window.history.pushState({ path: newPath }, '', newUrl);
        }
      }
    }, 500);
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
    // Set initial state
    const initialPath = window.location.pathname;
    window.history.replaceState({ path: initialPath }, '', window.location.href);
    
    // Wait for iframe to be ready
    iframe.addEventListener('load', function() {
      lastIframeUrl = iframe.src;
      setTimeout(() => {
        monitorIframeNavigation();
      }, 1000);
    });
    
    // Start monitoring if already loaded
    if (iframe.contentWindow) {
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
