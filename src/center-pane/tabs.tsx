import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../tabs.css";
import { JSX } from "react/jsx-runtime";

export const useDragTabs = (initialTabs: { name: string; content: JSX.Element; }[]) => {
    const [tabs, setTabs] = useState(initialTabs);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [tabClosed, setTabClosed] = useState(false);

    const moveTab = (fromIndex: number, toIndex: number) => {
        const newTabs = [...tabs];
        const [removed] = newTabs.splice(fromIndex, 1);
        newTabs.splice(toIndex, 0, removed);
        setTabs(newTabs);

        // Update the selectedIndex to preserve the selection state
        setSelectedIndex(toIndex);
    };

    const addTab = (newTab: { name: string; content: JSX.Element; }) => {
        setTabs([...tabs, newTab]);
    };

    const removeTab = (index: number) => {
        const newTabs = tabs.filter((_, i) => i !== index);
        setTabs(newTabs);

        // Mark the tab as closed to trigger a selection update in useEffect
        setTabClosed(true);
    };

    const selectTab = (index: number) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        // If a tab was closed, adjust the selectedIndex
        if (tabClosed) {
            setTabClosed(false);
            setSelectedIndex((prevIndex) => Math.min(prevIndex, tabs.length - 1));
        } else if (tabs.length === 0) {
            // If there are no tabs, select the first tab
            setSelectedIndex(0);
        }
    }, [tabs, tabClosed]);

    return { tabs, moveTab, addTab, removeTab, selectedIndex, selectTab };
};

interface DraggableTabProps {
    tab: { name: string; content: JSX.Element; };
    index: number;
    moveTab: (fromIndex: number, toIndex: number) => void;
    selectTab: (index: number) => void;
    removeTab: (index: number) => void;
}

export const DraggableTab: React.FC<DraggableTabProps> = ({ tab, index, moveTab, selectTab, removeTab }) => {
    const [, ref] = useDrag({
        type: "TAB",
        item: { index },
    });

    const [, drop] = useDrop({
        accept: "TAB",
        drop: (draggedItem: { index: number }) => {
            if (draggedItem.index !== index) {
                moveTab(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <div
            ref={(node) => {
                ref(drop(node));
            }}
            style={{ display: "flex", padding: "8px", cursor: "move" }}
        >
            <div style={{ flexGrow: 1 }} onClick={() => selectTab(index)}>
                {tab.name}
            </div>
            <button onClick={() => removeTab(index)}>X</button>
        </div>
    );
};

interface DragTabsProps {
    dragTabs: {
        tabs: { name: string; content: JSX.Element; }[],
        moveTab: (fromIndex: number, toIndex: number) => void,
        addTab: (newTab: { name: string; content: JSX.Element; }) => void,
        removeTab: (index: number) => void,
        selectedIndex: number,
        selectTab: (index: number) => void;
    }
}

export const DragTabs: React.FC<DragTabsProps> = ({ dragTabs }) => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Tabs selectedIndex={dragTabs.selectedIndex} onSelect={(index) => dragTabs.selectTab(index)}>
                <TabList>
                    {dragTabs.tabs.map((tab, index) => (
                        <Tab key={index}>
                            <DraggableTab
                                tab={tab}
                                index={index}
                                moveTab={dragTabs.moveTab}
                                selectTab={dragTabs.selectTab}
                                removeTab={dragTabs.removeTab}
                            />
                        </Tab>
                    ))}
                </TabList>
                {dragTabs.tabs.map((tab, index) => (
                    <TabPanel key={index}>{tab.content}</TabPanel>
                ))}
            </Tabs>
        </DndProvider>
    );
};

export default DragTabs;