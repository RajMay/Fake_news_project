import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Load your model and vectorizer
model = joblib.load('model/model.pkl') 
vectorizer = joblib.load('model/vectorizer.pkl') 

# Allow CORS requests from your React frontend
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def home():
    return "Fake News Detection API is running!"

@app.route('/detect', methods=['POST'])
def detect_fake_news():
    data = request.json
    input_text = data.get('text')

    # Basic input validation to ensure text is provided
    if not input_text:
        return jsonify({'error': 'No text provided'}), 400

    try:
        # Transform the input using the same vectorizer used during training
        transformed_input = vectorizer.transform([input_text])  # Vectorize the input text
        
        # Predict using the model
        prediction = model.predict(transformed_input)
        
        # Convert the result to a readable format (e.g., 'Fake' or 'Real')
        result = 'Fake' if prediction[0] == 1 else 'Real'
        
        return jsonify({'prediction': result})
    
    except Exception as e:
        return jsonify({'error': 'An error occurred during prediction', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
