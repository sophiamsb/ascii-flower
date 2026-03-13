const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

// Configuration
let currentFlower = 'rose';
let currentStyle = 'classic';

/**
 * Render the flower on canvas
 * @param {string} flowerKey - Key of the flower from flowers object
 * @param {string} styleKey - Key of the style from styles object
 */
function renderFlower(flowerKey = currentFlower, styleKey = currentStyle) {
    const flower = flowers[flowerKey];
    const style = styles[styleKey];
    
    if (!flower || !style) {
        console.error('Invalid flower or style');
        return;
    }
    
    // Clear canvas with background color
    ctx.fillStyle = style.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set text properties
    ctx.fillStyle = style.textColor;
    ctx.font = `${style.fontSize}px ${style.fontFamily}`;
    ctx.textBaseline = 'top';
    
    // Draw flower lines
    const lineHeight = style.fontSize + 4; // Small padding between lines
    const startX = 50;
    const startY = 50;
    
    flower.lines.forEach((line, index) => {
        ctx.fillText(line, startX, startY + (index * lineHeight));
    });
}

// Initial render
renderFlower();
