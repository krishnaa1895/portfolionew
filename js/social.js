// Social Interaction Features
document.addEventListener('DOMContentLoaded', function() {
    initSocialPresence();
    initFeedbackSubmission();
});

// Initialize social presence indicator
function initSocialPresence() {
    const socialPresence = document.getElementById('socialPresence');
    const visitorCountElement = document.getElementById('visitorCount');
    const recentVisitorsElement = document.querySelector('.recent-visitors');
    
    if (!socialPresence || !visitorCountElement || !recentVisitorsElement) return;
    
    // Visitor names for simulation
    const visitorNames = [
        'John', 'Sarah', 'Michael', 'Emma', 'David', 'Sophia', 'Alex', 'Olivia',
        'James', 'Ava', 'William', 'Isabella', 'Benjamin', 'Mia', 'Lucas', 'Charlotte'
    ];
    
    // Page sections for simulation
    const pageSections = [
        'projects', 'about', 'skills', 'contact'
    ];
    
    // Actions for simulation
    const actions = [
        'viewed', 'checked out', 'was impressed by', 'is reading about'
    ];
    
    // Simulate real-time visitors with local storage
    function updateVisitorCount() {
        // Get current count from localStorage or initialize
        let storedCount = localStorage.getItem('visitorCount');
        let count = storedCount ? parseInt(storedCount) : 0;
        
        // Check if this is the first visit or a return within 30 minutes
        const lastVisit = localStorage.getItem('lastVisit');
        const now = Date.now();
        
        if (!lastVisit || (now - parseInt(lastVisit) > 30 * 60 * 1000)) {
            // New visit (30+ minutes since last)
            count += 1 + Math.floor(Math.random() * 3); // Add 1-3 visitors
            localStorage.setItem('visitorCount', count);
            localStorage.setItem('lastVisit', now);
        }
        
        // Ensure minimum of 3 visitors for engagement
        count = Math.max(count, 3);
        
        // Update the display
        if (visitorCountElement) {
            visitorCountElement.textContent = count;
        }
        
        return count;
    }
    
    // Generate random visitor activity
    function generateVisitorActivity(count) {
        // Clear existing activities
        recentVisitorsElement.innerHTML = '';
        
        // Create a set of used names to avoid duplicates
        const usedNames = new Set();
        
        // Generate 1-3 random activities
        const activityCount = Math.min(Math.floor(Math.random() * 3) + 1, count - 1);
        
        for (let i = 0; i < activityCount; i++) {
            let name;
            // Ensure we don't use the same name twice
            do {
                name = visitorNames[Math.floor(Math.random() * visitorNames.length)];
            } while (usedNames.has(name));
            usedNames.add(name);
            
            const section = pageSections[Math.floor(Math.random() * pageSections.length)];
            const action = actions[Math.floor(Math.random() * actions.length)];
            
            const activity = document.createElement('div');
            activity.className = 'visitor';
            activity.textContent = `${name} ${action} your ${section}`;
            
            recentVisitorsElement.appendChild(activity);
        }
    }
    
    // Initialize visitors
    const visitorCount = updateVisitorCount();
    generateVisitorActivity(visitorCount);
    
    // Update periodically to simulate real-time activity
    setInterval(() => {
        const count = updateVisitorCount();
        
        // 50% chance to update visitor activity each interval
        if (Math.random() > 0.5) {
            generateVisitorActivity(count);
        }
    }, 20000); // Every 20 seconds
    
    // Add new random visitor notification occasionally
    setInterval(() => {
        // 30% chance to show a new visitor notification
        if (Math.random() > 0.7) {
            const name = visitorNames[Math.floor(Math.random() * visitorNames.length)];
            
            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'visitor-notification';
            notification.innerHTML = `
                <i class="fas fa-user-plus"></i> ${name} just joined!
            `;
            
            // Style the notification
            notification.style.position = 'fixed';
            notification.style.bottom = '90px';
            notification.style.left = '20px';
            notification.style.backgroundColor = 'var(--primary-color)';
            notification.style.color = 'white';
            notification.style.padding = '10px 15px';
            notification.style.borderRadius = '10px';
            notification.style.boxShadow = 'var(--box-shadow)';
            notification.style.zIndex = '1000';
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            notification.style.transition = 'opacity 0.3s, transform 0.3s';
            
            // Add to document
            document.body.appendChild(notification);
            
            // Show with animation
            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateY(0)';
            }, 100);
            
            // Remove after 4 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 4000);
            
            // Update visitor count
            const currentCount = parseInt(visitorCountElement.textContent);
            visitorCountElement.textContent = currentCount + 1;
            localStorage.setItem('visitorCount', currentCount + 1);
        }
    }, 45000); // Every 45 seconds
}

// Initialize feedback form submission
function initFeedbackSubmission() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Simulate network delay
                setTimeout(() => {
                    // Success - save to localStorage to simulate database
                    const name = contactForm.querySelector('#name').value;
                    const email = contactForm.querySelector('#email').value;
                    const message = contactForm.querySelector('#message').value;
                    
                    // Save to localStorage
                    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
                    feedbacks.push({
                        name,
                        email,
                        message,
                        timestamp: Date.now()
                    });
                    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
                    
                    // Show success message
                    contactForm.reset();
                    submitBtn.textContent = 'Message Sent!';
                    
                    // Show collaborative notification
                    showCollaborativeNotification(name);
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Send Message';
                    }, 3000);
                }, 1500);
            }
        });
    }
}

// Show notification when someone submits feedback
function showCollaborativeNotification(name) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'social-notification';
    notification.innerHTML = `
        <i class="fas fa-comment-dots"></i> ${name} just sent a message to Krishna!
    `;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '80px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--accent-color)';
    notification.style.color = 'white';
    notification.style.padding = '10px 15px';
    notification.style.borderRadius = '10px';
    notification.style.boxShadow = 'var(--box-shadow)';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(20px)';
    notification.style.transition = 'opacity 0.3s, transform 0.3s';
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
    
    // Update visitor count to simulate more engagement
    const visitorCountElement = document.getElementById('visitorCount');
    if (visitorCountElement) {
        const currentCount = parseInt(visitorCountElement.textContent);
        visitorCountElement.textContent = currentCount + 1;
    }
}

// Simulate testimonial submission and display
function initTestimonialSystem() {
    // This functionality is removed as per user request to remove testimonials section
    // But the code is kept here for reference or future implementation
}