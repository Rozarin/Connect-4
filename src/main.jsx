// I start by importing React's StrictMode, which helps identify potential problems in my app during development.
import { StrictMode } from 'react';

// I also import the 'createRoot' function to initialize my React application with a root element.
import { createRoot } from 'react-dom/client';

// I include my app's CSS to apply styling throughout the app.
import './index.css';

// I import the main App component, which is the core of my React application.
import App from './App.jsx';

// I call 'createRoot' to create a root DOM node for my application and render the App component inside it.
// Wrapping my App with StrictMode helps me spot any unsafe lifecycle methods or other potential issues.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);