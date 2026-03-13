const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

// Configuration
let currentFlower = 'poinsettia';
let currentStyle = 'classic';
let currentFontSize = 24;

/**
 * Render the flower on canvas
 * @param {string} flowerKey - Key of the flower from flowers object
 * @param {string} styleKey - Key of the style from styles object
 * @param {number} fontSize - Font size for the flower
 */
function renderFlower(flowerKey = currentFlower, styleKey = currentStyle, fontSize = currentFontSize) {
    const flower = flowers[flowerKey];
    const style = styles[styleKey];
    
    if (!flower || !style) {
        console.error('Invalid flower or style');
        return;
    }
    
    // Clear canvas with background color
    ctx.fillStyle = style.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set text properties with dynamic font size
    ctx.fillStyle = style.textColor;
    ctx.font = `${fontSize}px ${style.fontFamily}`;
    ctx.textBaseline = 'top';
    
    // Calculate dynamic spacing based on font size
    const lineHeight = fontSize + 4; // Padding between lines
    const minMargin = 5; // Minimum margin from edges
    const maxWidth = canvas.width - (minMargin * 2); // Available width for text
    
    // Find the longest line and measure its width
    let longestLineWidth = 0;
    flower.lines.forEach((line) => {
        const metrics = ctx.measureText(line);
        longestLineWidth = Math.max(longestLineWidth, metrics.width);
    });
    
    // Dynamically adjust left margin based on whether content fits
    let startX = minMargin;
    
    // If content would overflow right side, shift left or reduce font (keep original intent)
    if (longestLineWidth + minMargin > canvas.width) {
        // Content would overflow - center it anyway and let it fit as best as possible
        startX = Math.max(minMargin, (canvas.width - longestLineWidth) / 2);
    } else {
        // Content fits - center horizontally for balance
        startX = (canvas.width - longestLineWidth) / 2;
    }
    
    // Calculate total height needed for the flower
    const totalHeight = flower.lines.length * lineHeight;
    
    // Center the flower vertically, ensuring it fits
    let startY = (canvas.height - totalHeight) / 2;
    
    // Ensure we have minimum top margin
    startY = Math.max(minMargin, startY);
    
    // If would overflow bottom, adjust
    if (startY + totalHeight > canvas.height - minMargin) {
        startY = Math.max(minMargin, canvas.height - totalHeight - minMargin);
    }
    
    // Draw flower lines
    flower.lines.forEach((line, index) => {
        ctx.fillText(line, startX, startY + (index * lineHeight));
    });
}

// Initial render
renderFlower();
