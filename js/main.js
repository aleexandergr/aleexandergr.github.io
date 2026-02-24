// ===================================
// MAIN JAVASCRIPT FILE
// ===================================

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    
    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Toggle icon
        const icon = mobileMenuButton.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });
    
    // Close mobile menu when clicking a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
const scrollTopButton = document.getElementById('scroll-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopButton.classList.remove('hidden');
    } else {
        scrollTopButton.classList.add('hidden');
    }
});

scrollTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// NAVBAR BACKGROUND ON SCROLL
// ===================================
const navbar = document.querySelector('nav');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 50) {
        navbar.classList.add('shadow-xl');
    } else {
        navbar.classList.remove('shadow-xl');
    }
});

// ===================================
// ACTIVE LINK HIGHLIGHTING
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-purple-600', 'font-bold');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('text-purple-600', 'font-bold');
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ===================================
// CONTACT FORM HANDLING
// ===================================
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Get service name in Spanish
    const serviceNames = {
        'soporte-tecnico': 'Soporte Técnico en Sistemas',
        'diseno-web': 'Diseño y Desarrollo Web',
        'administracion-datos': 'Administración de Datos',
        'soporte-servidores': 'Soporte a Servidores',
        'administracion-contable': 'Administración Contable',
        'programacion': 'Programación',
        'otro': 'Otro'
    };
    
    const serviceName = serviceNames[service] || service;
    
    // Create WhatsApp message
    let whatsappMessage = `Hola John, mi nombre es ${name}.\n\n`;
    whatsappMessage += `Servicio de interés: ${serviceName}\n\n`;
    whatsappMessage += `Mensaje: ${message}\n\n`;
    whatsappMessage += `Email: ${email}`;
    
    if (phone) {
        whatsappMessage += `\nTeléfono: ${phone}`;
    }
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/573214500596?text=${encodedMessage}`;
    
    // Also create email URL as backup
    const emailSubject = encodeURIComponent(`Consulta: ${serviceName}`);
    const emailBody = encodeURIComponent(`Nombre: ${name}\nTeléfono: ${phone}\n\nMensaje:\n${message}`);
    const emailURL = `mailto:Aleexander.gr@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    
    // Show success message
    formMessage.classList.remove('hidden');
    formMessage.className = 'mt-4 text-center p-4 bg-green-100 text-green-700 rounded-lg font-semibold';
    formMessage.innerHTML = `
        <i class="fas fa-check-circle mr-2"></i>
        ¡Gracias por tu mensaje! Te estoy redirigiendo a WhatsApp...
        <div class="mt-3 text-sm">
            <p>Si no se abre automáticamente:</p>
            <a href="${whatsappURL}" target="_blank" class="text-green-800 underline font-bold">Haz clic aquí para WhatsApp</a>
            o
            <a href="${emailURL}" class="text-green-800 underline font-bold">Enviar por Email</a>
        </div>
    `;
    
    // Open WhatsApp in new tab
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 1000);
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 10 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 10000);
});

// ===================================
// SMOOTH SCROLLING FOR ALL LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// LOADING ANIMATION
// ===================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ===================================
// SKILL BADGES ANIMATION ON HOVER
// ===================================
const skillBadges = document.querySelectorAll('.skill-badge');

skillBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ===================================
// SERVICE CARDS TILT EFFECT
// ===================================
const serviceCards = document.querySelectorAll('.card-hover');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease';
    });
});

// ===================================
// TYPING EFFECT FOR HERO SECTION (Optional enhancement)
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===================================
// COUNTER ANIMATION FOR STATISTICS (Future enhancement)
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%c¡Hola! 👋', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cGracias por visitar mi sitio web.', 'color: #667eea; font-size: 16px;');
console.log('%cSi estás interesado en trabajar conmigo, ¡contáctame!', 'color: #667eea; font-size: 14px;');
console.log('%cWhatsApp: +57 321 450 0596', 'color: #25D366; font-size: 14px; font-weight: bold;');
console.log('%cEmail: Aleexander.gr@gmail.com', 'color: #667eea; font-size: 14px; font-weight: bold;');

// ===================================
// PERFORMANCE MONITORING
// ===================================
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Página cargada en: ${pageLoadTime}ms`);
        }, 0);
    });
}

// ===================================
// ERROR HANDLING
// ===================================
window.addEventListener('error', function(e) {
    console.error('Error detectado:', e.error);
});

// ===================================
// FORM VALIDATION ENHANCEMENT
// ===================================
const formInputs = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.required && !this.value.trim()) {
            this.classList.add('border-red-500');
        } else {
            this.classList.remove('border-red-500');
            this.classList.add('border-green-500');
        }
    });
    
    input.addEventListener('focus', function() {
        this.classList.remove('border-red-500', 'border-green-500');
    });
});

// Email validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', function() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailPattern.test(this.value)) {
        this.classList.add('border-red-500');
    }
});

// ===================================
// PRINT DETECTION
// ===================================
window.addEventListener('beforeprint', function() {
    console.log('Imprimiendo página...');
});

// ===================================
// COPY PROTECTION (Optional - puede ser molesto)
// ===================================
// Descomenta si quieres proteger el contenido
/*
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('copy', function(e) {
    e.preventDefault();
});
*/

// ===================================
// LAZY LOADING IMAGES (Future enhancement)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Apply to images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
// Focus trap for mobile menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            document.getElementById('mobile-menu-button').focus();
        }
    }
});

// ===================================
// ANALYTICS READY (Para integración futura)
// ===================================
function trackEvent(category, action, label) {
    console.log('Event tracked:', category, action, label);
    // Aquí puedes integrar Google Analytics, Facebook Pixel, etc.
    // Ejemplo: gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Track service card clicks
document.querySelectorAll('.card-hover').forEach((card, index) => {
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('h3').textContent;
        trackEvent('Services', 'Click', serviceName);
    });
});

// Track contact button clicks
document.querySelectorAll('a[href*="wa.me"], a[href^="mailto:"], a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        const type = this.href.includes('wa.me') ? 'WhatsApp' : 
                     this.href.includes('mailto') ? 'Email' : 'Phone';
        trackEvent('Contact', 'Click', type);
    });
});

console.log('✅ JavaScript loaded successfully!');