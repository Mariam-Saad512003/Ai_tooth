// Adding event listener to the form submission
document.getElementById('genderForm').addEventListener('submit', async function(e) {
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
        const response = await fetch('http://aidentify-gradutionf.runasp.net/api/Models/predict_Gender', {
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
        const gender = data.predictedGender.toLowerCase(); // Expected values: 'male' or 'female'

        // Handle the result based on the gender prediction
        if (gender === 'male') {
            resultDiv.innerHTML = `
                <div class="d-flex align-items-center" id="male">
                    <span class="me-2">The Gender Is:</span>
                    <img src="../images/male-user.png" width="40" height="40" alt="Male Avatar">
                    <span class="ms-2">Male</span>
                </div>
            `;
        } else if (gender === 'female') {
            resultDiv.innerHTML = `
                <div class="d-flex align-items-center" id="female">
                    <span class="me-2">The Gender Is:</span>
                    <img src="../images/woman-avatar.png" width="40" height="40" alt="Female Avatar">
                    <span class="ms-2">Female</span>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `Unexpected result: ${gender}`;
        }

    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
        console.error('Error:', error);
    }
});

// Function to update the image preview when a new image is uploaded
function updateImage(event) {
    const uploadedImage = document.getElementById('uploadedImage');
    uploadedImage.src = URL.createObjectURL(event.target.files[0]); // Create object URL for the image preview
}
