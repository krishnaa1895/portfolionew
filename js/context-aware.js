// Context-Aware Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark/light theme toggle based on time of day
    initThemeToggle();
    
    // Initialize time-based greeting in assistant
    initTimeBasedGreeting();
    
    // Initialize location-based features (if user allows)
    initLocationAwareness();
});

// Theme Toggle based on time of day
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    const hour = new Date().getHours();
    
    // Default theme based on time of day
    let isDarkTheme = false;
    
    // If it's night time (between 7PM and 7AM), set dark theme
    if (hour >= 19 || hour < 7) {
        document.body.classList.add('dark-theme');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        isDarkTheme = true;
    }
    
    // Check for user preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        isDarkTheme = true;
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
        isDarkTheme = false;
    }
    
    // Toggle theme when button is clicked
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            isDarkTheme = !isDarkTheme;
            
            if (isDarkTheme) {
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }
    
    // Show different accent colors based on screen size (responsive design)
    updateAccentColorByDevice();
    window.addEventListener('resize', updateAccentColorByDevice);
}

// Update accent color based on device size
function updateAccentColorByDevice() {
    const root = document.documentElement;
    
    if (window.innerWidth < 768) {
        // Mobile devices
        root.style.setProperty('--accent-color', '#ff6b6b');
    } else if (window.innerWidth < 1200) {
        // Tablets
        root.style.setProperty('--accent-color', '#5f27cd');
    } else {
        // Desktops
        root.style.setProperty('--accent-color', '#0571d3');
    }
}

// Time-based greeting in assistant
function initTimeBasedGreeting() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const hour = new Date().getHours();
    let greeting = "Hi there! I'm Krishna's portfolio assistant.";
    
    if (hour >= 5 && hour < 12) {
        greeting = "Good morning! I'm Krishna's portfolio assistant.";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Good afternoon! I'm Krishna's portfolio assistant.";
    } else {
        greeting = "Good evening! I'm Krishna's portfolio assistant.";
    }
    
    // Update the first message with the time-based greeting
    const firstMessage = chatMessages.querySelector('.message.assistant .message-content');
    if (firstMessage) {
        firstMessage.innerHTML = `${greeting} How can I help you navigate this site?`;
    }
}

// Location Awareness
function initLocationAwareness() {
    // Check if browser supports geolocation
    if (navigator.geolocation) {
        // Ask for permission to get user's location
        navigator.geolocation.getCurrentPosition(
            // Success callback
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // Simple location detection (northern/southern hemisphere)
                const isNorthernHemisphere = latitude > 0;
                
                // Adjust UI based on hemisphere
                adjustUIForLocation(isNorthernHemisphere);
                
                // Try to get city name through reverse geocoding
                getCityName(latitude, longitude);
            },
            // Error callback - provide default experience
            error => {
                console.log('Geolocation error or permission denied:', error);
                // Fall back to default UI
                adjustUIForLocation(true);
            },
            // Options
            {
                timeout: 10000,
                maximumAge: 600000 // Cache for 10 minutes
            }
        );
    } else {
        // Browser doesn't support geolocation
        console.log('Geolocation is not supported by this browser.');
        // Fall back to default UI
        adjustUIForLocation(true);
    }
}

// Adjust UI based on hemisphere
function adjustUIForLocation(isNorthernHemisphere) {
    // Example: adjust background color gradient direction based on hemisphere
    const firstSection = document.querySelector('.first');
    if (firstSection) {
        if (isNorthernHemisphere) {
            firstSection.style.background = 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(1,24,78,1) 35%, rgba(0,52,187,1) 100%)';
        } else {
            firstSection.style.background = 'linear-gradient(270deg, rgba(2,0,36,1) 0%, rgba(1,24,78,1) 35%, rgba(0,52,187,1) 100%)';
        }
    }
}

// Get city name from coordinates
function getCityName(latitude, longitude) {
    // In a real implementation, you would use a geocoding service
    // For this demo, we'll simulate it
    
    // Update assistant message if location is determined
    const assistantMessage = document.querySelector('.message.assistant .message-content');
    if (assistantMessage) {
        // This is a placeholder - in a real app you'd use reverse geocoding
        assistantMessage.innerHTML += `<br><small>It looks like you're viewing from somewhere in the ${latitude > 0 ? 'Northern' : 'Southern'} Hemisphere.</small>`;
    }
    
    // Optionally create a location badge
    const locationBadge = document.createElement('div');
    locationBadge.className = 'location-badge';
    locationBadge.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${latitude > 0 ? 'Northern' : 'Southern'} Hemisphere`;
    locationBadge.style.position = 'fixed';
    locationBadge.style.top = '170px';
    locationBadge.style.right = '20px';
    locationBadge.style.backgroundColor = 'var(--primary-color)';
    locationBadge.style.color = 'white';
    locationBadge.style.padding = '8px 15px';
    locationBadge.style.borderRadius = '20px';
    locationBadge.style.fontSize = '0.8rem';
    locationBadge.style.zIndex = '100';
    locationBadge.style.boxShadow = 'var(--box-shadow)';
    
    document.body.appendChild(locationBadge);
}