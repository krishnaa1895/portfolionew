// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactive elements
    initNavbarScroll();
    initProfileImageRotation();
    initProjectCardEffects();
    initSkillsAnimation();
    initSmoothScrolling();
    initFormValidation();
    
    // Audio controls - Multimodal Interaction (Auditory)
    initAudioControls();
    
    // Create sounds directory and audio file if it doesn't exist
    createAudioFile();
});

// Create Audio File (since we don't have an actual audio file to work with)
function createAudioFile() {
    // Check if sounds directory exists, create if not
    const soundsDir = 'sounds';
    
    // This is a message for the user to create the directory and file
    console.log('Please create a "sounds" directory in your project root and add an "ambient.mp3" file for background audio.');
}

// Fixed Navbar on Scroll
function initNavbarScroll() {
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 3D Rotation Effect for Profile Image - Multimodal Interaction (Tactile/Gesture)
function initProfileImageRotation() {
    const profileImage = document.getElementById('profileImage');
    if (!profileImage) return;
    
    let isRotating = false;
    let startX, startY;
    let rotateX = 0, rotateY = 0;
    
    // Touch events for mobile
    profileImage.addEventListener('touchstart', function(e) {
        isRotating = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        e.preventDefault();
    });
    
    profileImage.addEventListener('touchmove', function(e) {
        if (!isRotating) return;
        
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;
        
        rotateY = deltaX * 0.5;  // Horizontal movement controls Y rotation
        rotateX = -deltaY * 0.5; // Vertical movement controls X rotation
        
        profileImage.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        e.preventDefault();
    });
    
    // Mouse events for desktop
    profileImage.addEventListener('mousedown', function(e) {
        isRotating = true;
        startX = e.clientX;
        startY = e.clientY;
        e.preventDefault();
    });
    
    window.addEventListener('mousemove', function(e) {
        if (!isRotating) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        rotateY = deltaX * 0.5;
        rotateX = -deltaY * 0.5;
        
        profileImage.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });
    
    window.addEventListener('mouseup', function() {
        isRotating = false;
        
        // Animate back to original position
        profileImage.style.transition = 'transform 0.5s ease-out';
        profileImage.style.transform = 'rotateY(0deg) rotateX(0deg)';
        
        // Remove transition after animation completes
        setTimeout(() => {
            profileImage.style.transition = '';
        }, 500);
    });
    
    window.addEventListener('touchend', function() {
        isRotating = false;
        
        // Animate back to original position
        profileImage.style.transition = 'transform 0.5s ease-out';
        profileImage.style.transform = 'rotateY(0deg) rotateX(0deg)';
        
        // Remove transition after animation completes
        setTimeout(() => {
            profileImage.style.transition = '';
        }, 500);
    });
}

// Project Cards 3D Effect - Mixed Reality Integration
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Initialize QR code tooltips
        const qrCode = card.querySelector('.project-qr');
        if (qrCode) {
            qrCode.addEventListener('mouseenter', () => {
                const tooltip = qrCode.querySelector('.qr-tooltip');
                if (tooltip) tooltip.style.opacity = '1';
            });
            
            qrCode.addEventListener('mouseleave', () => {
                const tooltip = qrCode.querySelector('.qr-tooltip');
                if (tooltip) tooltip.style.opacity = '0';
            });
        }
        
        // Add 3D tilt effect
        card.addEventListener('mousemove', e => {
            if (window.innerWidth > 768) { // Only on desktop
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                // Calculate rotation based on mouse position
                const rotateY = 10 * (mouseX / (cardRect.width / 2));
                const rotateX = -10 * (mouseY / (cardRect.height / 2));
                
                // Apply transformation to card inner
                const cardInner = card.querySelector('.project-card-inner');
                if (cardInner && !card.classList.contains('flipped')) {
                    cardInner.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
                }
            }
        });
        
        // Reset card position when mouse leaves
        card.addEventListener('mouseleave', () => {
            const cardInner = card.querySelector('.project-card-inner');
            if (cardInner) {
                cardInner.style.transition = 'transform 0.5s ease-out';
                cardInner.style.transform = '';
                
                setTimeout(() => {
                    cardInner.style.transition = 'transform 0.6s';
                }, 500);
            }
        });
    });
}

// Animate skill bars when they come into view
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const barRect = bar.getBoundingClientRect();
            
            // Check if the skill bar is in viewport
            if (barRect.top < window.innerHeight && barRect.bottom >= 0) {
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    };
    
    // Run once on page load
    animateSkills();
    
    // Run on scroll
    window.addEventListener('scroll', animateSkills);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.submit-btn');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerText = 'Sending...';
                    
                    // Simulate success after 1.5 seconds
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.innerText = 'Message Sent!';
                        
                        // Reset button after 3 seconds
                        setTimeout(() => {
                            submitBtn.disabled = false;
                            submitBtn.innerText = 'Send Message';
                        }, 3000);
                    }, 1500);
                }
            }
        });
    }
}

// Audio Controls - Multimodal Interaction (Auditory)
function initAudioControls() {
    const audioBtn = document.getElementById('toggleAudio');
    const bgMusic = document.getElementById('bgMusic');
    
    if (audioBtn && bgMusic) {
        audioBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (bgMusic.paused) {
                bgMusic.volume = 0.2; // Set volume to 20%
                bgMusic.play().catch(() => {
                    // Handle autoplay policy errors
                    console.log('Autoplay was prevented. Please interact with the document first.');
                });
                icon.classList.replace('fa-volume-mute', 'fa-volume-up');
            } else {
                bgMusic.pause();
                icon.classList.replace('fa-volume-up', 'fa-volume-mute');
            }
        });
    }
}