// Main Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Timeline
    initTimeline();
    
    // Initialize other animations and effects
    initAnimations();
});

// Timeline Functionality
function initTimeline() {
    const timelinePoints = document.querySelectorAll('.timeline-point');
    const prevBtn = document.querySelector('.timeline-nav.prev');
    const nextBtn = document.querySelector('.timeline-nav.next');
    let currentIndex = 0;
    let autoSlideInterval;
    const slideDuration = 3000; // 3 seconds per slide

    // Set active point
    function setActivePoint(index) {
        timelinePoints.forEach(point => point.classList.remove('active'));
        timelinePoints[index].classList.add('active');
        currentIndex = index;
        updateNavButtons();
        
        // Scroll to point on mobile
        if (window.innerWidth <= 768) {
            timelinePoints[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    // Navigate timeline
    function navigateTimeline(direction) {
        let newIndex = currentIndex + direction;
        if (newIndex < 0) newIndex = 0;
        if (newIndex >= timelinePoints.length) newIndex = timelinePoints.length - 1;
        setActivePoint(newIndex);
    }

    // Update navigation buttons
    function updateNavButtons() {
        prevBtn.classList.toggle('disabled', currentIndex === 0);
        nextBtn.classList.toggle('disabled', currentIndex === timelinePoints.length - 1);
    }

    // Auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % timelinePoints.length;
            setActivePoint(nextIndex);
        }, slideDuration);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Initialize
    setActivePoint(0);
    startAutoSlide();
    
    // Event listeners
    timelinePoints.forEach((point, index) => {
        point.addEventListener('click', () => {
            setActivePoint(index);
            resetAutoSlide();
        });
    });
    
    prevBtn.addEventListener('click', () => {
        navigateTimeline(-1);
        resetAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        navigateTimeline(1);
        resetAutoSlide();
    });
    
    // Handle swipe on mobile
    if (window.innerWidth <= 768) {
        const timelineContainer = document.querySelector('.timeline-points');
        let touchStartX = 0;
        let touchEndX = 0;
        
        timelineContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        timelineContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) navigateTimeline(1); // Swipe left
            if (touchEndX > touchStartX + 50) navigateTimeline(-1); // Swipe right
            resetAutoSlide();
        }, { passive: true });
    }
}

// Update your JavaScript to include this animation trigger
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
});

// Other animations and effects
function initAnimations() {
    // Animate statistics counting
    function animateStats() {
        const statElements = document.querySelectorAll('.stat-number');
        const speed = 100;
        
        statElements.forEach((stat) => {
            const target = parseInt(stat.getAttribute('data-count'));
            const count = parseInt(stat.innerText) || 0;
            const increment = Math.ceil(target / speed);
            
            if (count < target) {
                stat.innerText = count + increment >= target ? target : count + increment;
                requestAnimationFrame(animateStats);
            } else {
                stat.classList.add('animated');
            }
        });
    }

    // Certifications hover effect
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const img = card.querySelector('img');
            img.style.transform = 'scale(1.05)';
            img.style.filter = 'grayscale(0%) brightness(1.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('img');
            img.style.transform = 'scale(1)';
            img.style.filter = 'grayscale(20%) brightness(1.1)';
        });
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('at-glance')) {
                    animateStats();
                }
                
                if (entry.target.classList.contains('story-container')) {
                    entry.target.querySelectorAll('.moment').forEach((moment, index) => {
                        setTimeout(() => {
                            moment.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
                            moment.style.opacity = 0;
                        }, 0);
                    });
                }
                
                if (entry.target.classList.contains('mv-grid')) {
                    entry.target.querySelectorAll('.mv-card').forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.15}s forwards`;
                            card.style.opacity = 0;
                        }, 0);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe sections
    document.querySelectorAll('.at-glance, .story-container, .mv-grid, .certs-grid').forEach(el => {
        if (el) observer.observe(el);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.journey-hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
}