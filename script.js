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

