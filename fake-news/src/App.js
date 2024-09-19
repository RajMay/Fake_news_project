import React, { useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



function App() {
  const [inputText, setInputText] = useState('');
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setPrediction('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/detect', {
        text: inputText,
      });
      setPrediction(response.data.prediction);
    } catch (err) {
      setError('Failed to connect to the server. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const tips = [
    'Tip 1: Cross-check news with multiple sources!',
    'Tip 2: Always verify the credibility of the website.',
    'Tip 3: Fake news is often sensational.',
    'Tip 4: Images and videos can be manipulated.',
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="App">
      {/* Sidebar */}
      <nav className={`sidebar ${isSidebarOpen ? '' : 'hidden'}`}>
        <h2>VicHaarSamPark..</h2>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>

      <div className="main-wrapper">
        {/* Carousel of Tips */}
        <div className="carousel-container">
          <Slider {...sliderSettings}>
            {tips.map((tip, index) => (
              <div key={index} className="tip-slide">
                <h3>{tip}</h3>
              </div>
            ))}
          </Slider>
        </div>

        <main className="main-content">
          <div className="input-container">
            <h2>Verify News Authenticity</h2>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder="Paste the news article here..."
              rows="8"
              cols="80"
              className="news-input"
            />
            <button onClick={handleSubmit} disabled={loading} className="submit-btn">
              {loading ? 'Checking...' : 'Analyse'}
            </button>
            {loading && <div className="loader"></div>}
          </div>

          {prediction && (
            <div className="result-container">
              <div className="result-card">
                <h3>Prediction:</h3>
                <p>{prediction}</p>
              </div>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}
        </main>

        <section className="card-section">
          <div className="card-container">
            <div className="card">
              <h3>How it Works</h3>
              <p>Learn how our Fake News Detector works with advanced AI algorithms to spot misinformation.</p>
              <button>Learn More</button>
            </div>

            <div className="card">
              <h3>Report Fake News</h3>
              <p>Submit any suspicious news article for review by our team of experts.</p>
              <button>Report Now</button>
            </div>

            <div className="card">
              <h3>Upgrade for Premium</h3>
              <p>Access premium features with enhanced AI accuracy and more detailed reports.</p>
              <button>Upgrade</button>
            </div>
          </div>
        </section>

        <footer>
          <p>© 2024 Fake News Detection. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
