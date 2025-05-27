export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  sourcePath: string; // URL to plugin Location
  serviceDic: string; // URL to backend service
  urlPath: string; // used path in router
  frontendDic: string; // URL to frontend Site
  thumbnail?: string;
}