// SlowBike Gubbio - Index Page Script with Preloader
(function() {
  const isMobile = screen.width <= 900;
  const preloader = document.getElementById("preloader");
  const mainContent = document.getElementById("main-content");
  const hasSeen = localStorage.getItem("slowbike_preloader_seen");
  const lastSeen = localStorage.getItem("slowbike_preloader_last_seen");

  const now = new Date().getTime();
  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

  function hidePreloader() {
    preloader.classList.add("slide-up");
    document.body.classList.add("loaded");
    localStorage.setItem("slowbike_preloader_seen", "true");
    localStorage.setItem("slowbike_preloader_last_seen", now);
  }

  if (hasSeen === "true" && lastSeen && (now - lastSeen < TWENTY_FOUR_HOURS)) {
    preloader.style.display = "none";
    document.body.classList.add("loaded");
  } else {
    setTimeout(hidePreloader, 4800);
  }
})();
