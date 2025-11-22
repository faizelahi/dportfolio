// Extracted scripts from test.html - moved to assets/js/main.js

// ===== Theme Toggle
(function () {
  const key = "theme";
  const root = document.documentElement;
  const saved = localStorage.getItem(key);
  if (saved) root.setAttribute("data-theme", saved);
  document.getElementById("themeToggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem(key, next);
  });
})();

// ===== Year
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Terminal Widget auto-scroll lines
(function () {
  const term = document.getElementById("termWidget");
  if (!term) return;
  const lines = [
    '<div><span class="prompt">soc@blue$</span> search --query "auth failures" --window 1h</div>',
    '<div class="out">[i] 8 correlated events → 1 incident</div>',
    '<div class="out">[> ] escalated to P2 · responder on-call</div>',
    '<div><span class="prompt">red@ops$</span> recon --subs --tech</div>',
    '<div class="out">[i] 14 subdomains · 2 interesting</div>',
    '<div class="out">[! ] exposed dev panel · report filed</div>',
  ];
  let i = 0;
  const maxLines = 80; // keep terminal content bounded to avoid growing the page
  setInterval(() => {
    const el = document.createElement("div");
    el.innerHTML = lines[i % lines.length];
    term.appendChild(el);
    // remove old lines if exceeding maxLines
    while (term.children.length > maxLines) {
      term.removeChild(term.firstElementChild);
    }
    // keep scroll at bottom
    term.scrollTop = term.scrollHeight;
    i++;
  }, 1800);
})();

// ===== Contact Form: Enhanced Client-side Validation & Async =====
function sendMessage(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const note = document.getElementById("formNote");
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  // Simple validation
  if (!name || !email || !subject || !message) {
    note.textContent = "Please fill in all fields.";
    note.style.color = "#e11d48";
    return false;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    note.textContent = "Please enter a valid email address.";
    note.style.color = "#e11d48";
    return false;
  }
  btn.disabled = true;
  btn.textContent = "Sending…";
  note.textContent = "";
  // Simulate async send
  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = "Send Message";
    note.textContent = "Thanks! I will get back to you soon.";
    note.style.color = "var(--accent)";
    e.target.reset();
  }, 1200);
  return false;
}

/// ===== Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===== Mobile nav toggle
(function mobileNavToggle() {
  const btn = document.getElementById("menuToggle");
  const nav = document.querySelector(".navlinks");

  if (!btn || !nav) return;

  btn.addEventListener("click", () => nav.classList.toggle("show"));

  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("show"))
  );
})();

// ===== Smooth scroll buttons
(function () {
  const down = document.getElementById("scrollDown");

  const topBtn = document.createElement("button");
  topBtn.className = "back-to-top";
  topBtn.id = "backToTop";
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.innerHTML = "↑";

  document.body.appendChild(topBtn);
})();

  // scroll down to next major section (services)
  if (down) {
    down.addEventListener("click", () => {
      const el = document.getElementById("services");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // back to top behavior
  const back = document.getElementById("backToTop");
  back.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  // show/hide when user scrolls down
  let lastScroll = 0;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      if (y > 320) back.classList.add("show");
      else back.classList.remove("show");
      lastScroll = y;
    },
    { passive: true }
  );


// ===== Dynamic Certifications Section =====
const certifications = [
  {
    name: "OSCP",
    issuer: "Offensive Security",
    year: 2023,
    badge: "https://img.icons8.com/color/48/000000/certificate.png",
    desc: "Offensive Security Certified Professional",
  },
  {
    name: "GCIA",
    issuer: "GIAC",
    year: 2022,
    badge: "https://img.icons8.com/color/48/000000/medal2.png",
    desc: "GIAC Certified Intrusion",
  },
  {
    name: "Azure Security Engineer",
    issuer: "Microsoft",
    year: 2024,
    badge: "https://img.icons8.com/color/48/000000/microsoft.png",
    desc: "Microsoft Certified Security Engineer",
  },
  {
    name: "CISSP",
    issuer: "(ISC)²",
    year: 2025,
    badge: "https://img.icons8.com/color/48/000000/security-checked.png",
    desc: "Certified Information Systems Security Professional",
  },
];

function renderCertifications() {
  const grid = document.getElementById("certGrid");
  if (!grid) return;
  grid.innerHTML = certifications
    .map(
      (cert) => `
    <div class="col-4 card cert-card">
      <img src="${cert.badge}" alt="${cert.name} badge" class="cert-badge" />
      <h3>${cert.name}</h3>
      <p class="cert-desc">${cert.desc}</p>
      <div class="cert-meta">${cert.issuer} · ${cert.year}</div>
    </div>
  `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", renderCertifications);

// ===== Contact Form: Add Recipients Details =====
const RECIPIENTS = [
  {
    name: "Faiz Elahi",
    email: "faizelahi06@gmail.com",
    role: "Lead SOC Analyst",
  },
  {
    name: "Support Team",
    email: "faizelahi06@gmail.com",
    role: "General Inquiries",
  },
];

function renderRecipients() {
  const grid = document.querySelector(".contact-grid");
  if (!grid) return;
  const details = document.createElement("div");
  details.className = "card";
  details.innerHTML = `
    <p class="subtitle">Contact Recipients</p>
    <ul style="margin:0; padding-left:18px; color:var(--muted)">
      ${RECIPIENTS.map(
        (r) =>
          `<li><b>${r.name}</b> — <a href='mailto:${r.email}'>${r.email}</a> <span style='color:var(--accent-2);font-size:0.95em;'>(${r.role})</span></li>`
      ).join("")}
    </ul>
  `;
  grid.insertBefore(details, grid.firstChild);
}

document.addEventListener("DOMContentLoaded", renderRecipients);



// Navbar Javascrip 

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".navlinks");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});
