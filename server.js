const express = require('express');
const bodyParser = require('body-parser');
const { OpenAIApi, Configuration } = require('openai'); // Import OpenAI SDK

const app = express();

// Configure OpenAI with your API key
const configuration = new Configuration({
  apiKey: "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", // Your OpenAI API key
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());

app.post('/analyze', async (req, res) => {
    const text = req.body.text;

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003", // Choose the appropriate model
            prompt: "Read and analyze this text and judge it based on how much bias is detected in the text. Rate it on a scale from 1 to 10, where 1 is no bias at all, and 10 is very biased. \n\nText: " + text, // Custom prompt for bias detection
            max_tokens: 100,
        });

        // Process the response to extract a bias score
        const score = processBiasResponse(response.data.choices[0].text);

        res.json({ score });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

function processBiasResponse(responseText) {
    // Process the OpenAI response to extract a bias score
    // This might involve parsing the response text and converting it to a numeric score
    return responseText; // Replace with your logic to extract the score
}

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
