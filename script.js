// DOM Elements
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const conversionProgress = document.getElementById('conversionProgress');

// Feature data
const features = [
    {
        icon: '<svg viewBox="0 0 24 24"><path d="M13 19V7.83001L17.88 12.71C18.27 13.1 18.91 13.1 19.3 12.71C19.69 12.32 19.69 11.69 19.3 11.3L12.71 4.71001C12.32 4.32001 11.69 4.32001 11.3 4.71001L4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7C5.08997 13.09 5.71997 13.09 6.10997 12.7L11 7.83001V19C11 19.55 11.45 20 12 20C12.55 20 13 19.55 13 19Z" fill="currentColor"/></svg>',
        title: 'Lightning Fast',
        description: 'Convert PDFs to Word in under 10 seconds',
        color: '#eab308'
    },
    {
        icon: '<svg viewBox="0 0 24 24"><path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor"/></svg>',
        title: '100% Secure',
        description: 'Your files are automatically deleted after conversion',
        color: '#22c55e'
    },
    {
        icon: '<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.9 18.1 1.01 17 1.01ZM17 19H7V5H17V19Z" fill="currentColor"/></svg>',
        title: 'Mobile Friendly',
        description: 'Works perfectly on all devices and screen sizes',
        color: '#3b82f6'
    },
    {
        icon: '<svg viewBox="0 0 24 24"><path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="currentColor"/></svg>',
        title: 'High Quality',
        description: 'Preserve formatting, images, and text layout',
        color: '#a855f7'
    },
    {
        icon: '<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/></svg>',
        title: 'No Registration',
        description: 'Start converting immediately - no signup required',
        color: '#f97316'
    },
    {
        icon: '<svg viewBox="0 0 24 24"><path d="M19 9H15V3H9V9H5L12 16L19 9ZM5 18V20H19V18H5Z" fill="currentColor"/></svg>',
        title: 'Free Forever',
        description: 'No hidden fees, no watermarks, completely free',
        color: '#14b8a6'
    }
];

// Initialize features grid
function initializeFeatures() {
    const featuresGrid = document.querySelector('.features-grid');
    features.forEach(feature => {
        const featureCard = document.createElement('div');
        featureCard.className = 'feature-card';
        featureCard.innerHTML = `
            <div class="feature-icon" style="color: ${feature.color}">${feature.icon}</div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        `;
        featuresGrid.appendChild(featureCard);
    });
}

// File validation
function validateFile(file) {
    if (file.type !== 'application/pdf') {
        return 'Please select a PDF file only.';
    }
    
    if (file.size > 20 * 1024 * 1024) { // 20MB
        return 'File size must be less than 20MB.';
    }
    
    return null;
}

// Handle file selection
function handleFileSelect(file) {
    const error = validateFile(file);
    if (error) {
        showError(error);
        return;
    }

    startConversion(file);
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <svg viewBox="0 0 24 24" class="error-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
        </svg>
        <span>${message}</span>
    `;
    uploadZone.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
}

// Start conversion process
function startConversion(file) {
    uploadZone.hidden = true;
    conversionProgress.hidden = false;

    // Show conversion interface
    conversionProgress.innerHTML = `
        <div class="conversion-status">
            <h3>Converting ${file.name}</h3>
            <p>Please wait while we process your file...</p>
            <div class="progress-bar">
                <div class="progress-bar-fill" style="width: 0%"></div>
            </div>
        </div>
    `;

    // Simulate conversion process
    let progress = 0;
    const progressBar = conversionProgress.querySelector('.progress-bar-fill');
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            conversionComplete(file);
        }
        progressBar.style.width = `${progress}%`;
    }, 500);
}

// Handle conversion completion
function conversionComplete(file) {
    const wordContent = generateWordContent(file.name);
    const blob = new Blob([wordContent], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    const downloadUrl = URL.createObjectURL(blob);

    conversionProgress.innerHTML = `
        <div class="conversion-complete">
            <svg viewBox="0 0 24 24" class="success-icon">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#22c55e"/>
            </svg>
            <h3>Conversion Complete!</h3>
            <p>Your file has been successfully converted.</p>
            <div class="action-buttons">
                <a href="${downloadUrl}" download="${file.name.replace('.pdf', '.docx')}" class="download-button upload-button">
                    <svg viewBox="0 0 24 24">
                        <path d="M19 9H15V3H9V9H5L12 16L19 9ZM5 18V20H19V18H5Z" fill="currentColor"/>
                    </svg>
                    Download Word File
                </a>
                <button onclick="resetConverter()" class="reset-button upload-button" style="background: #f3f4f6; color: #111827;">
                    Convert Another File
                </button>
            </div>
        </div>
    `;
}

// Generate Word content
function generateWordContent(filename) {
    return `Converted from: ${filename}

This document has been successfully converted from PDF to Word format.

Document Content
===============

The original PDF content would appear here with proper formatting preserved.

Key Features:
- Text formatting maintained
- Paragraph structure preserved
- Headers and sections organized
- Ready for editing

Converted on: ${new Date().toLocaleString()}`;
}

// Reset converter to initial state
function resetConverter() {
    uploadZone.hidden = false;
    conversionProgress.hidden = true;
    fileInput.value = '';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeFeatures();

    // File input change
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleFileSelect(file);
    });

    // Drag and drop handlers
    uploadZone.addEventListener('dragenter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadZone.classList.add('drag-active');
    });

    uploadZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadZone.classList.remove('drag-active');
    });

    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadZone.classList.remove('drag-active');
        
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) handleFileSelect(files[0]);
    });
});