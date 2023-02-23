import babelConfig from '../babel.config';

describe('Babel configuration', () => {
    it('should export an object', () => {
        expect(typeof babelConfig).toBe('object');
    });

    it('should include @babel/preset-env', () => {
        expect(babelConfig.presets).toContain('@babel/preset-env');
    });

    it('should include @babel/preset-react with runtime: automatic', () => {
        const reactPreset = babelConfig.presets.find(
            (preset) => Array.isArray(preset) && preset[0] === '@babel/preset-react'
        );
        expect(reactPreset).toBeDefined();
        expect(reactPreset[1]).toHaveProperty('runtime', 'automatic');
    });
});