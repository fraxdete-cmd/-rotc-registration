# 🚀 QUICK START GUIDE - Get Your ROTC Website Live in 15 Minutes!

## What You're Getting

✅ Professional ROTC cadet registration form  
✅ Admin dashboard to view all registrations  
✅ Automatic data storage in Google Sheets  
✅ Search, filter, and export capabilities  
✅ Army-themed professional design  
✅ Mobile-friendly responsive layout  

---

## 3 SIMPLE STEPS TO GO LIVE

### 📊 STEP 1: Create Your Data Storage (5 minutes)

1. **Open Google Sheets:** https://sheets.google.com
2. **Create new spreadsheet** → Name it "ROTC Registrations"
3. **Add column headers** in Row 1:
   ```
   Timestamp | Ret Rank | Family Name | First Name | MI | AFPSN | Date of Birth | Status | Spouse | Address | Cell Phone | Email | Date Entered | Location | RCDU | RCDG | Last Unit | Last Location | Retirement Date | Admission Date | Signature Date | Signature
   ```
4. **Go to Extensions → Apps Script**
5. **Delete** any code you see
6. **Copy-paste** the code from `google-apps-script.txt` (included in files)
7. **Click Deploy → New Deployment**
8. **Select "Web app"**
9. **Set "Who has access" to "Anyone"**
10. **Copy the URL** you get (looks like: https://script.google.com/macros/s/...)

### 🌐 STEP 2: Upload to GitHub (5 minutes)

1. **Go to GitHub:** https://github.com
2. **Create account** (if you don't have one - it's free!)
3. **Click "+" → New repository**
4. **Name it:** `rotc-registration`
5. **Make it Public** ✅
6. **Click "Create repository"**
7. **Click "uploading an existing file"**
8. **Drag all 6 files** from this folder into GitHub
9. **Click "Commit changes"**

### 🔧 STEP 3: Connect & Activate (5 minutes)

1. **In GitHub, open `script.js`**
2. **Click pencil icon** to edit
3. **Find line 83:** `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';`
4. **Replace** with your URL from Step 1
5. **Click "Commit changes"**

6. **Repeat for `admin-script.js`** (same process, line 9)

7. **Go to Settings → Pages** (left sidebar)
8. **Under Source, select:** Branch: `main`, Folder: `/ (root)`
9. **Click Save**
10. **Wait 2-3 minutes**

---

## 🎉 YOU'RE LIVE!

Your website is now at:
```
https://YOUR-USERNAME.github.io/rotc-registration/
```

**Admin Dashboard:**
```
https://YOUR-USERNAME.github.io/rotc-registration/admin.html
```

**Login:** Username: `admin` | Password: `rotc2024`

⚠️ **CHANGE THE PASSWORD** in `admin-script.js` before sharing!

---

## 📱 Test Your Website

1. **Open your registration form**
2. **Fill out a test registration**
3. **Check your Google Sheet** - you should see the data!
4. **Login to admin dashboard**
5. **See your test registration** in the table

---

## 🎨 Quick Customizations

**Add Your Logo:**
- Upload logo image to GitHub
- Edit `index.html`, replace logo placeholder with `<img src="your-logo.png">`

**Change Admin Password:**
- Edit `admin-script.js`
- Find `ADMIN_CREDENTIALS`
- Change username/password

**Change Colors:**
- Edit `style.css`
- Search for color codes like `#2d5016` (army green)
- Replace with your school colors

---

## 📋 What Each File Does

| File | Purpose |
|------|---------|
| `index.html` | Main registration form page |
| `style.css` | Makes the form look professional |
| `script.js` | Handles form submissions |
| `admin.html` | Admin dashboard page |
| `admin-style.css` | Dashboard styling |
| `admin-script.js` | Dashboard functionality |
| `README.md` | Detailed instructions |

---

## 🆘 Need Help?

**Registration not working?**
→ Check if you updated BOTH `script.js` AND `admin-script.js` with your Google Script URL

**Can't access website?**
→ Wait 5 minutes after enabling GitHub Pages, then refresh

**Data not showing in Google Sheet?**
→ Make sure Apps Script is deployed as "Anyone" can access

---

## ✅ Pre-Launch Checklist

- [ ] Created Google Sheet with headers
- [ ] Created and deployed Apps Script
- [ ] Copied the Web App URL
- [ ] Created GitHub repository (PUBLIC)
- [ ] Uploaded all 6 files
- [ ] Updated script.js with URL
- [ ] Updated admin-script.js with URL
- [ ] Enabled GitHub Pages
- [ ] Tested registration form
- [ ] Checked data in Google Sheet
- [ ] Tested admin login
- [ ] Changed admin password

---

**Need the detailed guide?** See `README.md` for complete instructions!

**Your professional ROTC registration system is ready to deploy! 🎖️**
