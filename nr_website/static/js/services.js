document.addEventListener('DOMContentLoaded', function() {
    const servicesNav = document.querySelector('.services-nav');
    const serviceLinks = document.querySelectorAll('.service-link');
    const serviceSections = document.querySelectorAll('.service-section');
    
    // Add scroll event for nav background
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            servicesNav.classList.add('scrolled');
        } else {
            servicesNav.classList.remove('scrolled');
        }
        
        // Highlight active section link
        let current = '';
        serviceSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        serviceLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for navigation links
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Update active link
            serviceLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});