// ===============================
// VARIABLES GLOBALES
// ===============================
let currentTheme = 'dark';
const tooltip = document.getElementById('tooltip');
const modalOverlay = document.getElementById('modal-overlay');

// ===============================
// LOADER Y INICIALIZACIÓN
// ===============================
document.addEventListener('DOMContentLoaded', function() {
    // Ocultar loader después de 2 segundos
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);

    // Inicializar todas las funcionalidades
    initializeApp();
});

function initializeApp() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeModals();
    initializeTooltips();
    initializeContactForm();
    initializeThemeToggle();
    initializeParallaxEffect();
    initializeHeroEffects();
    createDynamicStars();
    initializeSpaceMouseEffects();
    
    // Inicializar efectos avanzados después de un pequeño delay
    setTimeout(() => {
        initializeAdvancedEffects();
    }, 500);
}

// ===============================
// NAVEGACIÓN
// ===============================
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle menu móvil
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menu al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll para enlaces internos
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Altura del navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cambiar estilo del navbar al hacer scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(12, 12, 14, 0.95)';
        } else {
            navbar.style.background = 'rgba(12, 12, 14, 0.9)';
        }
    });
}

// ===============================
// FUNCIÓN PARA SCROLL A SECCIÓN
// ===============================
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===============================
// ANIMACIONES DE SCROLL
// ===============================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observar elementos que necesitan animación
    const animateElements = document.querySelectorAll('.result-card, .case-card, .skill-category, .about-content, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ===============================
// SISTEMA DE MODALES
// ===============================
function initializeModals() {
    const resultCards = document.querySelectorAll('.result-card');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloses = document.querySelectorAll('.modal-close');

    // Abrir modales
    resultCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal');
            showModal(modalId);
        });
    });

    // Cerrar modales
    modalCloses.forEach(close => {
        close.addEventListener('click', hideModal);
    });

    // Cerrar modal al hacer click fuera
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            hideModal();
        }
    });

    // Cerrar modal con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideModal();
        }
    });
}

function showModal(modalId) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modal = document.getElementById(modalId);
    
    if (modal) {
        // Ocultar todos los modales primero
        const allModals = document.querySelectorAll('.modal');
        allModals.forEach(m => {
            m.style.display = 'none';
            m.style.transform = 'scale(0.8)';
        });
        
        // Mostrar solo el modal seleccionado
        modal.style.display = 'block';
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Agregar animación de entrada
        setTimeout(() => {
            modal.style.transform = 'scale(1)';
        }, 10);
    }
}

function hideModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Ocultar todos los modales y reset transform
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
        modal.style.transform = 'scale(0.8)';
    });
}

// ===============================
// SISTEMA DE TOOLTIPS
// ===============================
function initializeTooltips() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const tooltipText = item.getAttribute('data-tooltip');
            if (tooltipText) {
                showTooltip(e, tooltipText);
            }
        });

        item.addEventListener('mouseleave', hideTooltip);
        item.addEventListener('mousemove', (e) => {
            updateTooltipPosition(e);
        });
    });
}

function showTooltip(e, text) {
    tooltip.textContent = text;
    tooltip.classList.add('visible');
    updateTooltipPosition(e);
}

function hideTooltip() {
    tooltip.classList.remove('visible');
}

function updateTooltipPosition(e) {
    const rect = tooltip.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    tooltip.style.left = (x - rect.width / 2) + 'px';
    tooltip.style.top = (y - rect.height - 10) + 'px';
}

// ===============================
// FORMULARIO DE CONTACTO
// ===============================
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');

    // Agregar validación en tiempo real
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
        });

        input.addEventListener('blur', () => {
            validateField(input);
        });
    });

    // Manejar envío del formulario
    form.addEventListener('submit', handleFormSubmit);
}

