// ===== COMPONENT-SPECIFIC JAVASCRIPT =====
// Description: Specialized functionality for individual components

// ===== EVENTS PAGE FUNCTIONALITY =====
class EventsManager {
    constructor() {
        this.events = [];
        this.currentFilter = 'all';
        this.init();
    }
    
    init() {
        this.bindEventListeners();
        this.loadEvents();
    }
    
    bindEventListeners() {
        // Event filter buttons
        const filterButtons = document.querySelectorAll('.event-filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterEvents(e.target.dataset.filter));
        });
        
        // Event registration
        const registerButtons = document.querySelectorAll('.event-register-btn');
        registerButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleEventRegistration(e));
        });
    }
    
    filterEvents(filter) {
        this.currentFilter = filter;
        const eventCards = document.querySelectorAll('.event-card');
        
        eventCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update active filter button
        document.querySelectorAll('.event-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    }
    
    handleEventRegistration(e) {
        e.preventDefault();
        const eventId = e.target.dataset.eventId;
        const eventTitle = e.target.closest('.event-card').querySelector('h3').textContent;
        
        // Show registration modal or redirect to registration form
        this.showRegistrationModal(eventId, eventTitle);
    }
    
    showRegistrationModal(eventId, eventTitle) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Register for ${eventTitle}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="registration-form">
                        <div class="form-group">
                            <label>Full Name *</label>
                            <input type="text" name="name" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Email *</label>
                            <input type="email" name="email" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Phone Number *</label>
                            <input type="tel" name="phone" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label>College/Organization</label>
                            <input type="text" name="organization" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Why do you want to attend this event?</label>
                            <textarea name="motivation" rows="3" class="form-control"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Register Now</button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeModal = () => modal.remove();
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Handle form submission
        modal.querySelector('.registration-form').addEventListener('submit', (e) => {
            e.preventDefault();
            // Process registration
            showNotification('Registration successful! Check your email for confirmation.', 'success');
            closeModal();
        });
    }
}

// ===== STARTUP SHOWCASE FUNCTIONALITY =====
class StartupShowcase {
    constructor() {
        this.startups = [];
        this.currentCategory = 'all';
        this.init();
    }
    
    init() {
        this.bindEventListeners();
        this.initializeCarousel();
    }
    
    bindEventListeners() {
        // Category filter
        const categoryButtons = document.querySelectorAll('.startup-category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterByCategory(e.target.dataset.category));
        });
        
        // Startup details modal
        const detailButtons = document.querySelectorAll('.startup-details-btn');
        detailButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.showStartupDetails(e.target.dataset.startupId));
        });
    }
    
    filterByCategory(category) {
        this.currentCategory = category;
        const startupCards = document.querySelectorAll('.startup-card');
        
        startupCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => card.classList.add('fade-in'), 100);
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    initializeCarousel() {
        const carousel = document.querySelector('.startup-carousel');
        if (!carousel) return;
        
        let currentSlide = 0;
        const slides = carousel.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;
        
        // Auto-play carousel
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 5000);
    }
}

// ===== TEAM PAGE FUNCTIONALITY =====
class TeamManager {
    constructor() {
        this.teamMembers = [];
        this.init();
    }
    
    init() {
        this.bindEventListeners();
        this.loadTeamMembers();
    }
    
    bindEventListeners() {
        // Team member modal
        const memberCards = document.querySelectorAll('.team-card');
        memberCards.forEach(card => {
            card.addEventListener('click', () => this.showMemberDetails(card.dataset.memberId));
        });
    }
    
    showMemberDetails(memberId) {
        // Implementation for showing detailed member information
        console.log(`Showing details for member: ${memberId}`);
    }
    
    loadTeamMembers() {
        // Implementation for loading team member data
        console.log('Loading team members...');
    }
}

