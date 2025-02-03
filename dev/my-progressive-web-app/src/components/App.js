import React from 'react';
import AIChatBot from './AIChatBot';
import VideoInteraction from './VideoInteraction';
import './App.css';

const App = () => {
    return (
        <div className="app-container">
            <h1>Welcome to the AI Chatbot</h1>
            <VideoInteraction />
            <AIChatBot />
        </div>
    );
};

export default App;