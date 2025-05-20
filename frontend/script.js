const API_BASE_URL = 'http://13.127.56.37:5000';

const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');
const uploadForm = document.getElementById('uploadForm');
const loading = document.getElementById('loading');
const result = document.getElementById('result');

if (imageInput) {
    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            previewImage.style.display = 'none';
            previewImage.src = '#';
        }
        result.textContent = '';
    });
}

if (uploadForm) {
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const file = imageInput.files[0];
        if (!file) {
            result.textContent = 'Please select an image.';
            return;
        }
        loading.style.display = 'block';
        result.textContent = '';
        const formData = new FormData();
        formData.append('image', file);
        fetch(`${API_BASE_URL}/analyze`, {
            method: 'POST',
            body: formData
        })
        .then(async response => {
            loading.style.display = 'none';
            if (!response.ok) {
                let err = await response.text();
                result.textContent = 'Error: ' + err;
                return;
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                result.textContent = data.message || data.prediction_label || 'Analysis complete.';
            }
        })
        .catch(error => {
            loading.style.display = 'none';
            result.textContent = 'Error: ' + error.message;
        });
    });
}
