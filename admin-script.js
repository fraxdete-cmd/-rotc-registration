// ===============================
// Admin Authentication
// ===============================
// Simple authentication (change credentials if needed)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'rotc2026'
};

// New Google Apps Script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzTjVoI8A_9e0TSpYG1TrUpNnfnGqNXTyDuEJrkd0PwDBGfIM5iF4vBHQVpSssI7A4r/exec';

let allRegistrations = [];
let isLoggedIn = false;

// Check login status on page load
window.addEventListener('load', () => {
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
        loadData();
    }
});

// Login form handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        showDashboard();
        loadData();
    } else {
        alert('Invalid credentials! Please try again.');
    }
});

// Logout handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('adminLoggedIn');
    location.reload();
});

// Show dashboard
function showDashboard() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboardContent').style.display = 'block';
    isLoggedIn = true;
}

// ===============================
// Load & Display Data
// ===============================
async function loadData() {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getData');
        const data = await response.json();
        allRegistrations = data || [];
        displayRegistrations(allRegistrations);
        updateStats(allRegistrations);
    } catch (error) {
        console.error('Error loading data:', error);
        loadDemoData();
    }
}

// Demo data if fetch fails
function loadDemoData() {
    const demoData = [
        {
            timestamp: new Date().toISOString(),
            familyName: 'Dela Cruz',
            firstName: 'Juan',
            mi: 'P',
            retRank: 'Cadet',
            email: 'juan.delacruz@example.com',
            cellPhone: '09171234567',
            status: 'Single',
            signature: ''
        },
        {
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            familyName: 'Santos',
            firstName: 'Maria',
            mi: 'R',
            retRank: 'Cadet',
            email: 'maria.santos@example.com',
            cellPhone: '09187654321',
            status: 'Single',
            signature: ''
        }
    ];
    allRegistrations = demoData;
    displayRegistrations(demoData);
    updateStats(demoData);
}

