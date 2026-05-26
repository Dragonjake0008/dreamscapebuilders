const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    const isShown = navLinks.classList.toggle('show');
    if (isShown) {
        navbar.style.borderRadius = '20px 20px 0 0';
    } else {
        navbar.style.borderRadius = '20px';
    }
});

const navLinkItems = navLinks.querySelectorAll('a');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        navbar.style.borderRadius = '20px';
    });
});

// Services Pop Up
const readMoreButtons = document.querySelectorAll('.read-more');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

readMoreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.parentElement.getAttribute("data-modal");
        document.getElementById(modalId).style.display = "flex";
    });
});

closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // Traverse up to the modal container
        let modal = btn.closest('.modal');
        if (modal) {
            modal.style.display = "none";
        }
    });
});

window.addEventListener("click", (e) => {
    modals.forEach(modal => {
        if (e.target === modal) modal.style.display = "none";
    });
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll reveal animations
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -5% 0px'
});

revealElements.forEach((element) => {
    const delay = Number(element.dataset.delay || 0);
    element.style.setProperty('--reveal-delay', `${delay}ms`);
    revealObserver.observe(element);
});

// work slider track
const track = document.querySelector('.slider-track');
const slots = Array.from(track.querySelectorAll('.slider-slot'));
const leftBtn = document.querySelector('.arrow.left');
const rightBtn = document.querySelector('.arrow.right');

const imageSources = [
    'antranias-landscaper-401880_1920.jpg',
    'antranias-landscaper-409147_1920.jpg',
    'javallma-garden-2218786_1920.jpg',
    'antranias-landscaper-409147_1920.jpg',
    'javallma-garden-2218786_1920.jpg',
    'antranias-landscaper-401880_1920.jpg'
];

let index = 0;
const total = imageSources.length;

slots.forEach(slot => {
    const img = slot.querySelector('img');
    img.classList.add('slider-image');
});

function applyImages() {
    slots.forEach((slot, slotIndex) => {
        const img = slot.querySelector('img');
        const nextSrc = imageSources[(index + slotIndex) % total];
        const currentSrc = img.getAttribute('data-current');

        if (currentSrc === nextSrc) {
            return;
        }

        img.style.opacity = '0';
        img.setAttribute('data-current', nextSrc);

        requestAnimationFrame(() => {
            img.src = nextSrc;
            img.style.opacity = '1';
        });
    });
}

function goNext() {
    index = (index + 1) % total;
    applyImages();
}

function goPrev() {
    index = (index - 1 + total) % total;
    applyImages();
}

rightBtn.addEventListener('click', goNext);
leftBtn.addEventListener('click', goPrev);

setInterval(goNext, 4000);

applyImages();

// pricing table monthly ⇄ yearly toggle
const toggle = document.getElementById('pricingToggle');
const prices = document.querySelectorAll('.price');

toggle.addEventListener('change', () => {
    prices.forEach(price => {
        price.textContent = toggle.checked
            ? price.dataset.year
            : price.dataset.month;
    });
});
