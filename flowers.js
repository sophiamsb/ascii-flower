// ASCII Flower patterns
const flowers = {
    simple: {
        name: 'Simple Flower',
        lines: [
            '    *',
            '   /|\\',
            '    |',
            '   / \\'
        ]
    },
    rose: {
        name: 'Rose',
        lines: [
            '      *',
            '     /|\\',
            '    / | \\',
            '   *  |  *',
            '    \\ | /',
            '     \\|/',
            '      |',
            '     /|\\',
            '    / | \\',
            '   /  |  \\'
        ]
    },
    daisy: {
        name: 'Daisy',
        lines: [
            '    * * *',
            '   * o *',
            '    * * *',
            '      |',
            '     /|\\',
            '    / | \\'
        ]
    },
    tulip: {
        name: 'Tulip',
        lines: [
            '    *',
            '   /|\\',
            '  / | \\',
            '    | ',
            '    |',
            '   /|\\',
            '  / | \\',
            '    ||'
        ]
    }
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = flowers;
}
