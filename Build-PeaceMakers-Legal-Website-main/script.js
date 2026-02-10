
        // Header Scroll Effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            const scrollPosition = window.scrollY;
            
            if (scrollPosition > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile Menu Toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        const body = document.body;

        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            body.classList.add('no-scroll');
        });

        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            body.classList.remove('no-scroll');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });

        // Mobile dropdown functionality
        document.querySelectorAll('.mobile-dropdown > .mobile-nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const dropdown = this.parentElement;
                    dropdown.classList.toggle('active');
                }
            });
        });

        // Desktop dropdown functionality
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
        });

        // Active link highlighting
        const currentPage = location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        // Services Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.service-tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Add subtle animation effect
            const activeContent = document.getElementById(tabId);
            activeContent.style.opacity = '0';
            activeContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                activeContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                activeContent.style.opacity = '1';
                activeContent.style.transform = 'translateY(0)';
            }, 50);
        });
    });
    
    // Process timeline animation
    const processSteps = document.querySelectorAll('.process-step');
    const lineProgress = document.querySelector('.line-progress');
    let progressAnimated = false;
    
    function animateProgress() {
        if (progressAnimated) return;
        
        const processSection = document.querySelector('.process-section');
        const sectionTop = processSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            lineProgress.style.height = '100%';
            progressAnimated = true;
            
            // Animate steps sequentially
            processSteps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('revealed');
                }, index * 300);
            });
        }
    }
    
    // Check on load and scroll
    animateProgress();
    window.addEventListener('scroll', animateProgress);
    
    // Service items hover animation
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(15deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });
    
    // Image hover effect
    const serviceImages = document.querySelectorAll('.image-frame img');
    serviceImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Auto-rotate tabs for demo (optional, can be removed)
    let currentTab = 0;
    const autoRotateTabs = function() {
        if (document.visibilityState === 'visible') {
            currentTab = (currentTab + 1) % tabButtons.length;
            tabButtons[currentTab].click();
        }
    };
    
    // Uncomment to enable auto-rotation (every 8 seconds)
    // setInterval(autoRotateTabs, 8000);
    
    // Add scroll animation for service detail
    const serviceDetails = document.querySelectorAll('.service-detail');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    serviceDetails.forEach(detail => revealObserver.observe(detail));
});
    // Testimonials Slider
function initTestimonialSlider() {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (!track || !cards.length) return;
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    // Set initial active state
    updateSlider();
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateSlider();
    });
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateSlider();
    });
    
    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Auto-rotate
    let autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateSlider();
    }, 5000);
    
    // Pause on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateSlider();
        }, 5000);
    });
    
    // Update slider function
    function updateSlider() {
        // Calculate transform value
        const translateX = -currentIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update card active state
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - next
                currentIndex = (currentIndex + 1) % totalCards;
            } else {
                // Swipe right - previous
                currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            }
            updateSlider();
        }
    }
}

// Team cards reveal animation
function initTeamReveal() {
    const teamCards = document.querySelectorAll('.team-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    teamCards.forEach(card => observer.observe(card));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialSlider();
    initTeamReveal();
    
    // Add click animation for team links
    const teamLinks = document.querySelectorAll('.team-link');
    teamLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(183, 65, 14, 0.2);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
                window.location.href = this.getAttribute('href');
            }, 600);
        });
    });
    
    // Add ripple animation to CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: