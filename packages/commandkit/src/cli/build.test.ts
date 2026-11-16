import { describe, expect, it, vi } from 'vitest';
import { buildApplication } from './build';

const { build } = vi.hoisted(() => ({
  build: vi.fn(async (_config: unknown) => {}),
}));

vi.mock('./common', () => ({
  loadTsdown: async () => ({ build }),
  copyLocaleFiles: async () => {},
}));

vi.mock('../config/loader', () => ({
  loadConfigFile: async () => ({
    distDir: 'dist',
    compilerOptions: { tsdown: {} },
    typescript: { ignoreBuildErrors: true },
    sourceMap: { development: true },
    entrypoints: [],
    env: {},
    experimental: { pregenerateCommands: false },
  }),
}));

vi.mock('rimraf', () => ({
  rimraf: async () => {},
}));

vi.mock('node:fs', async (importOriginal) => ({
  ...(await importOriginal<typeof import('node:fs')>()),
  // Avoid writing a generated entrypoint during the build test.
  existsSync: () => true,
}));

describe('buildApplication compiler plugins', () => {
  it('does not accumulate compiler adapters across rebuilds', async () => {
    const customPlugin = { name: 'custom-plugin' };
    const configuredPlugins = [customPlugin];

    for (let i = 0; i < 3; i++) {
      await buildApplication({
        plugins: [],
        rolldownPlugins: configuredPlugins,
        isDev: true,
      });
    }

    expect(configuredPlugins).toEqual([customPlugin]);
    expect(build).toHaveBeenCalledTimes(3);

    for (const [options] of build.mock.calls) {
      const plugins = (options as { plugins: { name: string }[] }).plugins;
      expect(plugins).toHaveLength(2);
      expect(plugins[0]).toBe(customPlugin);
      expect(plugins[1].name).toBe('CompilerPluginRuntime');
    }
  });
});
