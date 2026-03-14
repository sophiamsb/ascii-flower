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
    const marginSide = 30; // Aggressive margin for left/right to force side shifting
    const marginVertical = 10; // Smaller margin for top/bottom
    
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
        
        // Check overflow directions
        const overflowsRight = lineX + lineWidth > canvas.width - marginSide;
        const overflowsLeft = lineX < marginSide;
        const overflowsBottom = lineY + fontSize > canvas.height - marginVertical;
        const overflowsTop = lineY < marginVertical;
        
        // Diagonal shifting based on overflow direction
        // Bottom-Right overflow → shift up-left
        if (overflowsBottom && overflowsRight) {
            lineX = canvas.width - lineWidth - marginSide;
            lineY = canvas.height - fontSize - marginVertical;
        }
        // Bottom-Left overflow → shift up-right
        else if (overflowsBottom && overflowsLeft) {
            lineX = marginSide;
            lineY = canvas.height - fontSize - marginVertical;
        }
        // Top-Right overflow → shift down-left
        else if (overflowsTop && overflowsRight) {
            lineX = canvas.width - lineWidth - marginSide;
            lineY = marginVertical;
        }
        // Top-Left overflow → shift down-right
        else if (overflowsTop && overflowsLeft) {
            lineX = marginSide;
            lineY = marginVertical;
        }
        // Only horizontal overflow
        else if (overflowsRight) {
            lineX = canvas.width - lineWidth - marginSide;
        }
        else if (overflowsLeft) {
            lineX = marginSide;
        }
        // Only vertical overflow
        else if (overflowsBottom) {
            lineY = canvas.height - fontSize - marginVertical;
        }
        else if (overflowsTop) {
            lineY = marginVertical;
        }
        
        ctx.fillText(line, lineX, lineY);
    });
}

// Initial render
renderFlower();
