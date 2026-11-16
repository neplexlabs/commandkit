import { describe, expect, it } from 'vitest';
import { createBuildPlugins } from './build-plugins';

describe('compiler plugin lists', () => {
  it('does not accumulate adapters across development rebuilds', () => {
    const configuredPlugin = { name: 'configured-plugin', build: -1 };
    const configuredPlugins = [configuredPlugin];
    const outputs = [];

    for (let build = 0; build < 3; build++) {
      const adapter = { name: 'CompilerPluginRuntime', build };
      const buildPlugins = createBuildPlugins(configuredPlugins, adapter);

      outputs.push(buildPlugins);
      expect(buildPlugins).toEqual([configuredPlugin, adapter]);
      expect(buildPlugins).not.toBe(configuredPlugins);
      expect(configuredPlugins).toEqual([configuredPlugin]);
    }

    expect(outputs[0]).not.toBe(outputs[1]);
    expect(outputs[1]).not.toBe(outputs[2]);
  });

  it('adds only the compiler adapter when no plugins are configured', () => {
    const adapter = { name: 'CompilerPluginRuntime' };

    expect(createBuildPlugins(undefined, adapter)).toEqual([adapter]);
  });
});
