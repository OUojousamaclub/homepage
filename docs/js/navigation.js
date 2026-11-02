(() => {
  const menu = document.querySelector(".site-menu");
  if (!menu) return;

  const toggle = menu.querySelector("summary");
  if (!toggle) return;

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      event.preventDefault();
      menu.open = false;
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (menu.open && !menu.contains(event.target)) {
      menu.open = false;
    }
  });

  document.addEventListener("focusin", (event) => {
    if (menu.open && !menu.contains(event.target)) {
      menu.open = false;
    }
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest(".site-navigation a")) {
      menu.open = false;
      toggle.focus();
    }
  });
})();
