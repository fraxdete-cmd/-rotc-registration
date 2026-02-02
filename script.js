// Signature Canvas Setup
const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

// Set canvas resolution for better quality
const scale = window.devicePixelRatio;
canvas.width = 400 * scale;
canvas.height = 150 * scale;
canvas.style.width = '400px';
canvas.style.height = '150px';
ctx.scale(scale, scale);

ctx.strokeStyle = '#000';
ctx.lineWidth = 2;
ctx.lineCap = 'round';

// Mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch events for mobile
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

function handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

// Clear signature button
document.getElementById('clearSignature').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Form Submission
document.getElementById('rotcForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Check if signature exists
    const signatureData = canvas.toDataURL();
    
    // Collect form data
    const formData = {
        timestamp: new Date().toISOString(),
        retRank: document.getElementById('retRank').value,
        familyName: document.getElementById('familyName').value,
        firstName: document.getElementById('firstName').value,
        mi: document.getElementById('mi').value,
        afpsn: document.getElementById('afpsn').value,
        dateOfBirth: document.getElementById('dob').value,
        status: document.querySelector('input[name="status"]:checked')?.value,
        spouse: document.getElementById('spouse').value,
        address: document.getElementById('address').value,
        cellPhone: document.getElementById('cellPhone').value,
        email: document.getElementById('email').value,
        dateEntered: document.getElementById('dateEntered').value,
        location: document.getElementById('location').value,
        rcdu: document.getElementById('rcdu').value,
        rcdg: document.getElementById('rcdg').value,
        lastUnit: document.getElementById('lastUnit').value,
        lastLocation: document.getElementById('lastLocation').value,
        retirementDate: document.getElementById('retirementDate').value,
        admissionDate: document.getElementById('admissionDate').value,
        signatureDate: document.getElementById('signatureDate').value,
        signature: signatureData
    };

    try {
        // This will be replaced with your Google Sheets Web App URL
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwFlHK2pp-jwsTBj6NRigT14EjW73E2zreAZKvXQxHJGqI1TjmhbRZF7woaZQxjtdtV/exec/';
        
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        alert('Registration submitted successfully! Thank you for registering.');
        document.getElementById('rotcForm').reset();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your registration. Please try again or contact the administrator.');
    }
});

// Auto-fill today's date for signature date
document.getElementById('signatureDate').valueAsDate = new Date();
