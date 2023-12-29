import React, { useState, useCallback } from "react";

import DragTabs, { Tab } from "./tabs";

const LeftPane = () => {
    const tabs: Tab[] = [
        {
            name: "Files",
            content: <p>File tree here!</p>
        },
        {
            name: "Outline",
            content: <p>Code outline here!</p>
        },
    ];
    return (
        <DragTabs initialTabs={tabs}/>
    );
}

export default LeftPane;