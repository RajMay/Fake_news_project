
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import re
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

app = Flask(__name__)

# Load your trained model and vectorizer
model = joblib.load('model/model.pkl')
vectorizer = joblib.load('model/vectorizer.pkl')

# Initialize stemmer
port_stem = PorterStemmer()

# Preprocessing function (same as during training)
def stemming(content):
    stemmed_content = re.sub('[^a-zA-Z]', ' ', content)
    stemmed_content = stemmed_content.lower()
    stemmed_content = stemmed_content.split()
    stemmed_content = [port_stem.stem(word) for word in stemmed_content if not word in stopwords.words('english')]
    stemmed_content = ' '.join(stemmed_content)
    return stemmed_content

# Enable CORS
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def home():
    return "Fake News Detection API is running!"

@app.route('/detect', methods=['POST'])
def detect_fake_news():
    data = request.json
    input_text = data.get('text')

    if not input_text:
        return jsonify({'error': 'No text provided'}), 400

    # Apply preprocessing to the input text
    preprocessed_text = stemming(input_text)

    # Vectorize the input text using the trained vectorizer
    input_vector = vectorizer.transform([preprocessed_text])

    try:
        # Make the prediction
        prediction = model.predict(input_vector)
        result = ' Fake' if prediction[0] == 1 else 'Real'
        return jsonify({'prediction': result})
    except Exception as e:
        return jsonify({'error': 'An error occurred during prediction', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
