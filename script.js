// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu mobile en cliquant sur un lien
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navigation smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation de la navbar au scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(5, 5, 5, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animation des cartes produits au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les cartes produits
    document.querySelectorAll('.product-card, .service-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Boutons d'achat
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animation de clic
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);

            // Simulation d'achat (à remplacer par votre système de paiement)
            showPurchaseModal(this.closest('.product-card').querySelector('h3').textContent);
        });
    });

    // Formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            // Validation basique
            if (!name || !email || !message) {
                showNotification('Veuillez remplir tous les champs', 'error');
                return;
            }

            // Simulation d'envoi
            showNotification('Message envoyé avec succès !', 'success');
            this.reset();
        });
    }

    // Effet de parallaxe sur le hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector('.grid-overlay');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Animation des compteurs (si vous voulez ajouter des statistiques)
    animateCounters();

    // Effet de hover sur les cartes
    document.querySelectorAll('.product-card, .service-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Fonction pour afficher une modal d'achat
function showPurchaseModal(productName) {
    // Création de la modal
    const modal = document.createElement('div');
    modal.className = 'purchase-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Achat de ${productName}</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>Vous êtes sur le point d'acheter : <strong>${productName}</strong></p>
                <div class="payment-options">
                    <h4>Options de paiement :</h4>
                    <div class="payment-option">
                        <input type="radio" id="paypal" name="payment" value="paypal" checked>
                        <label for="paypal">PayPal</label>
                    </div>
                    <div class="payment-option">
                        <input type="radio" id="crypto" name="payment" value="crypto">
                        <label for="crypto">Cryptomonnaie</label>
                    </div>
                    <div class="payment-option">
                        <input type="radio" id="card" name="payment" value="card">
                        <label for="card">Carte bancaire</label>
                    </div>
                </div>
                <button class="confirm-purchase">Confirmer l'achat</button>
            </div>
        </div>
    `;

    // Styles de la modal
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .purchase-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: var(--card-bg);
            border: 1px solid var(--primary-color);
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            position: relative;
            animation: slideIn 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border-color);
        }
        
        .modal-header h3 {
            color: var(--primary-color);
            margin: 0;
        }
        
        .close-modal {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 2rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .close-modal:hover {
            background: var(--border-color);
            color: var(--text-primary);
        }
        
        .payment-options {
            margin: 1.5rem 0;
        }
        
        .payment-options h4 {
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        
        .payment-option {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 0.5rem;
            padding: 0.5rem;
            border-radius: 8px;
            transition: background 0.3s ease;
        }
        
        .payment-option:hover {
            background: rgba(255, 255, 255, 0.05);
        }
        
        .payment-option input[type="radio"] {
            accent-color: var(--primary-color);
        }
        
        .payment-option label {
            color: var(--text-primary);
            cursor: pointer;
        }
        
        .confirm-purchase {
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            margin-top: 1rem;
        }
        
        .confirm-purchase:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px var(--glow-color);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;

    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);

    // Fermeture de la modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });

    // Fermeture en cliquant à l'extérieur
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Confirmation d'achat
    modal.querySelector('.confirm-purchase').addEventListener('click', () => {
        const selectedPayment = modal.querySelector('input[name="payment"]:checked').value;
        showNotification(`Achat confirmé ! Redirection vers ${selectedPayment}...`, 'success');
        setTimeout(() => {
            modal.remove();
        }, 2000);
    });
}

// Fonction pour afficher des notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Styles des notifications
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10001;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        }
        
        .notification.success {
            background: linear-gradient(45deg, #00d4ff, #00ff88);
        }
        
        .notification.error {
            background: linear-gradient(45deg, #ff006e, #ff6b6b);
        }
        
        .notification.info {
            background: linear-gradient(45deg, #00d4ff, #0066ff);
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;

    document.head.appendChild(notificationStyles);
    document.body.appendChild(notification);

    // Suppression automatique après 5 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);

    // Ajout de l'animation de sortie
    const slideOutStyles = document.createElement('style');
    slideOutStyles.textContent = `
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(slideOutStyles);
}

// Fonction pour animer les compteurs
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000; // 2 secondes
                const increment = finalValue / (duration / 16); // 60 FPS
                let currentValue = 0;

                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        currentValue = finalValue;
                        clearInterval(timer);
                    }
                    target.textContent = Math.floor(currentValue).toLocaleString();
                }, 16);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Effet de particules en arrière-plan (optionnel)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: 0.6;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;

        particlesContainer.appendChild(particle);
    }

    // Styles des particules
    const particleStyles = document.createElement('style');
    particleStyles.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(0px) translateX(0px);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100vh) translateX(100px);
                opacity: 0;
            }
        }
    `;

    document.head.appendChild(particleStyles);
    document.body.appendChild(particlesContainer);
}

// Initialisation des particules (décommentez pour activer)
// createParticles();

// Effet de typing sur le titre principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Animation de loading pour les boutons
function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
    button.disabled = true;
    
    return function() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    showNotification('Une erreur est survenue. Veuillez rafraîchir la page.', 'error');
});

// Optimisation des performances
window.addEventListener('load', function() {
    // Lazy loading des images (si ajoutées plus tard)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});
