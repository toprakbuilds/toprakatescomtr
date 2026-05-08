// contact popup
const contactBtn = document.getElementById('contact-btn');
const contactMenu = document.querySelector('.contact-menu');

contactBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  contactMenu.classList.toggle('open');
  contactBtn.classList.toggle('active', contactMenu.classList.contains('open'));
});
document.querySelectorAll('.contact-option').forEach(opt => {
  opt.addEventListener('click', () => window.open(opt.dataset.href, "_self"));
});
document.addEventListener('click', () => {
  contactMenu.classList.remove('open');
  contactBtn.classList.remove('active');
});

// theme + background
let THEME = "dark";

function setBackgroundVideo(){
  const src = document.getElementById("bg-source");
  src.src = (THEME === "light")
    ? "assets/backgrounds/light-theme.mp4"
    : "assets/backgrounds/dark-theme.mp4";

  const vid = document.getElementById("background-video");
  vid.load();
  vid.play().catch(()=>{});
}

function syncThemeUI(){
  const isLight = THEME === "light";
  document.getElementById("theme-icon").className = isLight ? "ri-sun-line" : "ri-moon-line";
  document.getElementById("theme-text").textContent = isLight ? "light" : "dark";
}

function applyTheme(theme){
  THEME = theme;
  document.body.classList.toggle("light-mode", THEME === "light");
  localStorage.setItem("theme", THEME);

  setBackgroundVideo();
  syncThemeUI();
}

function initThemeFromStorage(){
  const saved = localStorage.getItem("theme");
  applyTheme(saved || "dark");
}

// tag filtering
function initTagFilter(){
  const tagButtons = document.querySelectorAll(".tag-btn");
  const cards = document.querySelectorAll(".blog-card");

  function setActive(btn){
    tagButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  function filter(tag){
    cards.forEach(card => {
      const tags = (card.dataset.tags || "")
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);

      const show = tag === "all" || tags.includes(tag);
      card.style.display = show ? "" : "none";
      card.style.opacity = show ? "1" : "0";
    });
  }

  tagButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tag = btn.dataset.tag;
      setActive(btn);
      filter(tag);
    });
  });

  // default all
  filter("all");
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeFromStorage();

  // header nav
  document.getElementById("proje")?.addEventListener("click", ()=>location.href="index.html#hakkimda");
  document.getElementById("hakkimda")?.addEventListener("click", ()=>location.href="index.html#hakkimda");
  document.getElementById("blog")?.addEventListener("click", ()=>location.href="blog.html");

  document.getElementById("theme-toggle")?.addEventListener("click", ()=>{
    applyTheme(THEME === "dark" ? "light" : "dark");
  });

  initTagFilter();
});
