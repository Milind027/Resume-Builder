document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded');
    
    // Make content editable
   

    // Set up event listeners for buttons
    setupButtonListeners();

    // Set up event listeners for skill and language bars
    setupBarListeners();
});




function setupButtonListeners() {
    const saveBtn = document.querySelector('.navbtn:nth-child(2)');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveResume);
    } else {
        console.error('Save button not found');
    }

    const homeBtn = document.querySelector('.navbtn:nth-child(3)');
    if (homeBtn) {
        homeBtn.addEventListener('click', goHome);
    } else {
        console.error('Home button not found');
    }

    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', printpdf);
    } else {
        console.error('Download button not found');
    }
}

function setupBarListeners() {
    const bars = document.querySelectorAll('.percent div');
    bars.forEach(bar => {
        bar.addEventListener('click', function(e) {
            e.stopPropagation();
            changeBarLevel(this);
        });
    });
}

function changeBarLevel(bar) {
    const currentWidth = parseInt(bar.style.width) || 0;
    const newLevel = prompt(`Enter new level (0-100). Current level: ${currentWidth}%`);
    
    if (newLevel !== null && !isNaN(newLevel)) {
        const level = Math.min(100, Math.max(0, parseInt(newLevel)));
        bar.style.width = `${level}%`;
    }
}

function printpdf() {
    console.log('printpdf function called');
    const element = document.querySelector('.container');
    if (!element) {
        console.error('Container element not found');
        return;
    }

    // Hide navigation buttons before generating PDF
    const navButtons = document.querySelectorAll('.navbtn');
    navButtons.forEach(btn => btn.style.display = 'none');

    // Add a class to the body for PDF-specific styles
    document.body.classList.add('generating-pdf');

    // Set up PDF options
    const opt = {
        margin: 0,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true,
            logging: true,
            letterRendering: true,
            width: 1500, // A4 width in pixels at 96 DPI
            height: 2000, // A4 height in pixels at 96 DPI
            windowWidth: 1500,
            windowHeight: 2000
            
        },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };

    // Generate PDF
    html2pdf().set(opt).from(element).save().then(() => {
        console.log('PDF generated and saved');
        // Show navigation buttons after generating PDF
        navButtons.forEach(btn => btn.style.display = '');
        // Remove the PDF-specific class
        document.body.classList.remove('generating-pdf');
    }).catch(error => {
        console.error('Error generating PDF:', error);
        // Show navigation buttons if there's an error
        navButtons.forEach(btn => btn.style.display = '');
        // Remove the PDF-specific class
        document.body.classList.remove('generating-pdf');
    });
}

function saveResume(event) {
    event.preventDefault();
    const resumeContent = document.querySelector('.container').innerHTML;
    document.getElementById('custinfo').value = resumeContent;
    // You can add AJAX call here to save the resume content to a server
    alert('Resume saved successfully!');
}

function goHome() {
    // Replace with the actual home page URL
    window.location.href = 'index.html';
}