// AR Business Card Viewer - Main Application JavaScript

// DOM Elements
const elements = {
    // Sections
    onboarding: document.getElementById('onboarding'),
    scanner: document.getElementById('scanner'),
    profileView: document.getElementById('profile-view'),
    savedContacts: document.getElementById('saved-contacts'),
    settings: document.getElementById('settings'),
    
    // Buttons
    startScanner: document.getElementById('start-scanner'),
    exitScanner: document.getElementById('exit-scanner'),
    toggleFlash: document.getElementById('toggle-flash'),
    backToScanner: document.getElementById('back-to-scanner'),
    saveContact: document.getElementById('save-contact'),
    shareContact: document.getElementById('share-contact'),
    addNotes: document.getElementById('add-notes'),
    
    // Navigation Buttons
    navScan: document.getElementById('nav-scan'),
    navContacts: document.getElementById('nav-contacts'),
    navSettings: document.getElementById('nav-settings'),
    navScanFromSettings: document.getElementById('nav-scan-from-settings'),
    navContactsFromSettings: document.getElementById('nav-contacts-from-settings'),
    navSettingsFromSettings: document.getElementById('nav-settings-from-settings'),
    
    // Settings Elements
    darkModeToggle: document.getElementById('dark-mode-toggle'),
    notificationsToggle: document.getElementById('notifications-toggle'),
    autoSaveToggle: document.getElementById('auto-save-toggle'),
    vibrationToggle: document.getElementById('vibration-toggle'),
    accountSettings: document.getElementById('account-settings'),
    exportContacts: document.getElementById('export-contacts'),
    privacyPolicy: document.getElementById('privacy-policy'),
    termsOfService: document.getElementById('terms-of-service'),
    
    // Profile Elements
    contactPhoto: document.getElementById('contact-photo'),
    contactName: document.getElementById('contact-name'),
    contactTitle: document.getElementById('contact-title'),
    contactCompany: document.getElementById('contact-company'),
    contactPhone: document.getElementById('contact-phone'),
    contactEmail: document.getElementById('contact-email'),
    contactWebsite: document.getElementById('contact-website'),
    contactAddress: document.getElementById('contact-address'),
    
    // Contacts List
    contactsList: document.getElementById('contacts-list'),
    searchContacts: document.getElementById('search-contacts'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastIcon: document.getElementById('toast-icon'),
    toastMessage: document.getElementById('toast-message')
};

// Application State
const appState = {
    currentSection: 'onboarding',
    flashEnabled: false,
    darkModeEnabled: false,
    notificationsEnabled: true,
    autoSaveEnabled: false,
    vibrationEnabled: true,
    contacts: [],
    currentContact: null,
    isScanning: false
};

// Load saved settings from localStorage
function loadSettings() {
    const savedSettings = localStorage.getItem('arBusinessCardSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        appState.darkModeEnabled = settings.darkModeEnabled || false;
        appState.notificationsEnabled = settings.notificationsEnabled !== false;
        appState.autoSaveEnabled = settings.autoSaveEnabled || false;
        appState.vibrationEnabled = settings.vibrationEnabled !== false;
        
        // Apply loaded settings to UI
        elements.darkModeToggle.checked = appState.darkModeEnabled;
        elements.notificationsToggle.checked = appState.notificationsEnabled;
        elements.autoSaveToggle.checked = appState.autoSaveEnabled;
        elements.vibrationToggle.checked = appState.vibrationEnabled;
        
        // Apply dark mode if enabled
        if (appState.darkModeEnabled) {
            document.body.classList.add('dark-mode');
        }
    }
}

// Load contacts from localStorage
function loadContacts() {
    const savedContacts = localStorage.getItem('arBusinessCardContacts');
    if (savedContacts) {
        appState.contacts = JSON.parse(savedContacts);
        renderContactsList();
    }
}

// Save settings to localStorage
function saveSettings() {
    const settings = {
        darkModeEnabled: appState.darkModeEnabled,
        notificationsEnabled: appState.notificationsEnabled,
        autoSaveEnabled: appState.autoSaveEnabled,
        vibrationEnabled: appState.vibrationEnabled
    };
    localStorage.setItem('arBusinessCardSettings', JSON.stringify(settings));
}

// Save contacts to localStorage
function saveContacts() {
    localStorage.setItem('arBusinessCardContacts', JSON.stringify(appState.contacts));
}

// Change active section
function showSection(sectionId) {
    // Hide all sections
    [elements.onboarding, elements.scanner, elements.profileView, elements.savedContacts, elements.settings]
        .forEach(section => {
            if (section) {
                section.classList.remove('active-section');
            }
        });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active-section');
        appState.currentSection = sectionId;
        
        // Handle specific section activations
        if (sectionId === 'scanner') {
            startARScanner();
        } else if (sectionId === 'saved-contacts') {
            renderContactsList();
        }
    }
    
    // Update navigation buttons
    updateNavigationState();
}

