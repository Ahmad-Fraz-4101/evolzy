// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Add scroll reveal animation
const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-content');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Initialize sliders
function initSliders() {
    // Video Slider
    const videoSlider = document.querySelector('.video-slider');
    const videoSlides = document.querySelectorAll('.video-slide');
    const videoPrevBtn = document.querySelector('.video-showcase .slider-nav.prev');
    const videoNextBtn = document.querySelector('.video-showcase .slider-nav.next');
    let currentVideoSlide = 0;

    // Reviews Slider
    const reviewsSlider = document.querySelector('.reviews-slider');
    const reviewSlides = document.querySelectorAll('.review-slide');
    const reviewPrevBtn = document.querySelector('.reviews-section .review-nav.prev');
    const reviewNextBtn = document.querySelector('.reviews-section .review-nav.next');
    let currentReviewSlide = 0;

    // Update slider position
    function updateSliderPosition(slider, currentSlide, totalSlides) {
        const slideWidth = slider.offsetWidth;
        slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    // Video slider controls
    if (videoPrevBtn && videoNextBtn) {
        videoPrevBtn.addEventListener('click', () => {
            currentVideoSlide = (currentVideoSlide - 1 + videoSlides.length) % videoSlides.length;
            updateSliderPosition(videoSlider, currentVideoSlide, videoSlides.length);
        });

        videoNextBtn.addEventListener('click', () => {
            currentVideoSlide = (currentVideoSlide + 1) % videoSlides.length;
            updateSliderPosition(videoSlider, currentVideoSlide, videoSlides.length);
        });
    }

    // Reviews slider controls
    if (reviewPrevBtn && reviewNextBtn) {
        reviewPrevBtn.addEventListener('click', () => {
            currentReviewSlide = (currentReviewSlide - 1 + reviewSlides.length) % reviewSlides.length;
            updateSliderPosition(reviewsSlider, currentReviewSlide, reviewSlides.length);
        });

        reviewNextBtn.addEventListener('click', () => {
            currentReviewSlide = (currentReviewSlide + 1) % reviewSlides.length;
            updateSliderPosition(reviewsSlider, currentReviewSlide, reviewSlides.length);
        });
    }

    // Initialize positions
    updateSliderPosition(videoSlider, currentVideoSlide, videoSlides.length);
    updateSliderPosition(reviewsSlider, currentReviewSlide, reviewSlides.length);

    // Update positions on window resize
    window.addEventListener('resize', () => {
        updateSliderPosition(videoSlider, currentVideoSlide, videoSlides.length);
        updateSliderPosition(reviewsSlider, currentReviewSlide, reviewSlides.length);
    });
}

// Call initSliders when the DOM is loaded
document.addEventListener('DOMContentLoaded', initSliders);

// Auto-play videos when they come into view
const videos = document.querySelectorAll('video');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.play();
        } else {
            entry.target.pause();
        }
    });
}, { threshold: 0.5 });

videos.forEach(video => {
    observer.observe(video);
}); 