/**
 * Construct a build-specific plugin list without mutating the cached config.
 * Development rebuilds reuse the configured plugins array.
 *
 * @private
 * @internal
 */
export function createBuildPlugins<T>(
  configuredPlugins: readonly T[] | undefined,
  compilerAdapter: T,
): T[] {
  return [...(configuredPlugins ?? []), compilerAdapter];
}
