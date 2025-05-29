import PluginApi from "../api/PluginApi";
import type { PluginManifest } from "../types/plugin";

type PluginLoadCallback = (plugins: PluginManifest[]) => void;

class PluginLoader {
  private plugins: Map<string, PluginManifest> = new Map();
  private callbacks: PluginLoadCallback[] = [];
  private isInitialized: boolean = false;

  constructor() {
    console.log("Initializing PluginLoader");
    this.initPlugins();
  }

  private async initPlugins() {
    console.log("Scanning for plugins...");
    try {
      // Hardcoded manifest to test plugin load. Wil be removed later.
      const manifests = await new PluginApi().getPlugins();

      for (const manifest of manifests) {
        await this.registerPlugin(manifest);
      }

      this.isInitialized = true;
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
