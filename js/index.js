const isMobile = screen.width <= 900;
const iframe = document.querySelector("#iframe-container iframe");
const preloader = document.getElementById("preloader");

if (!preloader) {
  console.error('Preloader element not found');
}

// Check for force parameter in URL (for testing: ?forcePreloader=true)
const urlParams = new URLSearchParams(window.location.search);
const forcePreloader = urlParams.get('forcePreloader') === 'true';

const hasSeen = localStorage.getItem("slowbike_preloader_seen");
const lastSeen = localStorage.getItem("slowbike_preloader_last_seen");

const now = new Date().getTime();
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

function hidePreloader() {
  if (preloader) {
    preloader.classList.add("slide-up");
    if (!forcePreloader) {
      localStorage.setItem("slowbike_preloader_seen", "true");
      localStorage.setItem("slowbike_preloader_last_seen", now);
    }
  }
}

// Check if we should skip the preloader
if (!forcePreloader && hasSeen === "true" && lastSeen && (now - lastSeen < TWENTY_FOUR_HOURS)) {
  // User has seen it recently, hide immediately without animation
  if (preloader) {
    preloader.style.display = "none";
  }
} else {
  // Show the slide-up animation
  setTimeout(hidePreloader, 4800);
}
