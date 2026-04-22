/* ============================================
   JUSTICE IN THE WORKPLACE - Main JavaScript
   ============================================ */

console.log('App.js starting...');

// Global state
let currentLanguage = 'en';
let currentTab = 'home';

// Wait for DOM and translations
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Initialize components
    initLanguageToggle();
    initTabs();
    initAccordions();
    
    // Apply initial language
    setTimeout(() => {
        updateContent('en');
        console.log('Content updated to English');
    }, 100);
});

// ============================================
// LANGUAGE TOGGLE
// ============================================

function initLanguageToggle() {
    const langBtns = document.querySelectorAll('.lang-btn');
    console.log('Found language buttons:', langBtns.length);
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            console.log('Language clicked:', lang);
            
            // Update active state
            langBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update language
            currentLanguage = lang;
            updateContent(lang);
        });
    });
}

// ============================================
// UPDATE CONTENT
// ============================================

function updateContent(lang) {
    console.log('Updating content to:', lang);
    
    const t = translations[lang];
    if (!t) {
        console.error('No translation found for:', lang);
        return;
    }
    
    // Get all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    console.log('Found elements to translate:', elements.length);
    
    let translated = 0;
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            // Check if element has HTML content that needs to be preserved
            const originalHasHTML = el.innerHTML.includes('<span') || el.innerHTML.includes('<br');
            
            if (originalHasHTML && t[key].includes('<')) {
                // Use innerHTML for content with spans/br
                el.innerHTML = t[key];
            } else {
                el.textContent = t[key];
            }
            translated++;
        }
    });
    
    console.log('Translated elements:', translated);
}

// ============================================
// TABS
// ============================================

function initTabs() {
    const tabItems = document.querySelectorAll('.tab-btn');
    console.log('Found tab buttons:', tabItems.length);
    
    tabItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            console.log('Tab clicked:', tabId);
            
            if (tabId === currentTab) return;
            
            // Update active states
            tabItems.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide content
            const contents = document.querySelectorAll('.page');
            contents.forEach(c => c.classList.remove('active'));
            
            const target = document.querySelector(`.page[data-page="${tabId}"]`);
            if (target) {
                target.classList.add('active');
            }
            
            currentTab = tabId;
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
}

// ============================================
// ACCORDIONS
// ============================================

function initAccordions() {
    const headers = document.querySelectorAll('.accordion-header');
    console.log('Found accordion headers:', headers.length);
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.closest('.accordion-item');
            if (item) {
                item.classList.toggle('active');
            }
        });
    });
}

// ============================================
// GLOBAL FUNCTION FOR TAB SWITCHING
// ============================================

window.switchTab = function(tabId) {
    console.log('switchTab called:', tabId);
    
    const tabItems = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.page');
    
    tabItems.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    
    const targetTab = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const targetContent = document.querySelector(`.page[data-page="${tabId}"]`);
    
    if (targetTab) targetTab.classList.add('active');
    if (targetContent) targetContent.classList.add('active');
    
    currentTab = tabId;
    
    // Scroll to top
    window.scrollTo(0, 0);
};

console.log('App.js loaded successfully');