// Update navigation button states based on current section
function updateNavigationState() {
    // Reset all navigation buttons
    [elements.navScan, elements.navContacts, elements.navSettings, 
     elements.navScanFromSettings, elements.navContactsFromSettings, elements.navSettingsFromSettings]
        .forEach(btn => {
            if (btn) btn.classList.remove('active');
        });
    
    // Set active navigation button based on current section
    switch (appState.currentSection) {
        case 'scanner':
            if (elements.navScan) elements.navScan.classList.add('active');
            if (elements.navScanFromSettings) elements.navScanFromSettings.classList.add('active');
            break;
        case 'saved-contacts':
            if (elements.navContacts) elements.navContacts.classList.add('active');
            if (elements.navContactsFromSettings) elements.navContactsFromSettings.classList.add('active');
            break;
        case 'settings':
            if (elements.navSettings) elements.navSettings.classList.add('active');
            if (elements.navSettingsFromSettings) elements.navSettingsFromSettings.classList.add('active');
            break;
    }
}

// Show toast message
function showToast(message, isError = false) {
    if (elements.toast && elements.toastMessage && elements.toastIcon) {
        elements.toastMessage.textContent = message;
        elements.toastIcon.textContent = isError ? '✕' : '✓';
        elements.toastIcon.className = isError ? 'toast-icon error' : 'toast-icon';
        elements.toast.classList.add('show');
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            elements.toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize AR Scanner
function startARScanner() {
    appState.isScanning = true;
    
    // In a real app, we would initialize the AR library and camera here
    console.log('AR Scanner started');
    
    // For demo purposes, let's simulate finding a business card after a delay
    setTimeout(() => {
        if (appState.isScanning) {
            // Simulate vibration if enabled
            if (appState.vibrationEnabled && navigator.vibrate) {
                navigator.vibrate(200);
            }
            
            // Simulate finding a business card
            simulateCardDetection();
        }
    }, 3000);
}

// Stop AR Scanner
function stopARScanner() {
    appState.isScanning = false;
    
    // In a real app, we would clean up AR resources here
    console.log('AR Scanner stopped');
}

// Simulate detecting a business card
function simulateCardDetection() {
    // Create a sample contact data
    const sampleContact = {
        id: Date.now(),
        name: 'John Doe',
        title: 'Product Designer',
        company: 'TechCorp Inc.',
        phone: '+1 (555) 123-4567',
        email: 'john.doe@techcorp.com',
        website: 'www.johndoe.com',
        address: '123 Tech Street, San Francisco, CA 94107',
        photo: 'https://randomuser.me/api/portraits/men/32.jpg',
        social: {
            linkedin: 'linkedin.com/in/johndoe',
            twitter: 'twitter.com/johndoe',
            github: 'github.com/johndoe'
        },
        dateAdded: new Date().toISOString()
    };
    
    // Set as current contact
    appState.currentContact = sampleContact;
    
    // Display the contact details
    displayContactDetails(sampleContact);
    
    // Auto-save if enabled
    if (appState.autoSaveEnabled) {
        saveCurrentContact();
    }
    
    // Switch to the profile view
    showSection('profile-view');
}

// Display contact details in the profile view
function displayContactDetails(contact) {
    if (contact) {
        // Set photo
        if (elements.contactPhoto && contact.photo) {
            elements.contactPhoto.src = contact.photo;
        }
        
        // Set text content
        if (elements.contactName) elements.contactName.textContent = contact.name || '';
        if (elements.contactTitle) elements.contactTitle.textContent = contact.title || '';
        if (elements.contactCompany) elements.contactCompany.textContent = contact.company || '';
        if (elements.contactPhone) elements.contactPhone.textContent = contact.phone || '';
        if (elements.contactEmail) elements.contactEmail.textContent = contact.email || '';
        if (elements.contactWebsite) elements.contactWebsite.textContent = contact.website || '';
        if (elements.contactAddress) elements.contactAddress.textContent = contact.address || '';
    }
}

// Save current contact to contacts list
function saveCurrentContact() {
    if (appState.currentContact) {
        // Check if contact already exists by id
        const existingIndex = appState.contacts.findIndex(c => c.id === appState.currentContact.id);
        
        if (existingIndex >= 0) {
            // Update existing contact
            appState.contacts[existingIndex] = appState.currentContact;
        } else {
            // Add new contact
            appState.contacts.push(appState.currentContact);
        }
        
        // Save contacts to localStorage
        saveContacts();
        
        // Show success toast
        showToast('Contact saved successfully!');
        
        // Show notification if enabled
        if (appState.notificationsEnabled && 'Notification' in window) {
            if (Notification.permission === 'granted') {
                new Notification('Contact Saved', {
                    body: `${appState.currentContact.name} has been added to your contacts`,
                    icon: appState.currentContact.photo
                });
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission();
            }
        }
    }
}

// Render contacts list in the saved contacts section
function renderContactsList() {
    if (elements.contactsList) {
        // Clear current list
        elements.contactsList.innerHTML = '';
        
        // Get search term
        const searchTerm = elements.searchContacts ? elements.searchContacts.value.toLowerCase() : '';
        
        // Filter contacts based on search term
        const filteredContacts = searchTerm ? 
            appState.contacts.filter(contact => 
                contact.name.toLowerCase().includes(searchTerm) || 
                contact.company.toLowerCase().includes(searchTerm) ||
                contact.title.toLowerCase().includes(searchTerm)
            ) : 
            [...appState.contacts];
        
        // Sort contacts by name
        filteredContacts.sort((a, b) => a.name.localeCompare(b.name));
        
        if (filteredContacts.length === 0) {
            // Show empty state
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <div class="empty-icon">📇</div>
                <h3>No contacts found</h3>
                <p>${searchTerm ? 'Try a different search term' : 'Scan a business card to add contacts'}</p>
            `;
            elements.contactsList.appendChild(emptyState);
        } else {
            // Create contact items
            filteredContacts.forEach(contact => {
                const contactItem = document.createElement('div');
                contactItem.className = 'contact-item';
                contactItem.dataset.id = contact.id;
                
                contactItem.innerHTML = `
                    <div class="contact-avatar">
                        <img src="${contact.photo || 'placeholder-avatar.jpg'}" alt="${contact.name}">
                    </div>
                    <div class="contact-info">
                        <p class="contact-name">${contact.name}</p>
                        <p class="contact-position">${contact.title} at ${contact.company}</p>
                    </div>
                    <div class="contact-actions">
                        <button class="contact-action view-contact" data-id="${contact.id}">👁️</button>
                        <button class="contact-action delete-contact" data-id="${contact.id}">🗑️</button>
                    </div>
                `;
                
                elements.contactsList.appendChild(contactItem);
                
                // Add click event listener for viewing contact
                const viewButton = contactItem.querySelector('.view-contact');
                if (viewButton) {
                    viewButton.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const contactId = Number(e.target.dataset.id);
                        viewContact(contactId);
                    });
                }
                
                // Add click event listener for deleting contact
                const deleteButton = contactItem.querySelector('.delete-contact');
                if (deleteButton) {
                    deleteButton.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const contactId = Number(e.target.dataset.id);
                        deleteContact(contactId);
                    });
                }
                
                // Make the whole item clickable to view contact
                contactItem.addEventListener('click', () => {
                    const contactId = Number(contactItem.dataset.id);
                    viewContact(contactId);
                });
            });
        }
    }
}

// View a contact from the contacts list
function viewContact(contactId) {
    const contact = appState.contacts.find(c => c.id === contactId);
    if (contact) {
        appState.currentContact = contact;
        displayContactDetails(contact);
        showSection('profile-view');
    }
}

// Delete a contact
function deleteContact(contactId) {
    // Find contact index
    const contactIndex = appState.contacts.findIndex(c => c.id === contactId);
    
    if (contactIndex >= 0) {
        // Get contact name for toast message
        const contactName = appState.contacts[contactIndex].name;
        
        // Remove contact from array
        appState.contacts.splice(contactIndex, 1);
        
        // Save updated contacts list
        saveContacts();
        
        // Update the contacts list UI
        renderContactsList();
        
        // Show success toast
        showToast(`${contactName} removed from contacts`);
    }
}

// Toggle dark mode
function toggleDarkMode() {
    appState.darkModeEnabled = !appState.darkModeEnabled;
    
    if (appState.darkModeEnabled) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    // Save settings
    saveSettings();
}

// Toggle flash for AR scanner
function toggleFlash() {
    appState.flashEnabled = !appState.flashEnabled;
    
    // In a real app, we would actually toggle the device flash here
    console.log(`Flash ${appState.flashEnabled ? 'enabled' : 'disabled'}`);
    
    // Update UI to show flash state
    if (elements.toggleFlash) {
        elements.toggleFlash.textContent = appState.flashEnabled ? '💡✓' : '💡';
    }
}

// Handle actions on contact details
function handleContactAction(action, value) {
    switch (action) {
        case 'call':
            window.open(`tel:${value}`);
            break;
        case 'email':
            window.open(`mailto:${value}`);
            break;
        case 'visit':
            window.open(`https://${value.replace(/^https?:\/\//, '')}`);
            break;
        case 'map':
            window.open(`https://maps.google.com/?q=${encodeURIComponent(value)}`);
            break;
    }
}

// Share current contact
function shareContact() {
    if (appState.currentContact && navigator.share) {
        const contact = appState.currentContact;
        const shareData = {
            title: `Contact: ${contact.name}`,
            text: `${contact.name}\n${contact.title} at ${contact.company}\nPhone: ${contact.phone}\nEmail: ${contact.email}\nWebsite: ${contact.website}`,
            url: window.location.href
        };
        
        navigator.share(shareData)
            .then(() => showToast('Contact shared successfully!'))
            .catch(error => {
                console.error('Error sharing contact:', error);
                showToast('Failed to share contact', true);
            });
    } else {
        showToast('Sharing not supported on this browser', true);
    }
}

// Export contacts as CSV
function exportContactsAsCSV() {
    if (appState.contacts.length === 0) {
        showToast('No contacts to export', true);
        return;
    }
    
    // Create CSV content
    const headers = ['Name', 'Title', 'Company', 'Phone', 'Email', 'Website', 'Address', 'Date Added'];
    const csvRows = [headers.join(',')];
    
    appState.contacts.forEach(contact => {
        const row = [
            `"${contact.name}"`,
            `"${contact.title}"`,
            `"${contact.company}"`,
            `"${contact.phone}"`,
            `"${contact.email}"`,
            `"${contact.website}"`,
            `"${contact.address}"`,
            `"${new Date(contact.dateAdded).toLocaleDateString()}"`
        ];
        csvRows.push(row.join(','));
    });
    
    const csvContent = csvRows.join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `contacts_export_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast(`${appState.contacts.length} contacts exported successfully!`);
}

// Setup event listeners
function setupEventListeners() {
    // Onboarding
    if (elements.startScanner) {
        elements.startScanner.addEventListener('click', () => {
            showSection('scanner');
        });
    }
    
    // Scanner
    if (elements.exitScanner) {
        elements.exitScanner.addEventListener('click', () => {
            stopARScanner();
            showSection('onboarding');
        });
    }
    
    if (elements.toggleFlash) {
        elements.toggleFlash.addEventListener('click', toggleFlash);
    }
    
    // Profile View
    if (elements.backToScanner) {
        elements.backToScanner.addEventListener('click', () => {
            showSection('scanner');
        });
    }
    
    if (elements.saveContact) {
        elements.saveContact.addEventListener('click', saveCurrentContact);
    }
    
    if (elements.shareContact) {
        elements.shareContact.addEventListener('click', shareContact);
    }
    
    // Add action event listeners for contact details
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const valueElement = btn.closest('.detail-item').querySelector('.detail-value');
            if (valueElement) {
                handleContactAction(action, valueElement.textContent);
            }
        });
    });
    
    // Social buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (appState.currentContact && appState.currentContact.social) {
                const platform = btn.dataset.platform;
                const url = appState.currentContact.social[platform];
                if (url) {
                    window.open(`https://${url.replace(/^https?:\/\//, '')}`);
                }
            }
        });
    });
    
    // Navigation
    if (elements.navScan) {
        elements.navScan.addEventListener('click', () => {
            showSection('scanner');
        });
    }
    
    if (elements.navContacts) {
        elements.navContacts.addEventListener('click', () => {
            showSection('saved-contacts');
        });
    }
    
    if (elements.navSettings) {
        elements.navSettings.addEventListener('click', () => {
            showSection('settings');
        });
    }
    
    if (elements.navScanFromSettings) {
        elements.navScanFromSettings.addEventListener('click', () => {
            showSection('scanner');
        });
    }
    
    if (elements.navContactsFromSettings) {
        elements.navContactsFromSettings.addEventListener('click', () => {
            showSection('saved-contacts');
        });
    }
    
    // Settings
    if (elements.darkModeToggle) {
        elements.darkModeToggle.addEventListener('change', () => {
            appState.darkModeEnabled = elements.darkModeToggle.checked;
            toggleDarkMode();
        });
    }
    
    if (elements.notificationsToggle) {
        elements.notificationsToggle.addEventListener('change', () => {
            appState.notificationsEnabled = elements.notificationsToggle.checked;
            saveSettings();
            
            // Request notification permission if enabled
            if (appState.notificationsEnabled && 'Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                Notification.requestPermission();
            }
        });
    }
    
    if (elements.autoSaveToggle) {
        elements.autoSaveToggle.addEventListener('change', () => {
            appState.autoSaveEnabled = elements.autoSaveToggle.checked;
            saveSettings();
        });
    }
    
    if (elements.vibrationToggle) {
        elements.vibrationToggle.addEventListener('change', () => {
            appState.vibrationEnabled = elements.vibrationToggle.checked;
            saveSettings();
        });
    }
    
    if (elements.exportContacts) {
        elements.exportContacts.addEventListener('click', exportContactsAsCSV);
    }
    
    // Search contacts
    if (elements.searchContacts) {
        elements.searchContacts.addEventListener('input', renderContactsList);
    }
}

// Initialize application
function initApp() {
    // Load settings from localStorage
    loadSettings();
    
    // Load contacts from localStorage
    loadContacts();
    
    // Setup event listeners
    setupEventListeners();
    
    // Show initial section
    showSection('onboarding');
    
    // Request notification permission if enabled
    if (appState.notificationsEnabled && 'Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission();
    }
    
    console.log('AR Business Card Viewer initialized!');
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp); 