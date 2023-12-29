import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../tabs.css";

export type Tab = {
  name: string;
  content: React.JSX.Element;
};

interface DraggableTabProps {
    tab: Tab;
    index: number;
    moveTab: (fromIndex: number, toIndex: number) => void;
}

const DraggableTab: React.FC<DraggableTabProps> = ({ tab, index, moveTab }) => {
  const [, ref] = useDrag({
    type: "TAB",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "TAB",
    drop: (draggedItem: {index: number}) => {
      if (draggedItem.index !== index) {
        moveTab(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} style={{ padding: "8px", cursor: "move" }}>
      {tab.name}
    </div>
  );
};

interface DragTabsProps {
  initialTabs: Tab[];
}

const DragTabs: React.FC<DragTabsProps> = ({ initialTabs }) => {
  const [tabs, setTabs] = useState(initialTabs);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const moveTab = (fromIndex: number, toIndex: number) => {
    const newTabs = [...tabs];
    const [removed] = newTabs.splice(fromIndex, 1);
    newTabs.splice(toIndex, 0, removed);
    setTabs(newTabs);

    // Update the selectedIndex to preserve the selection state
    setSelectedIndex(toIndex);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Tabs selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)}>
        <TabList>
          {tabs.map((tab, index) => (
            <Tab key={index}>
              <DraggableTab tab={tab} index={index} moveTab={moveTab} />
            </Tab>
          ))}
        </TabList>
        {tabs.map((tab, index) => (
          <TabPanel key={index}>{tab.content}</TabPanel>
        ))}
      </Tabs>
    </DndProvider>
  );
};

export default DragTabs;
