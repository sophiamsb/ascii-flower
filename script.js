const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

// Set up canvas
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Set text properties for ASCII art
ctx.fillStyle = 'black';
ctx.font = '12px monospace';
ctx.textBaseline = 'top';

// Draw placeholder ASCII flower
const flowerASCII = `
    *
   /|\\
    |
   / \\
`;

const lines = flowerASCII.split('\n');
lines.forEach((line, index) => {
    ctx.fillText(line, 50, 50 + (index * 16));
});
