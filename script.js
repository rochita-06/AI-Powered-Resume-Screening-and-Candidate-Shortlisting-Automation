const WEBHOOK_URL = 'https://rochita06.app.n8n.cloud/webhook-test/c0b1f88f-5033-490d-9801-8c60f0a49e56';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('resume');
    const uploadText = document.getElementById('upload-text');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('span');
    const loader = document.getElementById('loader');
    
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const resetBtn = document.getElementById('reset-btn');
    const retryBtn = document.getElementById('retry-btn');
    const errorText = document.getElementById('error-text');

    // Drag and Drop Functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    });

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type === 'application/pdf') {
                uploadText.textContent = file.name;
                // Assign to input
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInput.files = dataTransfer.files;
                uploadText.style.color = '#a78bfa';
            } else {
                alert('Please upload a PDF file.');
                fileInput.value = '';
                uploadText.textContent = 'Drag & Drop your resume (PDF)';
                uploadText.style.color = '';
            }
        }
    }

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!fileInput.files.length) {
            alert('Please attach a missing resume.');
            return;
        }

        const formData = new FormData(form);
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        loader.style.display = 'block';

        try {
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Bypasses the strict CORS response check
            });

            // With no-cors, the response is opaque and we can't read response.ok
            // If the fetch didn't throw a network error, it was dispatched successfully. 
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');

        } catch (error) {
            console.error('Upload Error:', error);
            form.classList.add('hidden');
            errorText.textContent = "Failed to connect. Make sure your internet is working and n8n is listening.";
            errorMessage.classList.remove('hidden');
        } finally {
            // Reset loading state
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            loader.style.display = 'none';
        }
    });

    // Reset flow
    const resetFlow = () => {
        form.reset();
        fileInput.value = '';
        uploadText.textContent = 'Drag & Drop your resume (PDF)';
        uploadText.style.color = '';
        form.classList.remove('hidden');
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
    };

    resetBtn.addEventListener('click', resetFlow);
    retryBtn.addEventListener('click', resetFlow);
});