// Display registrations in table
function displayRegistrations(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    if (!data || data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:40px;">No registrations found</td></tr>';
        return;
    }

    data.forEach((reg, index) => {
        const row = document.createElement('tr');
        const date = reg.timestamp ? new Date(reg.timestamp).toLocaleDateString() : 'N/A';
        const fullName = `${reg.firstName || ''} ${reg.mi || ''}. ${reg.familyName || ''}`;

        row.innerHTML = `
            <td>${date}</td>
            <td>${fullName}</td>
            <td>${reg.retRank || 'N/A'}</td>
            <td>${reg.email || 'N/A'}</td>
            <td>${reg.cellPhone || 'N/A'}</td>
            <td>${reg.status || 'N/A'}</td>
            <td>
                <button class="btn-view" onclick="viewDetails(${index})">View</button>
                <button class="btn-delete" onclick="deleteRegistration(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Update dashboard statistics
function updateStats(data) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const todayCount = data.filter(reg => new Date(reg.timestamp) >= today).length;
    const weekCount = data.filter(reg => new Date(reg.timestamp) >= weekAgo).length;

    document.getElementById('totalRegistrations').textContent = data.length;
    document.getElementById('weekRegistrations').textContent = weekCount;
    document.getElementById('todayRegistrations').textContent = todayCount;
}

// ===============================
// Search Functionality
// ===============================
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allRegistrations.filter(reg => {
        const fullName = `${reg.firstName || ''} ${reg.familyName || ''}`.toLowerCase();
        const email = (reg.email || '').toLowerCase();
        const phone = (reg.cellPhone || '').toLowerCase();
        return fullName.includes(searchTerm) || email.includes(searchTerm) || phone.includes(searchTerm);
    });
    displayRegistrations(filtered);
});

// Refresh data
document.getElementById('refreshBtn').addEventListener('click', loadData);

// ===============================
// Export to CSV
// ===============================
document.getElementById('exportBtn').addEventListener('click', () => {
    if (!allRegistrations || allRegistrations.length === 0) {
        alert('No data to export');
        return;
    }

    const headers = [
        'Timestamp','Rank','Family Name','First Name','MI','AFPSN',
        'Date of Birth','Status','Spouse','Address','Cell Phone','Email',
        'Date Entered','Location','RCDU','RCDG','Last Unit','Last Location',
        'Retirement Date','Admission Date','Signature Date'
    ];

    let csv = headers.join(',') + '\n';

    allRegistrations.forEach(reg => {
        const row = [
            reg.timestamp || '',
            reg.retRank || '',
            reg.familyName || '',
            reg.firstName || '',
            reg.mi || '',
            reg.afpsn || '',
            reg.dateOfBirth || '',
            reg.status || '',
            reg.spouse || '',
            `"${reg.address || ''}"`,
            reg.cellPhone || '',
            reg.email || '',
            reg.dateEntered || '',
            reg.location || '',
            reg.rcdu || '',
            reg.rcdg || '',
            reg.lastUnit || '',
            reg.lastLocation || '',
            reg.retirementDate || '',
            reg.admissionDate || '',
            reg.signatureDate || ''
        ];
        csv += row.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rotc-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
});

// ===============================
// View & Delete Registration
// ===============================
function viewDetails(index) {
    const reg = allRegistrations[index];
    if (!reg) return;

    const modal = document.getElementById('detailModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="detail-row"><label>Full Name:</label><p>${reg.retRank || ''} ${reg.firstName || ''} ${reg.mi || ''}. ${reg.familyName || ''}</p></div>
        <div class="detail-row"><label>AFPSN & Br Svc:</label><p>${reg.afpsn || 'N/A'}</p></div>
        <div class="detail-row"><label>Date of Birth:</label><p>${reg.dateOfBirth || 'N/A'}</p></div>
        <div class="detail-row"><label>Status:</label><p>${reg.status || 'N/A'}</p></div>
        <div class="detail-row"><label>Spouse:</label><p>${reg.spouse || 'N/A'}</p></div>
        <div class="detail-row"><label>Permanent Address:</label><p>${reg.address || 'N/A'}</p></div>
        <div class="detail-row"><label>Contact Info:</label><p>Phone: ${reg.cellPhone || 'N/A'}<br>Email: ${reg.email || 'N/A'}</p></div>
        <div class="detail-row"><label>Date Entered Military Service:</label><p>${reg.dateEntered || 'N/A'} - ${reg.location || 'N/A'}</p></div>
        <div class="detail-row"><label>Assignment:</label><p>RCDU/HDU: ${reg.rcdu || 'N/A'}<br>RCDG: ${reg.rcdg || 'N/A'}</p></div>
        <div class="detail-row"><label>Last Unit Assignment:</label><p>${reg.lastUnit || 'N/A'} - ${reg.lastLocation || 'N/A'}</p></div>
        <div class="detail-row"><label>Retirement Date & Authority:</label><p>${reg.retirementDate || 'N/A'}</p></div>
        <div class="detail-row"><label>Admission Date:</label><p>${reg.admissionDate || 'N/A'}</p></div>
        <div class="detail-row"><label>Signature Date:</label><p>${reg.signatureDate || 'N/A'}</p></div>
        ${reg.signature ? `<div class="detail-row"><label>Signature:</label><img src="${reg.signature}" alt="Signature" class="signature-img"></div>` : ''}
        <div class="detail-row"><label>Timestamp:</label><p>${new Date(reg.timestamp).toLocaleString()}</p></div>
    `;

    modal.style.display = 'block';
}

async function deleteRegistration(index) {
    if (!confirm('Are you sure you want to delete this registration?')) return;

    const reg = allRegistrations[index];
    if (!reg) return;

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'delete', timestamp: reg.timestamp })
        });

        alert('Registration deleted successfully');
        loadData();
    } catch (error) {
        console.error('Error deleting registration:', error);
        alert('Error deleting registration');
    }
}

// ===============================
// Modal Close Functionality
// ===============================
const modal = document.getElementById('detailModal');
const closeBtn = document.getElementsByClassName('close')[0];

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (event) => { if (event.target === modal) modal.style.display = 'none'; };
