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
    const marginSide = 20; // Larger margin for left/right
    const marginVertical = 5; // Smaller margin for top/bottom
    
    // Find the longest line and measure its width
    let longestLineWidth = 0;
    flower.lines.forEach((line) => {
        const metrics = ctx.measureText(line);
        longestLineWidth = Math.max(longestLineWidth, metrics.width);
    });
    
    // Calculate total height needed for the flower
    const totalHeight = flower.lines.length * lineHeight;
    
    // Center the flower normally, accounting for larger side margins
    let centerX = (canvas.width - longestLineWidth) / 2;
    let centerY = (canvas.height - totalHeight) / 2;
    
    // Draw flower lines with per-line adjustment
    flower.lines.forEach((line, index) => {
        const lineMetrics = ctx.measureText(line);
        const lineWidth = lineMetrics.width;
        
        // Start with centered position
        let lineX = centerX;
        let lineY = centerY + (index * lineHeight);
        
        // PRIORITIZE HORIZONTAL ADJUSTMENT (sides)
        // If line goes past right edge, shift left
        if (lineX + lineWidth > canvas.width - marginSide) {
            lineX = canvas.width - lineWidth - marginSide;
        }
        
        // If line goes past left edge, shift right
        if (lineX < marginSide) {
            lineX = marginSide;
        }
        
        // Then adjust vertical only if absolutely necessary
        // If line goes past bottom edge, shift up
        if (lineY + fontSize > canvas.height - marginVertical) {
            lineY = canvas.height - fontSize - marginVertical;
        }
        
        // If line goes past top edge, shift down
        if (lineY < marginVertical) {
            lineY = marginVertical;
        }
        
        ctx.fillText(line, lineX, lineY);
    });
}

// Initial render
renderFlower();
