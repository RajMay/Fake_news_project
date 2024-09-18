import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [prediction, setPrediction] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Function to send the input text to the Flask backend
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error making request:', error);
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
      <button onClick={handleSubmit}>Check News</button>

      {/* Display the prediction result */}
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
}

export default App;
