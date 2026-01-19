// ====== Year ======
document.getElementById("year").textContent = new Date().getFullYear();

// ====== Mobile Menu ======
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-item").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ====== Theme Toggle ======
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  themeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
    themeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  } else {
    localStorage.setItem("theme", "dark");
    themeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }
});

// ====== Typing Effect ======
const typingText = document.getElementById("typingText");
const roles = [
  "Software Developer",
  "DSA with C++",
  "Frontend Developer",
  "Python Developer",
  "AI Projects Learner"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!deleting) {
    typingText.textContent = currentRole.substring(0, charIndex++);
    if (charIndex > currentRole.length) {
      deleting = true;
      setTimeout(typeEffect, 900);
      return;
    }
  } else {
    typingText.textContent = currentRole.substring(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 250);
      return;
    }
  }

  setTimeout(typeEffect, deleting ? 40 : 75);
}
typeEffect();

// ====== Reveal Animation ======
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });

reveals.forEach(r => observer.observe(r));

// ====== Project Filter ======
const filterBtns = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projects.forEach(project => {
      const category = project.getAttribute("data-category");

      if (filter === "all" || category.includes(filter)) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  });
});

// ====== Active Navbar ======
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-item");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 130;
    if (scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navItems.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) a.classList.add("active");
  });
});

// ====== Scroll To Top ======
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 500 ? "grid" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ====== Contact Form Validation ======
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  let valid = true;

  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("subjectError").textContent = "";
  document.getElementById("messageError").textContent = "";
  successMsg.textContent = "";

  if (name.length < 3) {
    document.getElementById("nameError").textContent = "Enter valid name (min 3 characters)";
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("emailError").textContent = "Enter valid email";
    valid = false;
  }

  if (subject.length < 5) {
    document.getElementById("subjectError").textContent = "Enter subject (min 5 characters)";
    valid = false;
  }

  if (message.length < 10) {
    document.getElementById("messageError").textContent = "Message must be at least 10 characters";
    valid = false;
  }

  if (valid) {
    successMsg.textContent = "✅ Message submitted successfully! (Frontend demo)";
    form.reset();
  }
});
