# My Progressive Web App

## Overview
This project is a fully responsive, mobile-first progressive web application that features an AI chatbot to answer user questions. It also includes a video showcasing a real person interacting with user inputs.

## Project Structure
```
my-progressive-web-app
├── public
│   ├── index.html          # Main HTML document
│   ├── manifest.json       # Metadata for the web app
│   └── assets
│       ├── styles.css      # CSS styles for responsiveness
│       ├── script.js       # JavaScript for user interactions
│       └── videos
│           └── interaction.mp4 # Video of real person interaction
├── src
│   ├── components
│   │   ├── AIChatBot.js    # AI chatbot functionality
│   │   ├── VideoInteraction.js # Video interaction component
│   │   └── App.js          # Main application component
│   ├── services
│   │   └── aiService.js    # Functions for AI service interaction
│   └── index.js            # Entry point for the React application
├── package.json             # npm configuration file
├── webpack.config.js        # Webpack configuration
└── README.md                # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd my-progressive-web-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```

## Usage
- Open your browser and navigate to `http://localhost:3000` to access the application.
- Interact with the AI chatbot by typing your questions.
- Watch the video interaction to see a real person responding to user inputs.

## Contributing
Feel free to submit issues or pull requests for improvements and features. 

## License
This project is licensed under the MIT License.