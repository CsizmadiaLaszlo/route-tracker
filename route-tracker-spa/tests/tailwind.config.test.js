import config from "../tailwind.config.cjs";
import daisyui from "daisyui";

describe('Tailwind Config', () => {
    test('config has content property', () => {
        expect(config).toHaveProperty('content');
    });

    test('content property includes required files', () => {
        const requiredFiles = [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
            "node_modules/daisyui/dist/**/*.js",
            "node_modules/react-daisyui/dist/**/*.js"
        ];

        expect(config.content).toEqual(expect.arrayContaining(requiredFiles));
    });

    test('config has theme property', () => {
        expect(config).toHaveProperty('theme');
    });

    test('theme property includes container with center property', () => {
        expect(config.theme).toHaveProperty('container.center', true);
    });

    test('config has plugins property', () => {
        expect(config).toHaveProperty('plugins');
    });

    test('plugins property includes daisyui', () => {
        expect(config.plugins).toContainEqual(daisyui);
    });

    test('config has daisyui property', () => {
        expect(config).toHaveProperty('daisyui');
    });

    test('daisyui property includes themes', () => {
        expect(config.daisyui).toHaveProperty('themes', ["corporate", "business"]);
    });

    test('daisyui property includes darkTheme', () => {
        expect(config.daisyui).toHaveProperty('darkTheme', "dark");
    });
});
