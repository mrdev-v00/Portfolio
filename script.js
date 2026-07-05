// ===== FETCH DATA =====
let allProjects = [];

async function loadData() {
    try {
        const res = await fetch('src/data/info.json');
        const data = await res.json();
        allProjects = data.projects;
        initializeApp();
    } catch (err) {
        console.error('Failed to load project data:', err);
        document.getElementById('app').innerHTML = '<p style="color: var(--text-secondary);">Failed to load projects. Please refresh.</p>';
    }
}

// ===== RENDER FUNCTIONS =====

function renderHome() {
    const featured = allProjects.filter(p => p.featured);
    return `
        <section class="page-section">
            <div class="profile">
                <img src="src/assets/pfp.jpg" alt="Muhammed Yassa" class="profile-avatar" />
                <div class="profile-info">
                    <h1>Muhammed Yassa</h1>
                    <div class="title">Full‑Stack Developer · Automation &amp; AI</div>
                    <p class="bio">
                        16 · Pakistan · Building fast, responsive web experiences, Discord bots,
                        AI assistants, and chrome extensions. I turn complex ideas into polished digital products.
                    </p>
                    <div class="profile-links">
                        <a href="https://github.com/mrdev-v00" target="_blank" rel="noopener">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>
                            mrdev-v00
                        </a>
                        <a href="https://www.instagram.com/___dnd.___/" target="_blank" rel="noopener">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1.5"/></svg>
                            ___dnd.___
                        </a>
                        <a href="mailto:muhamedyassa2@gmail.com">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            muhamedyassa2@gmail.com
                        </a>
                        <a href="https://mrdev-v00.github.io" target="_blank" rel="noopener">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                            mrdev-v00.github.io
                        </a>
                    </div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-card"><span class="stat-number">${allProjects.length}</span> Projects</div>
                <div class="stat-card"><span class="stat-number">4</span> Discord Bots</div>
                <div class="stat-card"><span class="stat-number">2</span> AI Websites</div>
                <div class="stat-card"><span class="stat-number">1</span> Chrome Extension</div>
            </div>

            <div class="section-label">featured work</div>
            <h2 class="section-title">Featured Projects</h2>
            <div class="grid-2">
                ${featured.map(p => projectCard(p)).join('')}
            </div>
            <div style="text-align:center; margin-top: var(--spacing-lg);">
                <a href="#projects" class="btn-outline" data-navigate="projects">Browse All Projects →</a>
            </div>
        </section>
    `;
}

function renderProjects() {
    const categories = [...new Set(allProjects.map(p => p.category))];
    return `
        <section class="page-section">
            <div class="section-label">all work</div>
            <h2 class="section-title">Projects</h2>
            <div class="search-bar">
                <span class="search-icon">⌕</span>
                <input type="text" id="projectSearch" placeholder="Search projects..." />
            </div>
            <div class="filter-bar">
                <button class="filter-btn active" data-filter="all">All</button>
                ${categories.map(c => `<button class="filter-btn" data-filter="${c}">${c}</button>`).join('')}
            </div>
            <div class="grid-3" id="projectGrid">
                ${allProjects.map(p => projectCard(p)).join('')}
            </div>
        </section>
    `;
}

function projectCard(project) {
    const techTags = project.tech.slice(0, 2).map(t => `<span class="tech-tag">${t}</span>`).join('');
    return `
        <div class="card" data-id="${project.id}" data-category="${project.category}" data-title="${project.title.toLowerCase()}" data-desc="${project.description.toLowerCase()}">
            <div class="card-header">
                <span class="card-icon">●</span>
                <span class="card-title">${project.title}</span>
            </div>
            <div class="card-desc">${project.description}</div>
            <div class="card-meta">
                <span class="category-tag">${project.category}</span>
                ${techTags}
                <span class="arrow">→</span>
            </div>
        </div>
    `;
}

function renderProjectDetail(id) {
    const project = allProjects.find(p => p.id === id);
    if (!project) return renderNotFound();

    const linksHtml = Object.entries(project.links).map(([label, url]) => {
        return `<a href="${url}" target="_blank" rel="noopener" class="btn">${label}</a>`;
    }).join('');

    return `
        <section class="page-section">
            <a href="#projects" class="back-link" data-navigate="projects">← Back to projects</a>
            <div class="detail-header">
                <span class="card-icon" style="font-size:2.2rem; opacity:0.8;">●</span>
                <h1 class="detail-title">${project.title}</h1>
            </div>
            <div class="detail-meta">
                <span class="category-tag" style="background:var(--accent-glow); color:var(--accent); padding:0.2rem 0.8rem; border-radius:99px; border:1px solid rgba(96,165,250,0.1);">${project.category}</span>
                <span>${project.tech.join(' · ')}</span>
            </div>
            <div class="detail-description">${project.longDescription}</div>
            <div class="detail-links">${linksHtml}</div>
        </section>
    `;
}

