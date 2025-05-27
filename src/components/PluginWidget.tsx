import { useRef } from "react";

// TODO: outsource this
const BACKEND_URL = "http://localhost:8000/plugin";

function PluginWidget({
  id,
  title,
}: {
  id: string;
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
        src={`${BACKEND_URL}/${id}/widget.html`}
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
