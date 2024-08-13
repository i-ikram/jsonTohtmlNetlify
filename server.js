require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

const invoiceData = {
    companyDetails: {
        address: "PO Box XXXX, Dubai, United Arab Emirates",
        phone: "+971 xx xxxxxx",
        email: "email@email.com",
        trn: "XXXXXXXXXXXXX"
    },
    invoice: {
        clientId: "CIN 10009",
        invoiceNo: "INV-10000027",
        invoiceDate: "-",
        sailingDate: "May 31, 2024",
        vessel: "Mv Ghazi",
        voyage: "GH2001",
        portOfLoading: "PKKHI",
        portOfDischarge: "OMSOH"
    },
    billing: {
        billedTo: "Nagasaki",
        trn: "-",
        address: "-",
        bookingParty: "Nagasaki",
        quotedParty: "Nagasaki",
        polAgent: "Modern Shipping Agencies",
        podAgent: "Federal Shipping Agents Private Limited"
    }
};

// Serve static files (e.g., logo images)
app.use(express.static('public'));

// Endpoint to serve the HTML
app.get('/invoice', (req, res) => {
    const templatePath = path.join(__dirname, 'invoice.html');

    // Read the HTML template
    fs.readFile(templatePath, 'utf8', (err, htmlContent) => {
        if (err) {
            return res.status(500).send('Error loading the template');
        }

        // Replace placeholders with actual data
        Object.keys(invoiceData).forEach(key => {
            if (typeof invoiceData[key] === 'object') {
                Object.keys(invoiceData[key]).forEach(subKey => {
                    const placeholder = `{{${key}.${subKey}}}`;
                    htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), invoiceData[key][subKey]);
                });
            } else {
                const placeholder = `{{${key}}}`;
                htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), invoiceData[key]);
            }
        });

        res.send(htmlContent);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
