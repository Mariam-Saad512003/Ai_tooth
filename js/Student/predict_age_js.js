// Adding event listener to the form submission
document.getElementById('ageForm').addEventListener('submit', async function(e) {
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
        const response = await fetch('http://aidentify-gradutionff.runasp.net/api/Models/predict_age', {
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
        const age = data.predictedAge.toLowerCase(); // Expected values: 'Child' or 'Adult'

        // Handle the result based on the age prediction
        if (age === 'child' ) {
            resultDiv.innerHTML = `
                <div class="d-flex align-items-center" id="Child">
                    <span class="me-2">The Age Is:</span>
                    <img src="../../images/child.png" width="40" height="40" alt="Male Avatar"></img>
                       <span class="ms-2">Child</span>
                </div>
                  
                   
            `;
          
        } else if (age === 'adult') {
            resultDiv.innerHTML = `
                   <div class="d-flex align-items-center" id="Adult">
                    <span class="me-2">The Age Is:</span>
                    <img src="../../images/adult.png" width="40" height="40" alt="Male Avatar"></img>
                       <span class="ms-2">Adult</span>
                </div>
            
            `;
        } else {
            resultDiv.innerHTML = `Unexpected result: ${age}`;
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
