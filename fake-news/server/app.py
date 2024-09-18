from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load your ML model
model = joblib.load('model/model.pkl')

@app.route('/detect', methods=['POST'])
def detect_fake_news():
    data = request.json
    input_text = data.get('text')
    prediction = model.predict([input_text])
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