// ===== CONTACT FORM ENHANCEMENT =====
class ContactFormManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.enhanceContactForm();
        this.initializeMap();
    }
    
    enhanceContactForm() {
        const contactForm = document.querySelector('#contact-form');
        if (!contactForm) return;
        
        // Add real-time character counter for message field
        const messageField = contactForm.querySelector('textarea[name="message"]');
        if (messageField) {
            this.addCharacterCounter(messageField, 500);
        }
        
        // Add department selection
        const departmentSelect = contactForm.querySelector('select[name="department"]');
        if (departmentSelect) {
            this.populateDepartments(departmentSelect);
        }
    }
    
    addCharacterCounter(textarea, maxLength) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.textContent = `0/${maxLength}`;
        
        textarea.parentNode.appendChild(counter);
        
        textarea.addEventListener('input', () => {
            const length = textarea.value.length;
            counter.textContent = `${length}/${maxLength}`;
            
            if (length > maxLength) {
                counter.classList.add('over-limit');
                textarea.classList.add('over-limit');
            } else {
                counter.classList.remove('over-limit');
                textarea.classList.remove('over-limit');
            }
        });
    }
    
    populateDepartments(select) {
        const departments = [
            'General Inquiry',
            'Event Registration',
            'Startup Incubation',
            'Mentorship Program',
            'Partnership Opportunities',
            'Media & Press',
            'Technical Support'
        ];
        
        departments.forEach(dept => {
            const option = document.createElement('option');
            option.value = dept.toLowerCase().replace(/\s+/g, '-');
            option.textContent = dept;
            select.appendChild(option);
        });
    }
    
    initializeMap() {
        // Placeholder for map initialization (can integrate with Google Maps API)
        const mapContainer = document.querySelector('#contact-map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="map-placeholder">
                    <i class="fas fa-map-marker-alt"></i>
                    <p>SAKEC Campus Location</p>
                    <p>Chembur, Mumbai - 400088</p>
                </div>
            `;
        }
    }
}

// ===== SEARCH FUNCTIONALITY =====
class SearchManager {
    constructor() {
        this.searchIndex = [];
        this.init();
    }
    
    init() {
        this.createSearchIndex();
        this.bindSearchEvents();
    }
    
    createSearchIndex() {
        // Create searchable content index
        const searchableElements = document.querySelectorAll('h1, h2, h3, p, .event-card, .startup-card, .team-card');
        
        searchableElements.forEach(element => {
            this.searchIndex.push({
                element: element,
                text: element.textContent.toLowerCase(),
                type: this.getElementType(element)
            });
        });
    }
    
    getElementType(element) {
        if (element.closest('.event-card')) return 'event';
        if (element.closest('.startup-card')) return 'startup';
        if (element.closest('.team-card')) return 'team';
        return 'content';
    }
    
    bindSearchEvents() {
        const searchInput = document.querySelector('#site-search');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', debounce((e) => {
            this.performSearch(e.target.value);
        }, 300));
    }
    
    performSearch(query) {
        if (query.length < 2) {
            this.clearSearchResults();
            return;
        }
        
        const results = this.searchIndex.filter(item =>
            item.text.includes(query.toLowerCase())
        );
        
        this.displaySearchResults(results, query);
    }
    
    displaySearchResults(results, query) {
        let resultsContainer = document.querySelector('#search-results');
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.id = 'search-results';
            resultsContainer.className = 'search-results-container';
            document.body.appendChild(resultsContainer);
        }
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <p>No results found for "${query}"</p>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = `
                <div class="search-results-header">
                    <h3>Search Results for "${query}" (${results.length})</h3>
                    <button class="close-search">&times;</button>
                </div>
                <div class="search-results-list">
                    ${results.slice(0, 10).map(result => `
                        <div class="search-result-item" data-type="${result.type}">
                            <div class="result-content">
                                ${this.highlightSearchTerm(result.text, query)}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        resultsContainer.style.display = 'block';
        
        // Close search results
        resultsContainer.querySelector('.close-search')?.addEventListener('click', () => {
            this.clearSearchResults();
        });
    }
    
    highlightSearchTerm(text, term) {
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    clearSearchResults() {
        const resultsContainer = document.querySelector('#search-results');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
    }
}

// ===== INITIALIZE COMPONENTS ON DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components based on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'events.html':
            new EventsManager();
            break;
        case 'startups.html':
            new StartupShowcase();
            break;
        case 'team.html':
            new TeamManager();
            break;
        case 'contact.html':
            new ContactFormManager();
            break;
        default:
            // Initialize search on all pages
            new SearchManager();
            break;
    }
});

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EventsManager,
        StartupShowcase,
        TeamManager,
        ContactFormManager,
        SearchManager
    };
}
