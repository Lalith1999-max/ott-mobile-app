const HERO_IMAGE = 'file:///C:/Users/LUCKY/.gemini/antigravity/brain/7d916eed-16a7-4cb7-b8a5-518da7a28002/movie_hero_poster_1776169283417.png';
const CARD_1 = 'file:///C:/Users/LUCKY/.gemini/antigravity/brain/7d916eed-16a7-4cb7-b8a5-518da7a28002/movie_card_1_1776169339608.png';
const CARD_2 = 'file:///C:/Users/LUCKY/.gemini/antigravity/brain/7d916eed-16a7-4cb7-b8a5-518da7a28002/movie_card_2_1776169365871.png';

const MOCK_DATA = {
    hero: {
        title: "NEON CITY",
        tags: ["Sci-Fi", "Action", "2024", "U/A 16+"],
        image: HERO_IMAGE
    },
    categories: [
        {
            title: "Trending in India",
            items: [
                { img: CARD_1, premium: true },
                { img: CARD_2, premium: false },
                { img: CARD_1, premium: false },
                { img: CARD_2, premium: true },
                { img: CARD_1, premium: false },
                { img: CARD_2, premium: false }
            ]
        },
        {
            title: "Blockbuster Movies",
            items: [
                { img: CARD_2, premium: true },
                { img: CARD_1, premium: false },
                { img: CARD_2, premium: true },
                { img: CARD_1, premium: false },
                { img: CARD_2, premium: false },
                { img: CARD_1, premium: true }
            ]
        },
        {
            title: "Action Thrillers",
            items: [
                { img: CARD_1, premium: false },
                { img: CARD_1, premium: false },
                { img: CARD_2, premium: true },
                { img: CARD_2, premium: false },
                { img: CARD_1, premium: true },
                { img: CARD_2, premium: true }
            ]
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    renderHero();
    renderCategories();
    setupNavigation();
});

function renderHero() {
    const container = document.getElementById('hero-container');
    container.innerHTML = `
        <div class="hero-wrapper">
            <div class="hero-slide active" style="background-image: url('${MOCK_DATA.hero.image}');">
                <div class="hero-overlay">
                    <h1 class="hero-title">${MOCK_DATA.hero.title}</h1>
                    <div class="hero-meta">
                        <span>${MOCK_DATA.hero.tags[0]}</span>
                        <span class="meta-dot"></span>
                        <span>${MOCK_DATA.hero.tags[1]}</span>
                        <span class="meta-dot"></span>
                        <span>${MOCK_DATA.hero.tags[2]}</span>
                        <span class="meta-dot"></span>
                        <span>${MOCK_DATA.hero.tags[3]}</span>
                    </div>
                    <div class="hero-actions">
                        <button class="btn-primary">
                            <span class="material-symbols-rounded">play_arrow</span>
                            Watch Now
                        </button>
                        <button class="btn-secondary">
                            <span class="material-symbols-rounded">add</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderCategories() {
    const container = document.getElementById('categories-container');
    let html = '';
    
    MOCK_DATA.categories.forEach(cat => {
        html += `
            <div class="content-section">
                <h2 class="section-title">${cat.title}</h2>
                <div class="slider-container" 
                     onmousedown="startDrag(event, this)" 
                     onmousemove="drag(event, this)" 
                     onmouseup="endDrag(this)" 
                     onmouseleave="endDrag(this)">
                    ${cat.items.map(item => `
                        <div class="movie-card">
                            <img src="${item.img}" alt="Movie Card">
                            ${item.premium ? '<span class="premium-badge">PREMIUM</span>' : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

// Simple logic to add mouse drag for desktop users testing the UI
let isDown = false;
let startX;
let scrollLeft;

window.startDrag = function(e, slider) {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
};

window.drag = function(e, slider) {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    slider.scrollLeft = scrollLeft - walk;
};

window.endDrag = function(slider) {
    isDown = false;
    slider.classList.remove('active');
};
