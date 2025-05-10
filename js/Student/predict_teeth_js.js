// Function to handle the teeth prediction response
function handleTeethPredictionResponse(data) {
    const resultDiv = document.getElementById('result');

    // Check if the prediction result is valid
    if (data && data.predictionResult) {
        const prediction = data.predictionResult;

        // Construct the HTML to display all the details about the teeth prediction
        resultDiv.innerHTML = `
            <div class="alert alert-success">
                <strong>Total Teeth Predicted:</strong> ${prediction.total_teeth}<br>
                <strong>Incisors:</strong> ${prediction.incisors}<br>
                <strong>Canines:</strong> ${prediction.canines}<br>
                <strong>Premolars:</strong> ${prediction.premolars}<br>
                <strong>Molars:</strong> ${prediction.molars}<br>
                <strong>Missing Teeth:</strong> ${prediction.missing_teeth}<br>
                <strong>Message:</strong> ${prediction.message}
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div class="alert alert-warning">
                Unexpected or missing prediction result.
            </div>
        `;
    }
}

// Function to update the image preview when a new image is uploaded
function updateImage(event) {
    const uploadedImage = document.getElementById('uploadedImage');
    uploadedImage.src = URL.createObjectURL(event.target.files[0]); // Create object URL for the image preview
}

// Adding event listener to the form submission
document.getElementById('TeethForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const fileInput = document.getElementById('upload');
    const resultDiv = document.getElementById('result');

    // Check if file is selected
    if (!fileInput.files || fileInput.files.length === 0) {
        resultDiv.innerHTML = 'Please select an image first!';
        return;
    }

    const formData = new FormData();
    formData.append('File', fileInput.files[0]);

    try {
        // Show analyzing message while the request is being processed
        resultDiv.innerHTML = 'Analyzing...';

        // Sending the file to the API
        const response = await fetch('http://aidentify-gradutionff.runasp.net/api/Models/predict_Teeth', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            },
        });

        // Check for HTTP errors
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response JSON
        const data = await response.json();
        console.log(data); // Log the response to check its structure

        // Handle the response for teeth prediction using the updated structure
        if (data && data.predictionResult) {
            const prediction = data.predictionResult;
            resultDiv.innerHTML = `
                <div class="alert alert-success">
                    <strong>Total Teeth Predicted:</strong> ${prediction.total_teeth}<br>
                    <strong>Incisors:</strong> ${prediction.incisors}<br>
                    <strong>Canines:</strong> ${prediction.canines}<br>
                    <strong>Premolars:</strong> ${prediction.premolars}<br>
                    <strong>Molars:</strong> ${prediction.molars}<br>
                    <strong>Missing Teeth:</strong> ${prediction.missing_teeth}<br>
                    <strong>Message:</strong> ${prediction.message}
                </div>
            `;
        } else {
            resultDiv.innerHTML = 'Error: Prediction result is unavailable.';
        }
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
        console.error('Error:', error);
    }
});
