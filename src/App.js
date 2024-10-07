import React, { useEffect, useState } from 'react';
import './App.css'; // Import your CSS styles

function App() {
  // Initialize state for theme, default to 'dark'
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApodData = async () => {
      try {
        const response = await fetch('http://localhost:3000/apod'); // Adjust URL if hosted
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApodData(data);
      } catch (error) {
        console.error('Error fetching APOD data:', error);
        setError('Failed to fetch data from NASA API');
      } finally {
        setLoading(false);
      }
    };

    fetchApodData();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle the theme
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="header">
        <h1>Astronomy Picture of the Day</h1>
        <div className="theme-toggle-slider">
          <label className="theme-toggle-label">
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </label>
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleTheme}
          />
        </div>
      </div>
      <div className="content">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {apodData && (
          <div className="apod-container">
            <div className="apod-media">
              {apodData.media_type === 'image' ? (
                <img src={apodData.url} alt={apodData.title} className="apod-image" />
              ) : (
                <iframe
                  title={apodData.title}
                  src={apodData.url}
                  className="apod-video"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <h2 className="apod-title">{apodData.title}</h2>
            <p className="apod-explanation">{apodData.explanation}</p>
            <p className="apod-date"><strong>Date:</strong> {apodData.date}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
