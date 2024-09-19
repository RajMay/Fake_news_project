import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Function to send the input text to the Flask backend using axios
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setPrediction('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/detect', {
        text: inputText
      });

      // Handle success response
      setPrediction(response.data.prediction);
    } catch (err) {
      // Handle error response
      setError('Failed to connect to the server. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Fake News Detection</h1>

      {/* Text area to input news text */}
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter news text"
        rows="10"
        cols="50"
      />

      {/* Button to submit the input */}
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Checking...' : 'Check News'}
      </button>

      {/* Display the prediction result */}
      {prediction && <p>Prediction: {prediction}</p>}
      
      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}

export default App;