function validateField(field) {
    const value = field.value.trim();
    const isValid = field.checkValidity();
    
    if (isValid && value) {
        field.style.borderColor = 'var(--accent-gray-light)';
    } else if (!isValid && value) {
        field.style.borderColor = 'var(--accent-orange)';
    } else {
        field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Crear enlace mailto
    const subject = `Contact from ${name} - Portfolio`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:dave.delam@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Abrir cliente de correo
    window.location.href = mailtoLink;
    
    showFormSubmissionFeedback(true);
    
    // Limpiar formulario
    setTimeout(() => {
        e.target.reset();
    }, 1000);
}

function showFormSubmissionFeedback(success) {
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    
    if (success) {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Mensaje Enviado';
        submitButton.style.background = 'linear-gradient(135deg, #10B981, #059669)';
    } else {
        submitButton.innerHTML = '<i class="fas fa-times"></i> Error al Enviar';
        submitButton.style.background = 'linear-gradient(135deg, #EF4444, #DC2626)';
    }
    
    setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.style.background = 'var(--gradient-primary)';
    }, 3000);
}

// ===============================
// TOGGLE TEMA CLARO/OSCURO
// ===============================
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    });
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeIcon = document.querySelector('#themeToggle i');
    if (theme === 'light') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// ===============================
// EFECTO PARALLAX ESPACIAL 3D
// ===============================
function initializeParallaxEffect() {
    const floatingElements = document.querySelectorAll('.floating-element');
    const particles = document.querySelectorAll('.particle');
    const starLayers = document.querySelectorAll('.star-layer');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const scrollPercent = scrolled / (document.body.scrollHeight - window.innerHeight);
        
        // Parallax para elementos flotantes del hero
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        // Parallax 3D para capas de estrellas
        starLayers.forEach((layer, index) => {
            const depth = (index + 1) * 0.2;
            const rotation = scrolled * 0.05 * (index + 1);
            layer.style.transform = `translateZ(${-100 - (index * 100)}px) translateY(${scrolled * depth}px) rotateZ(${rotation}deg)`;
        });
        
        // Movimiento de partículas basado en scroll
        particles.forEach((particle, index) => {
            const speed = 0.3 + (index * 0.05);
            const rotationX = scrolled * 0.1 * (index % 2 === 0 ? 1 : -1);
            const rotationY = scrolled * 0.15 * (index % 3 === 0 ? 1 : -1);
            particle.style.transform = `translate3d(${Math.sin(scrolled * 0.01 + index) * 20}px, ${scrolled * speed}px, ${Math.cos(scrolled * 0.01 + index) * 10}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        });
    });
}

// ===============================
// GENERADOR DINÁMICO DE ESTRELLAS
// ===============================
function createDynamicStars() {
    const starsContainer = document.querySelector('.stars-background');
    
    // Crear estrellas dinámicas adicionales
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'dynamic-star';
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: radial-gradient(circle, rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2}), transparent);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: dynamicStarTwinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            transform: translateZ(${Math.random() * -200 - 50}px);
        `;
        starsContainer.appendChild(star);
    }
    
    // Crear partículas de polvo espacial
    for (let i = 0; i < 20; i++) {
        const dust = document.createElement('div');
        dust.className = 'space-dust';
        dust.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            background: rgba(255, 255, 255, 0.3);
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: dustFloat ${Math.random() * 20 + 30}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
        `;
        starsContainer.appendChild(dust);
    }
}

// ===============================
// EFECTOS DE MOUSE ESPACIALES
// ===============================
function initializeSpaceMouseEffects() {
    const starsBackground = document.querySelector('.stars-background');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        
        // Efecto parallax basado en mouse
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const x = mouseX * speed * 20;
            const y = mouseY * speed * 20;
            particle.style.transform += ` translate(${x}px, ${y}px)`;
        });
        
        // Inclinar ligeramente las capas de estrellas
        const starLayers = document.querySelectorAll('.star-layer');
        starLayers.forEach((layer, index) => {
            const tiltX = mouseY * (index + 1) * 2;
            const tiltY = mouseX * (index + 1) * 2;
            layer.style.transform += ` rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
    });
}

