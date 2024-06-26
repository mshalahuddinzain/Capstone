const tf = require('@tensorflow/tfjs-node');
const loadModel = require('../loadmodel');
const Journal = require('../model/journalModel');

const predictFeeling = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        // Preprocess the journal text
        const processedText = preprocessText(text);
        const tensor = tf.tensor2d([processedText]); // Ensuring shape [1, 50]

        const model = await loadModel();
        const prediction = model.predict(tensor);
        const feelingIndex = prediction.argMax(-1).dataSync()[0];

        const feelings = ['sedih', 'bahagia', 'marah'];
        const feeling = feelings[feelingIndex];

        let label, suggestion;

        if (feeling === 'sedih') {
            label = 'Anda sedang Sedih';
            suggestion = 'Anda bisa membaca artikel mengenai cara mengatasi sedih di bagian articles';
        } else if (feeling === 'marah') {
            label = 'Anda sedang bahagia';
            suggestion = 'Pertahankan kebahagiaan anda';
        } else {
            label = 'Anda sedang marah';
            suggestion = 'Anda bisa membaca artikel mengenai cara mengatasi marah di bagian articles';
        }

        res.json({ label, suggestion });
    } catch (error) {
        res.status(500).json({ message: `Terjadi kesalahan dalam melakukan prediksi: ${error.message}` });
    }
};

function preprocessText(text) {
    // Implement your text preprocessing here
    // Example: simple word length as token
    let tokens = text.split(' ').map(word => word.length);

    // Pad or truncate to ensure length of 50
    const maxLength = 50;
    if (tokens.length > maxLength) {
        tokens = tokens.slice(0, maxLength);
    } else if (tokens.length < maxLength) {
        while (tokens.length < maxLength) {
            tokens.push(0); // Padding with 0s
        }
    }

    return tokens;
}

module.exports = predictFeeling;
