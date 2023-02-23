import { config } from '../vite.config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

describe('Vite configuration', () => {
    test('config has plugins property', () => {
        expect(config).toHaveProperty('plugins');
    });

    test('plugins property is an array', () => {
        expect(Array.isArray(config.plugins)).toBe(true);
    });

    test('plugins property includes react', () => {
        const includesReact = config.plugins.some((plugin) => plugin.name === react().name);
        expect(includesReact).toBeTruthy();
    });

    test('config has server property', () => {
        expect(config).toHaveProperty('server');
    });

    test('server property has port 3000', () => {
        expect(config.server.port).toBe(3000);
    });

    test('server property has proxy property', () => {
        expect(config.server).toHaveProperty('proxy');
    });

    test('proxy property has /api property', () => {
        expect(config.server.proxy).toHaveProperty('/api');
    });

    test('proxy /api target is https://localhost:7227', () => {
        expect(config.server.proxy['/api'].target).toBe('https://localhost:7227');
    });
});
