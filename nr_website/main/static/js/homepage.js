document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            // Custom particle configuration
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#d7b90f" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#d7b90f", opacity: 0.3, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // Magnetic button effect
    document.querySelectorAll('.magnetic').forEach(button => {
        const strength = parseFloat(button.getAttribute('data-strength')) || 0.5;
        
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (x - centerX) / centerX * strength;
            const angleY = (y - centerY) / centerY * strength;
            
            button.style.transform = `perspective(1000px) rotateX(${angleY * 5}deg) rotateY(${-angleX * 5}deg) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Animate counters
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.querySelector('.stat-number').innerText.replace('+', '');
            const increment = target / speed;
            
            if (count < target) {
                counter.querySelector('.stat-number').innerText = Math.ceil(count + increment) + (counter.querySelector('.stat-number').innerText.includes('+') ? '+' : '');
                setTimeout(animateCounters, 1);
            } else {
                counter.querySelector('.stat-number').innerText = target + (counter.querySelector('.stat-number').innerText.includes('+') ? '+' : '');
            }
        });
    }

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                if (entry.target.classList.contains('counter')) {
                    animateCounters();
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.counter').forEach(counter => {
        observer.observe(counter);
    });

    // Testimonial carousel
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-next');
    const prevButton = document.querySelector('.carousel-prev');
    const dotsNav = document.querySelector('.carousel-dots');
    
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    // Arrange slides next to each other
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('current-dot');
        dot.addEventListener('click', () => moveToSlide(index));
        dotsNav.appendChild(dot);
    });
    
    let currentIndex = 0;
    const dots = Array.from(dotsNav.children);
    
    // Auto-rotate carousel
    let autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }, 5000);
    
    function updateCarousel() {
        track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('current-dot'));
        dots[currentIndex].classList.add('current-dot');
    }
    
    function moveToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }, 5000);
    }
    
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
        resetAutoSlide();
    });
    
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
        resetAutoSlide();
    });
    
    // Parallax effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.parallax-layer').forEach((layer, index) => {
            const depth = parseFloat(layer.getAttribute('data-depth'));
            const xMove = x * depth * 100;
            const yMove = y * depth * 100;
            
            layer.style.transform = `translateX(${xMove}px) translateY(${yMove}px)`;
        });
    });
});