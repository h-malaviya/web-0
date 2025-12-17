# Web Registration and Contact Form System

A web application that integrates with Google Sheets to store registration and contact form data using Google Apps Script and JavaScript fetch API.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Google Sheets Integration](#google-sheets-integration)
- [How It Works](#how-it-works)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features

- **Registration Form**: Secure user registration with data validation
- **Contact Form**: User-friendly contact form to collect inquiries
- **Real-time Data Storage**: Instant submission to Google Sheets
- **Responsive Design**: Mobile-friendly interface
- **Client-side Validation**: Input validation for better user experience
- **Google Apps Script Integration**: Seamless data transfer to Google Sheets

## Technologies Used

- **HTML5**: Semantic markup and form structure
- **CSS3**: Responsive styling and design
- **JavaScript (ES6)**: Client-side functionality and API integration
- **Google Apps Script (.gs)**: Server-side script for Google Sheets access
- **Fetch API**: Modern HTTP requests for data transmission
- **Google Sheets**: Cloud-based spreadsheet for data storage

## Google Sheets Integration

The application leverages Google Apps Script to securely send form data to a designated Google Sheet. The process involves:

1. Creating a Google Apps Script web application that accepts POST requests
2. Using `fetch()` API to send form data from the client-side to the deployed script
3. Processing the data in Google Apps Script and writing it to the target spreadsheet
4. Returning success/error responses to the client-side JavaScript

### Technical Flow
- User submits registration or contact form
- JavaScript validates the input data
- Fetch API sends the data to the Google Apps Script deployment URL
- Google Apps Script receives the data and appends it to the specified Google Sheet
- Success message displayed to the user upon completion

## How It Works

### Registration System
- The registration form collects user information such as name, email, password, etc.
- Data is validated on the client side before sending to Google Sheets
- Successfully registered entries are stored with timestamp in the Google Sheet

### Contact Form System
- The contact form captures visitor information and their message
- Includes fields for name, email, subject, and message
- Submitted data is appended to a separate sheet within the same workbook

### Data Security
- Form submissions are handled through Google Apps Script for secure processing
- Client-side validation prevents malformed data from being sent
- Google's authentication and authorization mechanisms protect the data

## Setup Instructions

### Prerequisites
- A Google account with access to Google Drive and Google Apps Script
- Basic knowledge of HTML/CSS/JS
- Access to web hosting for the front-end files

### Google Apps Script Setup

1. Open [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Replace the default code with the following:

```javascript
function doPost(e) {
  const sheetName = 'Form Responses'; // Name of your sheet
  const scriptProp = PropertiesService.getScriptProperties();
  const sheet = SpreadsheetApp.openById(scriptProp.getProperty('GOOGLE_SHEET_ID')).getSheetByName(sheetName);

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const nextRow = sheet.getLastRow() + 1;

  const newRow = headers.map(function(header) {
    return header.trim() !== '' ? (e.parameter[header] !== undefined ? e.parameter[header] : '') : '';
  });

  sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

  return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
    .setMimeType(ContentService.MimeType.JSON);
}

function setup() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  PropertiesService.getScriptProperties().setProperty('GOOGLE_SHEET_ID', sheet.getId());
}
```

4. Save the project
5. In the script editor, go to `Edit > Project properties > Script properties` and add a property:
   - Key: `GOOGLE_SHEET_ID`
   - Value: The ID of your target Google Sheet (found in the URL of your Google Sheet)

6. Deploy the script as a web app:
   - Click "Deploy" > "New deployment"
   - Choose "Web app" as the type
   - Configure as needed (typically "Execute as me" and "Anyone" access)
   - Copy the provided deployment URL

### Frontend Configuration

1. Update the fetch API endpoint in your JavaScript files (`register_script.js` and any contact form scripts):
```javascript
const googleAppsScriptUrl = 'YOUR_DEPLOYED_SCRIPT_URL_HERE';

fetch(googleAppsScriptUrl, {
  method: 'POST',
  body: JSON.stringify(formData),
  headers: {
    'Content-Type': 'application/json'
  }
})
```

2. Adjust form validation and success/error handling as needed
3. Test the form submission to ensure data is correctly sent to Google Sheets

## Usage

### Registration Form
1. Navigate to `register.html`
2. Fill in the required information
3. Submit the form to register your account
4. Check your Google Sheet to confirm the entry

### Contact Form
1. Access the contact form (likely part of home.html)
2. Enter your details and message
3. Submit the form
4. Verify the entry in the designated sheet

## Project Structure

```
web-project/
├── home.html                 # Main landing page with contact form
├── register.html             # User registration form
├── README.md                 # Project documentation (this file)
├── css/
│   ├── home_style.css        # Styling for main page
│   └── register_style.css    # Styling for registration page
├── script/
│   ├── home_script.js        # JavaScript for main page and contact form
│   └── register_script.js    # JavaScript for registration form and Google Sheets integration
├── static/
│   └── bg.jpg                # Background image for the website
└── .git/                     # Git version control directory
```

## Customization

### Adding Form Fields
1. Update the HTML form with new input fields
2. Modify the JavaScript to include the new fields in the data object
3. Update your Google Sheet headers to match the new field names

### Changing Sheet Names
1. Update the `sheetName` variable in the Google Apps Script
2. Ensure the Google Sheet structure matches your expected headers

### Styling Updates
- Modify the CSS files to adjust the appearance
- Customize colors, fonts, and layout through `register_style.css` and `home_style.css`

### Global JavaScript Functions
- If needed, create a global script file for shared utility functions
- Place it in the `script/` directory and reference it in your HTML files

## Troubleshooting

### Common Issues
- **CORS Errors**: Ensure your Google Apps Script deployment is properly configured
- **Data Not Appearing**: Check that the sheet name in the script matches your actual sheet
- **Validation Failures**: Verify all required fields are correctly populated
- **Deployment URL Issues**: Re-deploy the script and update the URL in your JavaScript

### Debugging Tips
1. Check browser console for JavaScript errors
2. Verify Google Apps Script execution logs in the script editor
3. Ensure the Google Sheet is shared appropriately
4. Test the Google Apps Script deployment independently using the GET method
5. Validate that form field names match the expected headers in your Google Sheet

## License

This project is free to use, modify, and distribute. Feel free to customize it according to your needs.
