# 11RCDG ROTC Registration Website - Setup Guide

## 📋 Overview
This is a professional ROTC cadet registration system with an admin dashboard. All registrations are automatically saved to Google Sheets, and administrators can view, search, and export data.

---

## 🚀 Step-by-Step Deployment Guide

### STEP 1: Create Google Sheet for Data Storage

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it: **"ROTC Registrations"**
4. In Row 1, add these column headers (exactly as shown):
   ```
   Timestamp | Ret Rank | Family Name | First Name | MI | AFPSN | Date of Birth | Status | Spouse | Address | Cell Phone | Email | Date Entered | Location | RCDU | RCDG | Last Unit | Last Location | Retirement Date | Admission Date | Signature Date | Signature
   ```

### STEP 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste the following code:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    if (data.action === 'delete') {
      // Handle delete request
      const values = sheet.getDataRange().getValues();
      for (let i = 1; i < values.length; i++) {
        if (values[i][0] === data.timestamp) {
          sheet.deleteRow(i + 1);
          return ContentService.createTextOutput(JSON.stringify({success: true}))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
    } else {
      // Handle registration submission
      sheet.appendRow([
        data.timestamp,
        data.retRank,
        data.familyName,
        data.firstName,
        data.mi,
        data.afpsn,
        data.dateOfBirth,
        data.status,
        data.spouse,
        data.address,
        data.cellPhone,
        data.email,
        data.dateEntered,
        data.location,
        data.rcdu,
        data.rcdg,
        data.lastUnit,
        data.lastLocation,
        data.retirementDate,
        data.admissionDate,
        data.signatureDate,
        data.signature
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const jsonData = rows.map(row => {
    let obj = {};
    headers.forEach((header, index) => {
      obj[header.toLowerCase().replace(/ /g, '')] = row[index];
    });
    return obj;
  });
  
  return ContentService.createTextOutput(JSON.stringify(jsonData))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **"Deploy"** → **"New deployment"**
5. Click the gear icon ⚙️ → Select **"Web app"**
6. Configure:
   - **Description:** "ROTC Registration System"
   - **Execute as:** "Me"
   - **Who has access:** "Anyone"
7. Click **"Deploy"**
8. Click **"Authorize access"** and follow the prompts
9. **IMPORTANT:** Copy the **Web app URL** (it looks like: `https://script.google.com/macros/s/...`)

### STEP 3: Set Up GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click **"+"** → **"New repository"**
3. Repository settings:
   - Name: `rotc-registration` (or your preferred name)
   - Description: "11RCDG ROTC Cadet Registration System"
   - **Public** (required for GitHub Pages)
   - ✅ Check "Add a README file"
4. Click **"Create repository"**

### STEP 4: Upload Files to GitHub

1. In your new repository, click **"Add file"** → **"Upload files"**
2. Drag and drop these files from your computer:
   - `index.html`
   - `style.css`
   - `script.js`
   - `admin.html`
   - `admin-style.css`
   - `admin-script.js`
3. Write commit message: "Initial upload - ROTC registration system"
4. Click **"Commit changes"**

### STEP 5: Update Script Files with Your Google Apps Script URL

1. In GitHub, click on **`script.js`**
2. Click the **pencil icon** (Edit)
3. Find this line:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
4. Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your actual URL from Step 2
5. Click **"Commit changes"**

6. Repeat for **`admin-script.js`**:
   - Edit the file
   - Replace the URL
   - Commit changes

### STEP 6: Enable GitHub Pages

1. In your repository, click **"Settings"**
2. Scroll down to **"Pages"** (in the left sidebar)
3. Under **"Source"**, select:
   - Branch: **`main`**
   - Folder: **`/ (root)`**
4. Click **"Save"**
5. Wait 2-3 minutes for deployment
6. Your website will be available at:
   ```
   https://YOUR-USERNAME.github.io/rotc-registration/
   ```

### STEP 7: Access Your Website

**Public Registration Form:**
```
https://YOUR-USERNAME.github.io/rotc-registration/
```

**Admin Dashboard:**
```
https://YOUR-USERNAME.github.io/rotc-registration/admin.html
```

**Default Admin Login:**
- Username: `admin`
- Password: `rotc2024`

⚠️ **IMPORTANT:** Change the admin password in `admin-script.js` before going live!

---

## 🎨 Customization Options

### Change Admin Password

1. Edit `admin-script.js`
2. Find:
   ```javascript
   const ADMIN_CREDENTIALS = {
       username: 'admin',
       password: 'rotc2024'
   };
   ```
3. Change to your preferred credentials
4. Commit the changes

### Add Your School Logo

1. Prepare a square logo image (120x120px recommended)
2. Upload to your repository
3. Edit `index.html`
4. Find `<div class="logo-placeholder">`
5. Replace with:
   ```html
   <img src="your-logo.png" alt="School Logo" style="width: 120px; height: 120px;">
   ```

### Change Color Scheme

Edit `style.css`:
- Find `.container` → change `background: linear-gradient(...)`
- Army green: `#2d5016`
- Gold accent: `#d4af37`

---

## 📱 Using a Custom Domain (Optional)

If you want a custom URL like `rotc.yourschool.edu`:

1. Purchase a domain from any registrar
2. In your repository **Settings** → **Pages**
3. Under **"Custom domain"**, enter your domain
4. Follow GitHub's instructions for DNS configuration

---

## 🔐 Security Notes

- Change the admin password immediately
- Never share your Google Apps Script URL publicly
- Keep your Google Sheet private
- Regularly backup your data

---

## 📊 How to View Registrations

1. Go to your **Admin Dashboard**
2. Login with credentials
3. View all registrations in the table
4. Use search to find specific cadets
5. Click "View" to see full details
6. Click "Export to CSV" to download all data

---

## 🆘 Troubleshooting

**Problem:** "Registration submitted" but data not appearing in Google Sheet
- Check if you updated the Google Script URL correctly
- Verify the Apps Script is deployed as "Anyone" can access
- Check Google Sheet permissions

**Problem:** Admin login not working
- Verify username/password in `admin-script.js`
- Check browser console for errors (F12)

**Problem:** Website not loading on GitHub Pages
- Wait 5-10 minutes after enabling Pages
- Check that all files are in the root directory
- Verify repository is Public

---

## 📞 Support

For issues or questions:
1. Check this README first
2. Review error messages in browser console (F12)
3. Verify all steps were completed correctly

---

## ✅ Pre-Launch Checklist

- [ ] Google Sheet created with correct headers
- [ ] Apps Script deployed and URL copied
- [ ] GitHub repository created
- [ ] All files uploaded to GitHub
- [ ] Script URLs updated in both .js files
- [ ] GitHub Pages enabled
- [ ] Website loads correctly
- [ ] Test registration submission
- [ ] Data appears in Google Sheet
- [ ] Admin login works
- [ ] Admin dashboard shows data
- [ ] Admin password changed from default

---

## 📄 File Structure

```
rotc-registration/
├── index.html          (Public registration form)
├── style.css           (Form styling)
├── script.js           (Form functionality)
├── admin.html          (Admin dashboard)
├── admin-style.css     (Dashboard styling)
├── admin-script.js     (Dashboard functionality)
└── README.md           (This file)
```

---

**🎖️ Your ROTC registration system is now ready to use!**
