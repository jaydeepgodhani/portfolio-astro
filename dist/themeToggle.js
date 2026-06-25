document.addEventListener("astro:after-swap", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
});

console.log('here ???');

function initTheme() {
  // Re-apply theme on every navigation (ViewTransitions swaps <html>)
  const theme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Re-attach toggle listener
  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    const next = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  });
}

console.log("here ???");

document.addEventListener("astro:page-load", initTheme);
document.addEventListener("astro:after-swap", () => {
  // after-swap fires before paint on navigation — re-apply immediately
  const theme = localStorage.getItem("theme");
  if (theme === "dark") document.documentElement.classList.add("dark");
});
