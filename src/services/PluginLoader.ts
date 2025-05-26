import type { PluginManifest } from "../types/plugin";

type PluginLoadCallback = (plugins: PluginManifest[]) => void;

class PluginLoader {
  private plugins: Map<string, PluginManifest> = new Map();
  private loadedPlugins: Map<string, any> = new Map();
  private callbacks: PluginLoadCallback[] = [];
  private isInitialized: boolean = false;

  constructor() {
    console.log("Initializing PluginLoader");
    this.initPlugins();
  }

  private async initPlugins() {
    console.log("Scanning for plugins...");
    try {
      // TODO: Replace with actual plugin logic
      const pluginUrls = [
        "/plugins/test-plugin/manifest.json",
        "/plugins/react-test-plugin/manifest.json",
      ];

      const pluginPromises = pluginUrls.map(async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(
            `Failed to load plugin manifest from ${url}: ${res.status}`
          );
        }
        return res.json();
      });

      const manifests = await Promise.all(pluginPromises);

      for (const manifest of manifests) {
        await this.registerPlugin(manifest);
      }
      this.notifyCallbacks();
    } catch (err) {
      console.error(err);
    }
  }

  private notifyCallbacks() {
    const plugins = this.getAllPlugins();
    this.callbacks.forEach((callback) => callback(plugins));
  }

  onPluginsLoaded(callback: PluginLoadCallback) {
    if (this.isInitialized) {
      callback(this.getAllPlugins());
    } else {
      this.callbacks.push(callback);
    }
  }

  async registerPlugin(manifest: PluginManifest) {
    console.log("Registering plugin: ", manifest.id);
    this.plugins.set(manifest.id, manifest);
  }

  async loadPlugin(pluginId: string) {
    const manifest = this.plugins.get(pluginId);
    if (!manifest) {
      throw new Error(`Plugin ${pluginId} not found`);
    }

    if (this.loadedPlugins.has(pluginId)) {
      return this.loadedPlugins.get(pluginId);
    }

    // const entryPoint = await import(manifest.entryPoint);

    // this.loadedPlugins.set(pluginId, entryPoint);
    // return entryPoint;
  }

  getPluginManifest(pluginId: string): PluginManifest | undefined {
    console.log("plugins: ", this.plugins);
    return this.plugins.get(pluginId);
  }

  getAllPlugins(): PluginManifest[] {
    return Array.from(this.plugins.values());
  }
}

export const pluginLoader = new PluginLoader();
