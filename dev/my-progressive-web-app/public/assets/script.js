// This file contains the JavaScript code that handles user interactions and integrates with the AI chatbot.

document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('ask-now');
    const submitButton = document.getElementById('submit-button');
    const chatContainer = document.getElementById('chat-container');
    const voiceButton = document.createElement('button');
    voiceButton.id = 'voice-control-button';
    voiceButton.style.whiteSpace = 'nowrap'; // Ensure the text is inline
    voiceButton.textContent = 'Use Voice';
    submitButton.parentNode.insertBefore(voiceButton, submitButton.nextSibling);

    chatContainer.style.height = ''; // Revert the field size change
    chatContainer.style.fontSize = '20px'; // Increase the font size by 20px

    const defaultResponses = [
        "I'm not able to answer that at this time.",
        "I'll have to get back to you on that.",
        "Sorry, I don't have an answer for that right now.",
        "Let me check on that and get back to you.",
        "That's a great question, but I don't have the answer right now.",
        "I'll need to look into that and get back to you.",
        "Unfortunately, I don't have that information at the moment.",
        "I'll find out and let you know.",
        "I'm not sure about that, but I'll find out.",
        "I don't have the answer to that right now.",
        "Let me get back to you on that.",
        "I'll need some time to find the answer to that.",
        "I don't have that information right now.",
        "I'll check and get back to you.",
        "That's something I'll need to look into.",
        "I'll need to do some research and get back to you.",
        "I can't answer that right now, but I'll find out.",
        "I'll need to verify that and get back to you.",
        "I'm not certain about that, but I'll find out.",
        "I'll need to gather more information and get back to you."
    ];
    let responseIndex = 0;

    const handleSubmit = async () => {
        const inputText = userInput.value;
        if (inputText.trim() === '') return;

        userInput.value = '';

        // Clear previous answer
        chatContainer.innerHTML = '';

        // Add placeholder text
        appendMessage("Please wait, your answer is being prepared...");

        const response = await getAIResponse(inputText);
        
        // Clear placeholder text
        chatContainer.innerHTML = '';

        appendMessage(response);

        // Remove the answer and replace with placeholder text after 20 seconds
        setTimeout(() => {
            chatContainer.innerHTML = '';
            appendMessage("Welcome to Volt Help");
        }, 20000);
    };

    submitButton.addEventListener('click', handleSubmit);

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    });

    voiceButton.addEventListener('click', () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Voice recognition not supported in this browser.');
            return;
        }

        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            console.log('Voice recognition started.');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            handleSubmit();
        };

        recognition.onerror = (event) => {
            console.error('Voice recognition error:', event.error);
        };

        recognition.onend = () => {
            console.log('Voice recognition ended.');
        };

        recognition.start();
    });

    function appendMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.style.textAlign = 'center'; // Center the answer text
        messageElement.style.width = '100%'; // Ensure the answer fits into 100% width
        messageElement.style.wordWrap = 'break-word'; // Wrap the text if needed
        messageElement.style.fontSize = '24px'; // Increase the font size by 10px
        chatContainer.appendChild(messageElement);
    }

    async function getAIResponse(query) {
        const predefinedResponses = {
            "what is your name": "My name is Zeek.",
            "what is your job": "My job is AI assistant.",
            "what is your business": "My business is AI brand manager."
        };

        if (predefinedResponses[query.toLowerCase()]) {
            console.log('Predefined response found for:', query);
            return predefinedResponses[query.toLowerCase()];
        }

        try {
            console.log('Fetching AI response for:', query);
            const response = await fetch('https://api.example.com/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: query }),
            });
            const data = await response.json();
            console.log('AI response received:', data);
            return data.answer;
        } catch (error) {
            console.error('Error fetching AI response:', error);
            const defaultResponse = defaultResponses[responseIndex];
            responseIndex = (responseIndex + 1) % defaultResponses.length;
            return defaultResponse;
        }
    }

    document.getElementById('ask-now').style.color = 'black'; // Set placeholder text color to black

    // Add initial placeholder text to chat-container
    appendMessage("Welcome to Volt Help");
});