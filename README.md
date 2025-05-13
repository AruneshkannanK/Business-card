# AR Business Card Viewer

A web-based augmented reality application that allows users to scan business cards and view digital contact information.

## Features

- Scan business cards using AR technology
- View detailed contact information
- Save and manage contacts
- Dark mode support
- Export contacts as CSV
- Share contacts with others

## Technology Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- A-Frame for AR functionality
- AR.js for marker-based augmented reality

## Getting Started

1. Clone this repository
2. Create a folder named `patterns` in the root directory
3. Add a business card marker pattern file named `business-card-marker.patt` in the patterns folder
   - You can create a custom marker at [AR.js Marker Training](https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html)
4. Create a placeholder avatar image named `placeholder-avatar.jpg` 
5. Open `index.html` in a web browser with camera permissions enabled

## Usage

1. Click "Start Scanning" on the onboarding screen
2. Point your camera at a business card
3. The app will detect the card and display the contact information
4. Save the contact to add it to your contacts list
5. View and manage your contacts in the Contacts section

## License

MIT License

## Note

This is a prototype application. In a production environment, you would need:

1. A server component for storing and retrieving contact data
2. More robust AR detection capabilities
3. Additional security measures for user data
4. Proper authentication system for user accounts 