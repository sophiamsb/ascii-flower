// Style themes for ASCII flowers
const styles = {
    classic: {
        name: 'Classic',
        textColor: '#000000',
        backgroundColor: '#ffffff',
        fontSize: 24,
        fontFamily: 'monospace'
    },
    dark: {
        name: 'Dark Mode',
        textColor: '#ffffff',
        backgroundColor: '#1a1a1a',
        fontSize: 24,
        fontFamily: 'monospace'
    },
    neon: {
        name: 'Neon',
        textColor: '#00ff00',
        backgroundColor: '#001a00',
        fontSize: 24,
        fontFamily: 'monospace'
    },
    vintage: {
        name: 'Vintage',
        textColor: '#8B4513',
        backgroundColor: '#f5e6d3',
        fontSize: 24,
        fontFamily: 'monospace'
    },
    pastel: {
        name: 'Pastel',
        textColor: '#d084d0',
        backgroundColor: '#fff5f7',
        fontSize: 24,
        fontFamily: 'monospace'
    }
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = styles;
}
