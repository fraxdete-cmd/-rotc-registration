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
  startDrawing(touch);
}

function handleTouchMove(e) {
  e.preventDefault();
  const touch = e.touches[0];
  draw(touch);
}

// Clear signature
const clearBtn = document.getElementById('clearSignature');
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
}

// ===============================
// Form Submission
// ===============================
const form = document.getElementById('rotcForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const getValue = (id) => {
      const el = document.getElementById(id);
      if (!el) console.warn(`Element with ID "${id}" not found`);
      return el ? el.value : '';
    };

    const signatureData = canvas.toDataURL();

    const formData = {
      timestamp: new Date().toISOString(),
      retRank: getValue('retRank'),
      familyName: getValue('familyName'),
      firstName: getValue('firstName'),
      mi: getValue('mi'),
      afpsn: getValue('afpsn'),
      dateOfBirth: getValue('dob'),
      status: document.querySelector('input[name="status"]:checked')?.value || '',
      spouse: getValue('spouse'),
      address: getValue('address'),
      cellPhone: getValue('cellPhone'),
      email: getValue('email'),
      dateEntered: getValue('dateEntered'),
      location: getValue('location'),
      rcdu: getValue('rcdu'),
      rcdg: getValue('rcdg'),
      lastUnit: getValue('lastUnit'),
      lastLocation: getValue('lastLocation'),
      retirementDate: getValue('retirementDate'),
      admissionDate: getValue('admissionDate'),
      signatureDate: getValue('signatureDate'),
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

      if (result.status === 'success') {
        alert('Registration submitted successfully!');
        form.reset();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById('signatureDate').valueAsDate = new Date();
      } else {
        alert('Submission failed: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert('Submission failed. Please check console for details.');
    }
  });
}

// Auto-fill today's date
const signatureDateInput = document.getElementById('signatureDate');
if (signatureDateInput) {
  signatureDateInput.valueAsDate = new Date();
}
