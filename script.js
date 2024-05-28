// script.js

// Check for browser support
if ('webkitSpeechRecognition' in window) {
    // Initialize speech recognition
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    // Select elements from the DOM
    const startBtn = document.getElementById('start-btn');
    const responseEl = document.getElementById('response');

    // Handle speech recognition result
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        processSpeech(transcript);
    };

    // Handle errors
    recognition.onerror = function(event) {
        responseEl.textContent = 'Error occurred in recognition: ' + event.error;
    };

    // Start recognition when button is clicked
    startBtn.addEventListener('click', () => {
        recognition.start();
        responseEl.textContent = 'Listening...';
    });

    // Process the recognized speech
    function processSpeech(speech) {
        responseEl.textContent = `You said: "${speech}"`;
        respond(speech);
    }

    // Respond using text-to-speech
    function respond(message) {
        let response = '';

        // Basic response logic (customize as needed)
        if (message.toLowerCase().includes('hello')) {
            response = 'Hello! How can I help you today?';
        } else if (message.toLowerCase().includes('how are you')) {
            response = 'I am just a bunch of code, but I am functioning as expected!';
        } else {
            response = "Sorry, I didn't understand that.";
        }

        responseEl.textContent += `\nTom says: "${response}"`;

        // Use speech synthesis to respond
        const utterance = new SpeechSynthesisUtterance(response);
        speechSynthesis.speak(utterance);
    }
} else {
    alert('Speech recognition is not supported in this browser.');
}
