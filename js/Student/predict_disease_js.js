 // JavaScript to update the "Before" image when a new file is uploaded
 document.getElementById("upload").addEventListener("change", function(event) {
    // Get the file from the input
    var file = event.target.files[0];

    // Check if a file was selected and it is an image
    if (file && file.type.startsWith("image/")) {
        var reader = new FileReader();
        reader.onload = function(e) {
            // Update the "Before" image with the uploaded file
            document.getElementById("before-image").src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please upload a valid image.");
    }
});



document.getElementById('diseaseform').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    var formData = new FormData();
    var fileInput = document.getElementById('upload');
    var file = fileInput.files[0];

    if (file) {
        formData.append('File', file); // 'File' is the key expected by the API

        // Send the request to the API using Fetch API (AJAX)
        fetch('http://aidentify-gradutionff.runasp.net/api/Models/predict_Disease', {
            method: 'POST',
            body: formData
        })
        .then(response => response.blob())  // Get the response as a Blob (image)
        .then(imageBlob => {
            // Create a URL for the received image Blob
            const imageObjectURL = URL.createObjectURL(imageBlob);

            // Update the "After" image source to display the received image
            document.getElementById('after-image').src = imageObjectURL;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert("Please select an image file first.");
    }
});