// ===============================
// EFECTO DE ESCRITURA
// ===============================
// Inicializar efectos de la nueva sección hero
function initializeHeroEffects() {
    const textLines = document.querySelectorAll('.text-line');
    const heroImage = document.getElementById('hero-balloon');
    
    // Ocultar todas las líneas inicialmente
    textLines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(50px)';
        line.style.filter = 'blur(8px)';
        line.style.transition = 'all 0.8s ease';
    });
    
    // Configurar Intersection Observer para texto con efecto Spotify-like
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const line = entry.target;
                
                // Efecto de aparición progresiva como lyrics de Spotify
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
                line.style.filter = 'blur(0)';
                
                // Efecto de highlight progresivo
                if (line.classList.contains('final-line')) {
                    setTimeout(() => {
                        line.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)';
                        line.style.color = '#FFFFFF';
                        line.style.fontWeight = '800';
                    }, 500);
                } else {
                    // Para las otras líneas, efecto de focus sutil
                    setTimeout(() => {
                        line.style.color = 'rgba(250, 249, 246, 0.9)';
                        line.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
                    }, 300);
                }
                

            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar cada línea de texto
    textLines.forEach(line => {
        textObserver.observe(line);
    });
    
    // Efecto de blur en la imagen basado en scroll (optimizado)
    function updateImageBlur() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollPercent = scrollY / windowHeight;
        
        if (heroImage) {
            const blurAmount = Math.min(scrollPercent * 10, 10);
            // Usar transform y will-change para mejor performance
            heroImage.style.transform = `translateZ(0)`; // Force hardware acceleration
            heroImage.style.filter = `blur(${blurAmount}px)`;
            heroImage.style.willChange = 'filter';
        }
    }
    
    // Aplicar el efecto de blur inicial y en scroll (con throttle para mejor performance)
    const throttledImageBlur = throttle(updateImageBlur, 16); // ~60fps
    updateImageBlur();
    window.addEventListener('scroll', throttledImageBlur, { passive: true });
}

// ===============================
// UTILIDADES ADICIONALES
// ===============================

// Función para generar números aleatorios
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Función para throttle (limitar ejecución de funciones)
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Función para debounce (retrasar ejecución de funciones)
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ===============================
// ANIMACIONES ADICIONALES
// ===============================

