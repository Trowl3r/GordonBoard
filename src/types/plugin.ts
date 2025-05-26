// TODO: Maybe make this a class

export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  entryPoint: string; // URL to the plugin's main JS file
  widgetUrl: string; // URL to the widget HTML file
  pageUrl: string; // URL to the full page HTML file
  thumbnail?: string;
}
