

// Toggle between front and back pages
document.getElementById('toggle-view').addEventListener('click', function() {
    const frontPage = document.getElementById('front-page');
    const backPage = document.getElementById('back-page');
    const button = document.getElementById('toggle-view');
    
    if (frontPage.style.display === 'none') {
        frontPage.style.display = 'block';
        backPage.style.display = 'none';
        button.textContent = 'Show Card Backs';
    } else {
        frontPage.style.display = 'none';
        backPage.style.display = 'block';
        button.textContent = 'Show Card Fronts';
    }
});

// Generate PDF
document.getElementById('download-btn').addEventListener('click', function() {
// Make both pages visible for PDF generation
const frontPage = document.getElementById('front-page');
const backPage = document.getElementById('back-page');

// Store original display state
const frontOriginalDisplay = frontPage.style.display;
const backOriginalDisplay = backPage.style.display;

// Make both pages visible
frontPage.style.display = 'block';
backPage.style.display = 'block';

// Hide all no-print elements
const noPrintElements = document.querySelectorAll('.no-print');
noPrintElements.forEach(el => {
el.style.display = 'none';
});

// Configure PDF options with specific paging settings
const options = {
margin: 0,
filename: 'flashcards.pdf',
image: { type: 'jpeg', quality: 0.98 },
html2canvas: { 
    scale: 2,
    useCORS: true
},
jsPDF: { 
    unit: 'in', 
    format: 'a4', 
    orientation: 'portrait',
    compress: true
},
pagebreak: { mode: 'avoid-all' }
};

// Generate PDF with proper paging
html2pdf().set(options).from(document.getElementById('preview')).save().then(() => {
// Restore original display states
frontPage.style.display = frontOriginalDisplay;
backPage.style.display = backOriginalDisplay;

// Restore no-print elements
noPrintElements.forEach(el => {
    el.style.display = '';
});
});
});