document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      const icon = toggle.querySelector("i");
      if (icon) {
        icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
      }
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        const icon = toggle.querySelector("i");
        if (icon) {
          icon.className = "fa-solid fa-bars";
        }
      });
    });
  }

  // Navbar scroll
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);

      let current = "";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 140) {
          current = s.id;
        }
      });

      navItems.forEach((item) => {
        item.classList.toggle(
          "active",
          item.getAttribute("href") === "#" + current,
        );
      });
    },
    { passive: true },
  );

  // Project filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const cats = card.dataset.category || "";
        const show = filter === "all" || cats.includes(filter);
        card.style.display = show ? "" : "none";
      });
    });
  });

  // Copy to clipboard
  const toast = document.getElementById("toast");

  window.copyToClipboard = (text, label) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (toast) {
          toast.querySelector(".toast-text").textContent = label + " copied!";
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 2500);
        }
      })
      .catch(() => {});
  };

  const projectsGrid = document.getElementById("projects-grid");
  const showMoreBtn = document.getElementById("show-more-btn");
  const INITIAL_PROJECTS = 6;

  let showAllProjects = false;
  let activeFilter = "all";

  const projectCards = Array.from(
    projectsGrid.querySelectorAll(".project-card"),
  );

  function updateProjects() {
    const filteredProjects = projectCards.filter((card) => {
      const categories = card.dataset.category.split(" ");
      return activeFilter === "all" || categories.includes(activeFilter);
    });

    projectCards.forEach((card) => {
      card.classList.add("hidden-project");
    });

    const visibleProjects = showAllProjects
      ? filteredProjects
      : filteredProjects.slice(0, INITIAL_PROJECTS);

    visibleProjects.forEach((card) => {
      card.classList.remove("hidden-project");
    });

    showMoreBtn.style.display =
      filteredProjects.length > INITIAL_PROJECTS ? "inline-flex" : "none";

    showMoreBtn.innerHTML = showAllProjects
      ? 'Show Less <i class="fa-solid fa-chevron-down"></i>'
      : 'Show More <i class="fa-solid fa-chevron-down"></i>';

    showMoreBtn.classList.toggle("expanded", showAllProjects);
  }

  showMoreBtn.addEventListener("click", () => {
    showAllProjects = !showAllProjects;
    updateProjects();
  });

  // Integrate with your existing category filter buttons.
  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      showAllProjects = false;
      updateProjects();
    });
  });

  updateProjects();
});
