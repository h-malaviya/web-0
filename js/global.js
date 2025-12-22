document.addEventListener("DOMContentLoaded", () => {

  /* ========== MOBILE NAV ========== */
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileMenuPane = document.getElementById("mobile-menu-pane");
  const mainNav = document.getElementById("main-nav");

  if (mainNav && mobileMenuPane) {
    mobileMenuPane.innerHTML = mainNav.innerHTML;
  }

  if (mobileToggle && mobileMenuPane) {
    mobileToggle.addEventListener("click", e => {
      e.stopPropagation();
      mobileMenuPane.classList.toggle("is-open");
    });
  }

  /* ========== THEME LOGIC ========== */
  const switchBtn = document.querySelector(".switch");
  const THEME_KEY = "theme";

  // default = dark
  const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
  const isLight = savedTheme === "light";

  // apply theme
  document.documentElement.classList.toggle("light", isLight);

  // sync switch animation
  if (switchBtn) {
    switchBtn.classList.toggle("is-active", !isLight);

    switchBtn.addEventListener("click", () => {
      const nowDark = switchBtn.classList.toggle("is-active");
      const nowLight = !nowDark;

      document.documentElement.classList.toggle("light", nowLight);
      localStorage.setItem(THEME_KEY, nowLight ? "light" : "dark");
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "home.html")
    ) {
      link.classList.add("active");
    }
  });
});
