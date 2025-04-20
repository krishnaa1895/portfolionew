// Virtual Assistant (Intelligent Agent / Avatar Integration)
document.addEventListener('DOMContentLoaded', function() {
    initAssistant();
});

function initAssistant() {
    const assistantIcon = document.getElementById('assistantIcon');
    const assistantChat = document.getElementById('assistantChat');
    const closeAssistant = document.getElementById('closeAssistant');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    
    // Assistant personality traits
    const assistantPersonality = {
        mood: 'helpful', // helpful, excited, curious, professional
        expressiveness: 0.8, // 0-1 scale, how expressive it is
        verbosity: 0.6,  // 0-1 scale, how wordy it is
        emoji: true,     // whether it uses emoji
    };
    
    // Open assistant chat when icon is clicked
    if (assistantIcon) {
        assistantIcon.addEventListener('click', function() {
            if (assistantChat) {
                assistantChat.style.display = 'flex';
                
                // Greet user based on visit count (stored in local storage)
                const visitCount = localStorage.getItem('visitCount') || 0;
                if (visitCount == 0) {
                    // First time visitor
                    addAssistantMessage("Welcome to Krishna's portfolio! I'm here to help you navigate. Feel free to ask me anything about Krishna's work or skills. 😊");
                } else {
                    // Returning visitor
                    addAssistantMessage("Welcome back! Nice to see you again. Can I help you find anything specific today?");
                }
                
                // Increment visit count
                localStorage.setItem('visitCount', parseInt(visitCount) + 1);
                
                // Focus the input field
                if (userInput) userInput.focus();
            }
        });
    }
    
    // Close assistant chat when close button is clicked
    if (closeAssistant) {
        closeAssistant.addEventListener('click', function() {
            if (assistantChat) {
                assistantChat.style.display = 'none';
            }
        });
    }
    
    // Send message when button is clicked or Enter key is pressed
    if (sendMessage && userInput) {
        sendMessage.addEventListener('click', function() {
            sendUserMessage();
        });
        
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });
    }
    
    // Function to send user message
    function sendUserMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        addUserMessage(message);
        
        // Clear input field
        userInput.value = '';
        
        // Process message and generate response
        processUserMessage(message);
    }
    
    // Add user message to chat
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message user';
        messageElement.innerHTML = `
            <div class="message-content">
                ${message}
            </div>
        `;
        
        if (chatMessages) chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Add assistant message to chat
    function addAssistantMessage(message) {
        // Simulate typing delay for realism
        setTimeout(() => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message assistant';
            messageElement.innerHTML = `
                <div class="message-content">
                    ${message}
                </div>
            `;
            
            if (chatMessages) chatMessages.appendChild(messageElement);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 600);
    }
    
    // Process user message and generate assistant response
    function processUserMessage(message) {
        // Convert message to lowercase for easier matching
        const lowerMessage = message.toLowerCase();
        
        // Check for keywords and generate appropriate response
        if (containsAny(lowerMessage, ['hi', 'hello', 'hey', 'greetings'])) {
            // Greeting
            respondBasedOnPersonality('greeting');
        } else if (containsAny(lowerMessage, ['who', 'what']) && containsAny(lowerMessage, ['krishna', 'you'])) {
            // About Krishna or the assistant
            if (containsAny(lowerMessage, ['you', 'assistant', 'bot'])) {
                respondBasedOnPersonality('about-assistant');
            } else {
                respondBasedOnPersonality('about-krishna');
            }
        } else if (containsAny(lowerMessage, ['skill', 'expertise', 'good at', 'know'])) {
            // Skills
            respondBasedOnPersonality('skills');
        } else if (containsAny(lowerMessage, ['project', 'work', 'portfolio'])) {
            // Projects
            respondBasedOnPersonality('projects');
        } else if (containsAny(lowerMessage, ['contact', 'email', 'reach', 'message'])) {
            // Contact
            respondBasedOnPersonality('contact');
        } else if (containsAny(lowerMessage, ['education', 'study', 'college', 'school', 'university'])) {
            // Education
            respondBasedOnPersonality('education');
        } else if (containsAny(lowerMessage, ['navigate', 'find', 'where', 'show'])) {
            // Navigation
            respondBasedOnPersonality('navigation');
        } else if (containsAny(lowerMessage, ['thank', 'thanks', 'thx', 'appreciate'])) {
            // Thanks
            respondBasedOnPersonality('thanks');
        } else if (containsAny(lowerMessage, ['dark', 'light', 'theme', 'mode', 'color'])) {
            // Theme question
            respondBasedOnPersonality('theme');
        } else {
            // Default response for unknown queries
            respondBasedOnPersonality('unknown');
        }
    }
    
    // Check if message contains any of the keywords
    function containsAny(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }
    
    // Generate response based on assistant personality
    function respondBasedOnPersonality(responseType) {
        let response = '';
        
        // Add emoji based on personality and response type
        function getEmoji(responseType) {
            if (!assistantPersonality.emoji) return '';
            
            const emojis = {
                'greeting': ['😊', '👋', '✨'],
                'about-assistant': ['🤖', '💁‍♂️', '🔍'],
                'about-krishna': ['👨‍💻', '🎓', '🌟'],
                'skills': ['💪', '🚀', '🧠'],
                'projects': ['📂', '🏗️', '🖥️'],
                'contact': ['📧', '📱', '📬'],
                'education': ['🎓', '📚', '🏫'],
                'navigation': ['🧭', '🔍', '👆'],
                'thanks': ['😊', '❤️', '🙏'],
                'theme': ['🌓', '🎨', '✨'],
                'unknown': ['🤔', '❓', '💭']
            };
            
            const options = emojis[responseType] || emojis['unknown'];
            return options[Math.floor(Math.random() * options.length)] + ' ';
        }
        
        // Responses based on type
        switch(responseType) {
            case 'greeting':
                response = `${getEmoji('greeting')}Hello! How can I help you with Krishna's portfolio today?`;
                break;
                
            case 'about-assistant':
                response = `${getEmoji('about-assistant')}I'm Krishna's portfolio assistant. I'm here to help you learn more about Krishna, his skills, projects, and how to get in touch with him.`;
                break;
                
            case 'about-krishna':
                response = `${getEmoji('about-krishna')}Krishna is a Computer Science and Design student at IIIT Delhi. He's passionate about problem solving and learning new skills. Beyond academics, he enjoys football and mixed-martial arts.`;
                break;
                
            case 'skills':
                response = `${getEmoji('skills')}Krishna has experience with HTML, CSS, JavaScript, and Data Structures & Algorithms. He combines technical skills with design thinking to create effective solutions.`;
                break;
                
            case 'projects':
                response = `${getEmoji('projects')}Krishna has worked on several projects including interactive design systems, data visualization apps, and mobile prototypes. You can find them in the Projects section. Try hovering over the project cards for a 3D effect!`;
                break;
                
            case 'contact':
                response = `${getEmoji('contact')}You can reach Krishna via email at sree23533@iiitd.ac.in or through LinkedIn. There's also a contact form at the bottom of this page.`;
                break;
                
            case 'education':
                response = `${getEmoji('education')}Krishna is pursuing a Bachelor of Technology in Computer Science and Design at IIIT Delhi, which he started in 2023.`;
                break;
                
            case 'navigation':
                response = `${getEmoji('navigation')}You can navigate through different sections using the menu at the top. There's Home, About, Skills, Projects, and Contact sections. What would you like to see?`;
                break;
                
            case 'thanks':
                response = `${getEmoji('thanks')}You're welcome! I'm here if you need anything else.`;
                break;
                
            case 'theme':
                response = `${getEmoji('theme')}You can toggle between light and dark theme using the button at the top right of the page. The theme also changes automatically based on the time of day!`;
                break;
                
            case 'unknown':
            default:
                response = `${getEmoji('unknown')}I'm not sure I understand that. You can ask me about Krishna's skills, projects, education, or how to contact him.`;
                break;
        }
        
        // Adjust verbosity based on personality
        if (assistantPersonality.verbosity < 0.5 && response.length > 100) {
            // Shorten response for less verbose personality
            response = response.split('.')[0] + '.';
        } else if (assistantPersonality.verbosity > 0.8) {
            // Add more detail for more verbose personality
            switch(responseType) {
                case 'about-krishna':
                    response += ' His design thinking and technical skills complement each other perfectly.';
                    break;
                case 'skills':
                    response += ' Each skill card shows his proficiency level with animated progress bars.';
                    break;
                case 'projects':
                    response += ' Each project card can be flipped to see more details. There are also QR codes linking to the digital versions.';
                    break;
                case 'navigation':
                    response += ' The navigation is designed to be intuitive and responsive across all devices.';
                    break;
            }
        }
        
        // Adjust expression based on personality
        if (assistantPersonality.expressiveness > 0.7) {
            // More expressive - add exclamation points
            response = response.replace(/\./g, '!');
        }
        
        // Apply mood to response
        if (assistantPersonality.mood === 'excited') {
            response = response.replace(/\./g, '!');
            if (assistantPersonality.emoji) {
                response += ' ✨';
            }
        } else if (assistantPersonality.mood === 'professional') {
            response = response.replace(/!/g, '.');
            // Remove any excess emojis for professional tone
            if (!response.endsWith('.')) {
                response += '.';
            }
        }
        
        addAssistantMessage(response);
        
        // Adaptive behavior - update personality based on user interaction
        adaptPersonalityToUser(responseType);
    }
    
    // Adapt assistant personality based on user interaction patterns
    function adaptPersonalityToUser(responseType) {
        // Get interaction history from localStorage or initialize empty array
        const interactions = JSON.parse(localStorage.getItem('assistantInteractions') || '[]');
        
        // Add current interaction
        interactions.push({
            type: responseType,
            timestamp: Date.now()
        });
        
        // Keep only the most recent 10 interactions
        while (interactions.length > 10) {
            interactions.shift();
        }
        
        // Save to localStorage
        localStorage.setItem('assistantInteractions', JSON.stringify(interactions));
        
        // Analyze interaction patterns to adjust personality
        // Count different types of interactions
        const counts = {};
        interactions.forEach(interaction => {
            counts[interaction.type] = (counts[interaction.type] || 0) + 1;
        });
        
        // Adjust mood based on recent interactions
        if (counts['thanks'] > 2) {
            // User is appreciative, be more excited
            assistantPersonality.mood = 'excited';
            assistantPersonality.expressiveness = 0.9;
        } else if (counts['unknown'] > 3) {
            // User is having trouble, be more helpful
            assistantPersonality.mood = 'helpful';
            assistantPersonality.verbosity = 0.8; // Be more detailed
        }
        
        // Check if user prefers technical information
        const technicalCount = (counts['skills'] || 0) + (counts['projects'] || 0) + (counts['education'] || 0);
        const socialCount = (counts['greeting'] || 0) + (counts['about-krishna'] || 0) + (counts['thanks'] || 0);
        
        if (technicalCount > socialCount && technicalCount > 3) {
            // User prefers technical information, be more professional
            assistantPersonality.mood = 'professional';
            assistantPersonality.verbosity = 0.7; // Somewhat detailed
            assistantPersonality.expressiveness = 0.5; // Less expressive
        } else if (socialCount > technicalCount && socialCount > 3) {
            // User prefers social interaction, be more friendly
            assistantPersonality.mood = 'helpful';
            assistantPersonality.expressiveness = 0.9; // More expressive
            assistantPersonality.emoji = true; // Use emojis
        }
        
        // Update avatar appearance based on personality
        updateAssistantAvatar();
    }
    
    // Update assistant avatar appearance based on personality
    function updateAssistantAvatar() {
        const avatarIcon = document.querySelector('.assistant-icon i');
        if (!avatarIcon) return;
        
        // Change icon based on mood
        switch (assistantPersonality.mood) {
            case 'excited':
                avatarIcon.className = 'fas fa-grin-stars';
                break;
            case 'helpful':
                avatarIcon.className = 'fas fa-robot';
                break;
            case 'professional':
                avatarIcon.className = 'fas fa-user-tie';
                break;
            case 'curious':
                avatarIcon.className = 'fas fa-lightbulb';
                break;
            default:
                avatarIcon.className = 'fas fa-robot';
        }
        
        // Change icon color based on expressiveness
        const assistantIconEl = document.querySelector('.assistant-icon');
        if (assistantIconEl) {
            if (assistantPersonality.expressiveness > 0.7) {
                assistantIconEl.style.backgroundColor = '#ff7700';
            } else if (assistantPersonality.expressiveness < 0.4) {
                assistantIconEl.style.backgroundColor = '#355C7D';
            } else {
                assistantIconEl.style.backgroundColor = 'var(--primary-color)';
            }
        }
    }
    
    // Initialize with a random greeting to show personality
    setTimeout(() => {
        // Pulse animation for assistant icon to attract attention
        if (assistantIcon) {
            assistantIcon.classList.add('pulse');
            setTimeout(() => {
                assistantIcon.classList.remove('pulse');
            }, 2000);
        }
    }, 3000);
    
    // Add pulse animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 1s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
}