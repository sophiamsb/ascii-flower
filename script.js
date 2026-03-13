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
    
    // Calculate total height needed for the flower
    const totalHeight = flower.lines.length * lineHeight;
    
    // Center the flower vertically and add some padding
    const startY = Math.max(20, (canvas.height - totalHeight) / 2);
    const startX = 30;
    
    // Draw flower lines
    flower.lines.forEach((line, index) => {
        ctx.fillText(line, startX, startY + (index * lineHeight));
    });
}

// Initial render
renderFlower();
