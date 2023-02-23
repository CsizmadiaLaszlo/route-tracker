import postcssConfig from '../postcss.config.cjs';

describe('PostCSS configuration', () => {
    test('postcss.config.js includes tailwindcss plugin', () => {
        expect(postcssConfig.plugins).toHaveProperty('tailwindcss');
    });

    test('plugins property includes autoprefixer', () => {
        expect(postcssConfig.plugins).toHaveProperty('autoprefixer');
    });
});