function renderAbout() {
    return `
        <section class="page-section">
            <div class="section-label">about me</div>
            <h2 class="section-title">More About Me</h2>
            <div class="about-grid">
                <div class="about-text">
                    <p>I’m a 16‑year‑old developer from Pakistan with a passion for building things that solve real problems. I started with web development and quickly expanded into Discord bots, AI assistants, and browser extensions.</p>
                    <p>I love learning new technologies and turning complex ideas into polished, user‑friendly products. I’m available for freelance work and collaboration.</p>
                    <p><strong>Current focus:</strong> Full‑stack web apps, AI integration, and automation.</p>
                    <p style="margin-top:var(--spacing-md);">
                        <a href="#contact" class="btn-outline" data-navigate="contact">Hire Me →</a>
                    </p>
                </div>
                <div>
                    <h3 style="font-weight:600; margin-bottom:var(--spacing-sm);">Skills & Tools</h3>
                    <div class="tech-stack">
                        <span class="tag">HTML</span>
                        <span class="tag">CSS</span>
                        <span class="tag">JavaScript</span>
                        <span class="tag">Python</span>
                        <span class="tag">GitHub</span>
                        <span class="tag">Figma</span>
                        <span class="tag">Canva</span>
                        <span class="tag">discord.py</span>
                        <span class="tag">Lavalink</span>
                        <span class="tag">OpenAI API</span>
                        <span class="tag">Chrome Extensions</span>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderContact() {
    return `
        <section class="page-section">
            <div class="section-label">get in touch</div>
            <h2 class="section-title">Contact</h2>
            <div class="contact-grid">
                <div>
                    <p style="color:var(--text-secondary); margin-bottom:var(--spacing-md); font-size:1rem;">I’m always open to new projects, collaborations, or just a friendly chat. Reach out through any of the channels below.</p>
                    <div class="contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        <a href="mailto:muhamedyassa2@gmail.com">muhamedyassa2@gmail.com</a>
                    </div>
                    <div class="contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1.5"/></svg>
                        <a href="https://www.instagram.com/___dnd.___/" target="_blank">___dnd.___</a>
                    </div>
                    <div class="contact-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>
                        <a href="https://github.com/mrdev-v00" target="_blank">github.com/mrdev-v00</a>
                    </div>
                </div>
                <div>
                    <h3 style="font-weight:600; margin-bottom:var(--spacing-sm);">Quick Response</h3>
                    <p style="color:var(--text-secondary);">I typically reply within 24 hours. For urgent matters, feel free to reach out via email.</p>
                    <div style="margin-top:var(--spacing-lg); background:var(--bg-card); padding:var(--spacing-md); border-radius:var(--radius-sm); border:1px solid var(--border-subtle);">
                        <p style="color:var(--text-muted); font-size:0.85rem;"> Pakistan<br> UTC +5</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderNotFound() {
    return `<section class="page-section"><h2>Project not found</h2><p>Sorry, we couldn't find that project.</p></section>`;
}

// ===== ROUTER =====

const app = document.getElementById('app');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

function navigate(page, data) {
    let html = '';
    switch (page) {
        case 'home': html = renderHome(); break;
        case 'projects': html = renderProjects(); break;
        case 'project-detail': html = renderProjectDetail(data); break;
        case 'about': html = renderAbout(); break;
        case 'contact': html = renderContact(); break;
        default: html = renderHome();
    }
    app.innerHTML = html;

    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });
    mobileNavLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });

    if (page === 'project-detail') {
        history.pushState(null, '', `#project-${data}`);
    } else {
        history.pushState(null, '', `#${page}`);
    }

    closeMobileMenu();
    attachEventListeners();
    observeCards();
    attachSearchListener();
}

// ===== EVENT DELEGATION =====

function attachEventListeners() {
    // Card clicks
    document.querySelectorAll('.card[data-id]').forEach(card => {
        card.addEventListener('click', function() {
            navigate('project-detail', this.dataset.id);
        });
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterProjects(filter);
        });
    });

    // Navigation links from JS
    document.querySelectorAll('[data-navigate]').forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            navigate(this.dataset.navigate);
        });
    });
}

function filterProjects(filter) {
    const cards = document.querySelectorAll('.card[data-id]');
    const search = document.getElementById('projectSearch');
    const searchTerm = search ? search.value.toLowerCase() : '';

    cards.forEach(card => {
        const matchCategory = filter === 'all' || card.dataset.category === filter;
        const matchSearch = !searchTerm || card.dataset.title.includes(searchTerm) || card.dataset.desc.includes(searchTerm);
        card.style.display = (matchCategory && matchSearch) ? '' : 'none';
    });
}

function attachSearchListener() {
    const search = document.getElementById('projectSearch');
    if (search) {
        search.addEventListener('input', function() {
            const activeFilter = document.querySelector('.filter-btn.active');
            const filter = activeFilter ? activeFilter.dataset.filter : 'all';
            filterProjects(filter);
        });
    }
}

// ===== SCROLL REVEAL =====

function observeCards() {
    const cards = document.querySelectorAll('.card');
    if (!cards.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    cards.forEach(card => observer.observe(card));
}

// ===== MOBILE MENU =====

function toggleMobileMenu() {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

mobileToggle.addEventListener('click', toggleMobileMenu);

mobileNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        navigate(this.dataset.page);
    });
});

// ===== THEME TOGGLE =====

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ===== NAVIGATION =====

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        navigate(this.dataset.page);
    });
});

// ===== HASH ROUTING =====

window.addEventListener('hashchange', function() {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('project-')) {
        navigate('project-detail', hash.replace('project-', ''));
    } else if (hash) {
        navigate(hash);
    } else {
        navigate('home');
    }
});

// ===== INIT =====

function initializeApp() {
    const initialHash = window.location.hash.slice(1);
    if (initialHash.startsWith('project-')) {
        navigate('project-detail', initialHash.replace('project-', ''));
    } else if (initialHash) {
        navigate(initialHash);
    } else {
        navigate('home');
    }
}

// ===== START =====
loadData();
