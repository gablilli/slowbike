// SlowBike Gubbio - Index Page Script with Preloader
(function() {
  const isMobile = screen.width <= 900;
  const iframe = document.querySelector("#iframe-container iframe");
  const preloader = document.getElementById("preloader");
  const hasSeen = localStorage.getItem("slowbike_preloader_seen");
  const lastSeen = localStorage.getItem("slowbike_preloader_last_seen");

  const now = new Date().getTime();
  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

  function hidePreloader() {
    preloader.classList.add("slide-up");
    localStorage.setItem("slowbike_preloader_seen", "true");
    localStorage.setItem("slowbike_preloader_last_seen", now);
  }

  // Check if user has seen preloader recently
  if (hasSeen === "true" && lastSeen && (now - lastSeen < TWENTY_FOUR_HOURS)) {
    preloader.style.display = "none";
  } else {
    // For mobile: use fixed timer
    if (isMobile) {
      setTimeout(hidePreloader, 4800);
    } 
    // For desktop: wait for iframe load, then add small delay
    else {
      iframe.addEventListener("load", function() {
        setTimeout(hidePreloader, 300);
      });
    }
  }
})();
