import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import DraggableCard from "../components/ui/DraggableCard";
import PluginWidget from "../components/PluginWidget";
import type { PluginManifest } from "../types/plugin";
import { pluginLoader } from "../services/PluginLoader";

function Dashboard() {
  const [plugins, setPlugins] = useState<Array<PluginManifest>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handlePluginsLoaded = (loadedPlugins: PluginManifest[]) => {
      setPlugins(loadedPlugins);
      setIsLoading(false);
    };

    pluginLoader.onPluginsLoaded(handlePluginsLoaded);
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPlugins((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newArray = [...items];
        const [movedItem] = newArray.splice(oldIndex, 1);
        newArray.splice(newIndex, 0, movedItem);

        return newArray;
      });
    }
  }

  if (isLoading) {
    return <div>Loading plugins...</div>;
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SortableContext
              items={plugins.map((p) => p.id)}
              strategy={rectSortingStrategy}
            >
              {plugins.map((plugin) => (
                <DraggableCard key={plugin.id} id={plugin.id}>
                  <PluginWidget
                    src={plugin.widgetUrl}
                    title={plugin.name}
                  />
                </DraggableCard>
              ))}
            </SortableContext>
          </div>
        </div>
      </DndContext>
    </>
  );
}

export default Dashboard;
