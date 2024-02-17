document.getElementById('analyze-button').addEventListener('click', async () => {
    const text = document.getElementById('text-input').value;
    const resultDiv = document.getElementById('result');

    // Display a loading message
    resultDiv.innerText = 'Analyzing...';

    // Making the API call to the server
    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        // Update the result when the response is received
        const result = await response.json();
        resultDiv.innerText = `Bias score: ${result.score}`;
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerText = 'An error occurred. Please try again.';
    }
});
