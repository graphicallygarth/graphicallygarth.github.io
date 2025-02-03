import React, { useState } from 'react';
import { getAIResponse } from '../services/aiService';

const AIChatBot = () => {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState([]);

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userInput.trim()) {
            const response = await getAIResponse(userInput);
            setResponses([...responses, { question: userInput, answer: response }]);
            setUserInput('');
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-messages">
                {responses.map((item, index) => (
                    <div key={index} className="chat-message">
                        <div className="user-question">You: {item.question}</div>
                        <div className="ai-response">AI: {item.answer}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="chatbot-form">
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Ask me anything..."
                    className="chatbot-input"
                />
                <button type="submit" className="chatbot-submit">Send</button>
            </form>
        </div>
    );
};

export default AIChatBot;