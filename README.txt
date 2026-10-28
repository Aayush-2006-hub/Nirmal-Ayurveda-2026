# Nirmal Ayurveda Website

A responsive static product website for Nirmal Ayurveda, using the product poster images provided.

## Included products and poster prices
- Utane — ₹80
- Magic Hamper of 3 — ₹300
- Abhyang Oil — ₹100
- Handmade Herbal Soap — ₹80
- Handcrafted Herbal Soap — ₹120

## How to use
1. Extract the ZIP file.
2. Open `index.html` in a browser to preview the website.
3. To publish it, upload the entire extracted folder (including the `images` folder) to a static hosting service such as GitHub Pages, Netlify, or your web host.

## WhatsApp ordering
Customers choose quantities and press **Order on WhatsApp**. The website opens WhatsApp with a pre-filled order summary addressed to `+91 84591 51065`. The customer must press **Send** in WhatsApp; the website does not send messages silently.

## Customization
- Prices and product names are in `index.html`.
- WhatsApp number is in `script.js` as `WHATSAPP_NUMBER`.
- Styling is in `style.css`.
- Product poster images are in `images/`.

This is a static website, so it does not store orders or calculate delivery charges. Confirm availability, delivery and payment details with customers on WhatsApp.

Customer name: Customers must enter their name before opening the WhatsApp order message. Their name is included in the pre-filled order summary.
