// ===============================
// Signature Canvas Setup
// ===============================
const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

// Set canvas resolution for better quality
const scale = window.devicePixelRatio || 1;
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

// Touch events
canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
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
  startDrawing({ clientX: touch.clientX, clientY: touch.clientY });
}

function handleTouchMove(e) {
  e.preventDefault();
  const touch = e.touches[0];
  draw({ clientX: touch.clientX, clientY: touch.clientY });
}

// Clear signature
document.getElementById('clearSignature').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// ===============================
// Form Submission
// ===============================
document.getElementById('rotcForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const signatureData = canvas.toDataURL();

  const formData = {
    timestamp: new Date().toISOString(),
    retRank: document.getElementById('retRank').value,
    familyName: document.getElementById('familyName').value,
    firstName: document.getElementById('firstName').value,
    mi: document.getElementById('mi').value,
    afpsn: document.getElementById('afpsn').value,
    dateOfBirth: document.getElementById('dob').value,
    status: document.querySelector('input[name="status"]:checked')?.value || '',
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
    const GOOGLE_SCRIPT_URL =
      'https://script.google.com/macros/s/AKfycbzTjVoI8A_9e0TSpYG1TrUpNnfnGqNXTyDuEJrkd0PwDBGfIM5iF4vBHQVpSssI7A4r/exec';

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      alert('Registration submitted successfully!');
      document.getElementById('rotcForm').reset();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      document.getElementById('signatureDate').valueAsDate = new Date();
    } else {
      throw new Error(result.error || 'Unknown error');
    }

  } catch (error) {
    console.error('Submission Error:', error);
    alert('Submission failed. Please contact the administrator.');
  }
});

// Auto-fill today's date for signature date
document.getElementById('signatureDate').valueAsDate = new Date();
