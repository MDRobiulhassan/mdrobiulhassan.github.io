document.addEventListener('DOMContentLoaded', () => {

    // Mobile menu
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            const isOpen = links.classList.toggle('open');
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                links.classList.remove('open');
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.className = 'fa-solid fa-bars';
                }
            });
        });
    }

    // Navbar scroll
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 140) {
                current = s.id;
            }
        });

        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === '#' + current);
        });
    }, { passive: true });

    // Project filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            cards.forEach(card => {
                const cats = card.dataset.category || '';
                const show = filter === 'all' || cats.includes(filter);
                card.style.display = show ? '' : 'none';
            });
        });
    });

    // Copy to clipboard
    const toast = document.getElementById('toast');

    window.copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text).then(() => {
            if (toast) {
                toast.querySelector('.toast-text').textContent = label + ' copied!';
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 2500);
            }
        }).catch(() => { });
    };
});
