import { useRef } from "react";
import { useParams } from "react-router-dom";
import { pluginLoader } from "../services/PluginLoader";
import type { PluginManifest } from "../types/plugin";

export default function PluginPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // TODO: Fix relaad bug
  const plugin: PluginManifest | undefined = pluginLoader.getPluginManifest(
    useParams()["*"] ?? ""
  );

  return (
    <div
      className="plugin-widget"
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <iframe
        ref={iframeRef}
        src={plugin?.pageUrl}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          background: "transparent",
          pointerEvents: "none",
        }}
        title=""
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
