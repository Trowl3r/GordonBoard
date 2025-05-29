import { useRef } from "react";
import { getWidgetAdress} from "../api/ApiPath";

function PluginWidget({
  title,
  src
}: {
  title: string;
  src: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const widgetSrc = getWidgetAdress(src);
  
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
        src={widgetSrc}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          background: "transparent",
          pointerEvents: "none",
        }}
        title={title}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}

export default PluginWidget;
