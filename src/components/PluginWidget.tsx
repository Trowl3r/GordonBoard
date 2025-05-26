import { useRef } from "react";

function PluginWidget({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
        src={src}
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
