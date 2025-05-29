import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { pluginLoader } from "../services/PluginLoader";
import { getPluginAddress} from "../api/ApiPath";
import root from "react-shadow";

declare global {
  interface Window {
    mountPlugin: (container: HTMLElement) => void;
    unmountPlugin: () => void;
  }
}

export default function PluginPage() {
  const { pluginId } = useParams();
  const containerRef = useRef(null);

  // gets manifest by id
  const manifest = pluginLoader.getPluginManifest(pluginId ?? "");
  const src = getPluginAddress(manifest!.urlPath);

  useEffect(() => {
    if (!manifest) return;
    
    // Creates used script tag
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);

    // Mounts the plugin by plugins mountPlugin function
    script.onload = () => {
      if (typeof window.mountPlugin === "function") {
        window.mountPlugin(containerRef.current!);
      } else {
        console.warn("Mount function not found");
      }
    };

    // unmounts the plugin by plugins ummountPlugin function
    return () => {
      if (typeof window.unmountPlugin === "function") {
        window.unmountPlugin();
      }
      document.body.removeChild(script);
    };
  }, [pluginId]);

  return (
    <root.div>
      <div ref={containerRef} style={{ height: "100vh" }} />
    </root.div>
  );
}