// Contador animado para métricas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Inicializar contadores cuando sean visibles
function initializeCounters() {
    const counters = document.querySelectorAll('.metric .number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const textContent = entry.target.textContent;
                // Si el texto contiene comas o no es un número puro, no animar
                if (textContent.includes(',') || textContent.includes('K') || textContent.includes('$') || textContent.includes('+')) {
                    // No animar, mantener el texto original
                    return;
                }
                const target = parseInt(textContent);
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                }
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===============================
// PERFORMANCE Y OPTIMIZACIÓN
// ===============================

// Lazy loading para imágenes
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ===============================
// EVENTOS GLOBALES
// ===============================

// Manejo de errores JavaScript
window.addEventListener('error', (e) => {
    console.error('Error capturado:', e.error);
    // Aquí podrías enviar el error a un servicio de monitoreo
});

// Manejo de promesas rechazadas
window.addEventListener('unhandledrejection', (e) => {
    console.error('Promesa rechazada:', e.reason);
    e.preventDefault();
});

// Optimización de scroll
const optimizedScroll = throttle(() => {
    // Aquí van las funciones que se ejecutan en scroll
}, 16);

window.addEventListener('scroll', optimizedScroll);

// Manejo de redimensionamiento de ventana
const optimizedResize = debounce(() => {
    // Recalcular posiciones si es necesario
    hideTooltip();
}, 250);

window.addEventListener('resize', optimizedResize);

// ===============================
// FUNCIONES DE UTILIDAD PARA CASOS DE ESTUDIO
// ===============================

// Expandir casos de estudio (funcionalidad adicional)
function initializeCaseStudyExpansion() {
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach(card => {
        const expandButton = card.querySelector('.case-expand');
        if (expandButton) {
            expandButton.addEventListener('click', (e) => {
                e.stopPropagation();
                // Aquí podrías agregar funcionalidad para expandir el caso
                // Por ejemplo, mostrar más detalles o un modal específico
                console.log('Expandiendo caso de estudio...');
            });
        }
    });
}

// ===============================
// INICIALIZACIÓN FINAL
// ===============================

// Asegurar que todo se inicialice correctamente
document.addEventListener('DOMContentLoaded', () => {
    // Esperar a que todas las imágenes y recursos se carguen
    window.addEventListener('load', () => {
        initializeCounters();
        initializeLazyLoading();
        initializeCaseStudyExpansion();
        
        // Marcar como completamente cargado
        document.body.classList.add('loaded');
    });
});

// ===============================
// SISTEMA DE GALERÍA - DESDE CERO - VERSIÓN SIMPLE
// ===============================

// Función para abrir galería - VERSIÓN SIMPLE
function openGallery(category) {
    console.log('Opening gallery:', category);
    
    // Definir imágenes por categoría
    let images = [];
    if (category === 'social') {
        images = ['galeria1.jpg', 'galeria2.jpg', 'galeria3.jpg', 'galeria4.jpg', 'galeria5.jpg', 'galeria7.jpg', 'galeria8.jpg', 'galeria9.jpg'];
    } else if (category === 'product') {
        images = ['galeria10.png', 'galeria11.png', 'galeria12.png', 'galeria13.png', 'galeria14.png', 'galeria15.png', 'galeria16.png', 'galeria17.png', 'galeria18.png'];
    } else if (category === 'webapp') {
        images = ['app1.png', 'app2.png', 'app3.png', 'app4.png', 'app5.png', 'app6.png', 'app7.png', 'app8.png', 'app9.png', 'app10.png', 'app11.png', 'app12.png'];
    } else if (category === 'ads') {
        images = ['ads1.png', 'ads2.jpg'];
    } else {
        console.error('Category not found');
        return;
    }
    
    // Guardar imágenes actuales para navegación
    currentGalleryImages = images;
    
    // Obtener elementos
    const overlay = document.getElementById('gallery-overlay');
    const grid = document.getElementById('gallery-grid');
    
    if (!overlay || !grid) {
        console.error('Gallery elements not found');
        return;
    }
    
    // Limpiar grid
    grid.innerHTML = '';
    
    // Crear thumbnails
    images.forEach((imageName, index) => {
        const div = document.createElement('div');
        div.className = 'gallery-grid-item';
        div.innerHTML = `<img src="${imageName}" alt="Image ${index + 1}" style="width:100%; height:100%; object-fit:cover;">`;
        
        // Click para abrir imagen grande
        div.onclick = function() {
            openFullImage(imageName, index + 1, images.length);
        };
        
        grid.appendChild(div);
    });
    
    // Guardar posición del scroll antes de abrir
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Mostrar overlay
    overlay.classList.add('active');
    document.body.classList.add('gallery-open');
    document.body.style.overflow = 'hidden';
}

// Variables globales para la navegación
let currentGalleryImages = [];
let currentImageIndex = 0;
let scrollPosition = 0;

// Función para abrir imagen completa
function openFullImage(imageSrc, current, total) {
    const fullscreen = document.getElementById('gallery-fullscreen');
    const imagesContainer = document.getElementById('gallery-images');
    const currentSpan = document.getElementById('gallery-current');
    const totalSpan = document.getElementById('gallery-total');
    
    // Actualizar índice actual
    currentImageIndex = current - 1; // Convertir a índice base 0
    
    if (imagesContainer) {
        imagesContainer.innerHTML = `<img src="${imageSrc}" alt="Full Image" class="gallery-image active" style="max-width:100%; max-height:100%; object-fit:contain;">`;
    }
    
    if (currentSpan) currentSpan.textContent = current;
    if (totalSpan) totalSpan.textContent = total;
    
    if (fullscreen) {
        fullscreen.style.display = 'block';
    }
}

// Función para cerrar galería
function closeGallery() {
    const overlay = document.getElementById('gallery-overlay');
    const fullscreen = document.getElementById('gallery-fullscreen');
    
    if (overlay) {
        overlay.classList.remove('active');
    }
    
    if (fullscreen) {
        fullscreen.style.display = 'none';
    }
    
    document.body.classList.remove('gallery-open');
    document.body.style.overflow = '';
    
    // Restaurar posición del scroll
    window.scrollTo(0, scrollPosition);
    
    console.log('Gallery closed');
}

// Función para regresar al grid
function backToGrid() {
    const fullscreen = document.getElementById('gallery-fullscreen');
    if (fullscreen) {
        fullscreen.style.display = 'none';
    }
}

// Funciones de navegación de la galería
function nextImage() {
    if (currentGalleryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
    const nextImageSrc = currentGalleryImages[currentImageIndex];
    
    // Actualizar imagen
    const imagesContainer = document.getElementById('gallery-images');
    const currentSpan = document.getElementById('gallery-current');
    
    if (imagesContainer) {
        imagesContainer.innerHTML = `<img src="${nextImageSrc}" alt="Full Image" class="gallery-image active" style="max-width:100%; max-height:100%; object-fit:contain;">`;
    }
    
    if (currentSpan) {
        currentSpan.textContent = currentImageIndex + 1;
    }
    
    console.log('Next image:', nextImageSrc);
}

function prevImage() {
    if (currentGalleryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    const prevImageSrc = currentGalleryImages[currentImageIndex];
    
    // Actualizar imagen
    const imagesContainer = document.getElementById('gallery-images');
    const currentSpan = document.getElementById('gallery-current');
    
    if (imagesContainer) {
        imagesContainer.innerHTML = `<img src="${prevImageSrc}" alt="Full Image" class="gallery-image active" style="max-width:100%; max-height:100%; object-fit:contain;">`;
    }
    
    if (currentSpan) {
        currentSpan.textContent = currentImageIndex + 1;
    }
    
    console.log('Previous image:', prevImageSrc);
}

// ===============================
// FUNCIONES EXPUESTAS GLOBALMENTE
// ===============================

// Funciones que pueden ser llamadas desde HTML
window.scrollToSection = scrollToSection;
window.showModal = showModal;
window.hideModal = hideModal;
window.openGallery = openGallery;
window.closeGallery = closeGallery;
window.nextImage = nextImage;
window.prevImage = prevImage;
window.openFullImage = openFullImage;
window.backToGrid = backToGrid; 

// ===============================
// TILT 3D + MICRO-INTERACCIONES 🎯
// ===============================

function initializeTilt3D() {
    const tiltElements = document.querySelectorAll('.result-card, .case-card');
    
    tiltElements.forEach(element => {
        // Agregar borde interactivo
        const border = document.createElement('div');
        border.className = 'interactive-border';
        element.appendChild(border);
        
        // Efecto Tilt para desktop
        if (!isMobile()) {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(20px)
                `;
                
                // Crear micro-partículas ocasionalmente
                if (Math.random() > 0.95) {
                    createMicroParticle(x, y, element);
                }
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        }
        
        // Efecto ripple al hacer click (móvil y desktop)
        element.addEventListener('click', (e) => {
            createRippleEffect(e, element);
            createInteractionParticles(e, element);
        });
        
        // Efecto táctil para móvil
        if (isMobile()) {
            element.addEventListener('touchstart', (e) => {
                element.style.transform = 'perspective(1000px) scale(0.98) rotateX(2deg)';
            });
            
            element.addEventListener('touchend', () => {
                element.style.transform = 'perspective(1000px) scale(1) rotateX(0deg)';
            });
        }
    });
}

function createMicroParticle(x, y, container) {
    const particle = document.createElement('div');
    particle.className = 'micro-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    container.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 3000);
}

function createRippleEffect(e, element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function createInteractionParticles(e, element) {
    const rect = element.getBoundingClientRect();
    const centerX = e.clientX - rect.left;
    const centerY = e.clientY - rect.top;
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'interaction-particle';
            
            const angle = (i * 60) * Math.PI / 180;
            const distance = 20 + Math.random() * 30;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            element.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }, i * 50);
    }
}

// ===============================
// NÚMEROS MATRIX SUTILES 🔢
// ===============================

function initializeMatrixRain() {
    // Solo en desktop para no sobrecargar móvil
    if (isMobile()) return;
    
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-rain';
    document.body.appendChild(matrixContainer);
    
    // Crear columnas de números
    const numberOfColumns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < numberOfColumns; i++) {
        if (Math.random() > 0.7) { // Solo 30% de las columnas tendrán números
            createMatrixColumn(matrixContainer, i * 20);
        }
    }
}

function createMatrixColumn(container, leftPosition) {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.style.left = leftPosition + 'px';
    
    // Generar números y caracteres
    const characters = '01';
    const symbols = '{}[]()<>/\\|';
    const numbers = '0123456789ABCDEF';
    
    let content = '';
    const lineCount = Math.floor(Math.random() * 15) + 10;
    
    for (let i = 0; i < lineCount; i++) {
        let line = '';
        const lineLength = Math.floor(Math.random() * 3) + 1;
        
        for (let j = 0; j < lineLength; j++) {
            const rand = Math.random();
            if (rand > 0.7) {
                line += numbers[Math.floor(Math.random() * numbers.length)];
            } else if (rand > 0.4) {
                line += characters[Math.floor(Math.random() * characters.length)];
            } else {
                line += symbols[Math.floor(Math.random() * symbols.length)];
            }
        }
        content += line + '\n';
    }
    
    column.textContent = content;
    container.appendChild(column);
    
    // Reiniciar la animación aleatoriamente
    setTimeout(() => {
        if (column.parentNode) {
            column.parentNode.removeChild(column);
            // Crear nueva columna después de un delay aleatorio
            setTimeout(() => {
                createMatrixColumn(container, leftPosition);
            }, Math.random() * 10000 + 5000);
        }
    }, (Math.random() * 15000) + 10000);
}

// ===============================
// SKILLS 3D ENHANCEMENT
// ===============================

function enhanceSkills3D() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        // Delay de aparición escalonado
        item.style.animationDelay = (index * 0.1) + 's';
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        // Observador para animación de entrada
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'cardEntrance 0.6s ease-out forwards';
                }
            });
        });
        
        observer.observe(item);
        
        // Efectos de hover para skills
        if (!isMobile()) {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'perspective(500px) rotateY(10deg) scale(1.05)';
                
                // Crear partículas en las esquinas
                createSkillParticles(item);
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'perspective(500px) rotateY(0deg) scale(1)';
            });
        }
    });
}

function createSkillParticles(element) {
    const rect = element.getBoundingClientRect();
    const positions = [
        { x: 5, y: 5 },
        { x: rect.width - 5, y: 5 },
        { x: 5, y: rect.height - 5 },
        { x: rect.width - 5, y: rect.height - 5 }
    ];
    
    positions.forEach((pos, index) => {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'micro-particle';
            particle.style.left = pos.x + 'px';
            particle.style.top = pos.y + 'px';
            element.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 3000);
        }, index * 100);
    });
}

// ===============================
// UTILIDADES Y DETECCIÓN
// ===============================

function isMobile() {
    return window.innerWidth <= 768 || 'ontouchstart' in window;
}

// ===============================
// THEME TOGGLE ENHANCEMENT
// ===============================

function enhanceThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            // Efecto de explosión suave
            createThemeExplosion(e);
        });
    }
}

function createThemeExplosion(e) {
    const rect = e.target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                left: ${centerX}px;
                top: ${centerY}px;
                animation: themeParticleExplode 1s ease-out forwards;
            `;
            
            const angle = (i * 30) * Math.PI / 180;
            const distance = 40;
            particle.style.setProperty('--angle', angle + 'rad');
            particle.style.setProperty('--distance', distance + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }, i * 30);
    }
}

// CSS para la animación de partículas del theme
const themeParticleStyle = document.createElement('style');
themeParticleStyle.textContent = `
    @keyframes themeParticleExplode {
        0% {
            transform: scale(0) translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: scale(1) translate(
                calc(cos(var(--angle)) * var(--distance)), 
                calc(sin(var(--angle)) * var(--distance))
            );
            opacity: 0;
        }
    }
`;
document.head.appendChild(themeParticleStyle);

// ===============================
// INICIALIZACIÓN DE EFECTOS 3D
// ===============================

function initializeAdvancedEffects() {
    initializeTilt3D();
    initializeMatrixRain();
    enhanceSkills3D();
    enhanceThemeToggle();
    
    console.log('🎯 Tilt 3D + Matrix effects initialized!');
}





