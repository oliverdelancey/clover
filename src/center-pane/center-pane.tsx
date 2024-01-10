import React, { useState, useRef } from "react";
import SplitPane, { SashContent } from "split-pane-react";
import 'split-pane-react/esm/themes/default.css';

import CodeEditor from "./editor";
import DragTabs, { useDragTabs } from "./tabs";

export interface IElectronAPI {
    onAddEditorTab: (fn: any) => Promise<void>,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}

const CenterPane = () => {
    const [centerSplitSizes, setCenterSplitSizes] = useState([60, 40]);

    const tabs = useDragTabs([
        {
            name: "scratch",
            content: <CodeEditor />
        },
    ]);

    window.electronAPI.onAddEditorTab(() => {
        tabs.addTab({ name: "New Tab", content: <p>New Tab here</p>});
    })

    return (
        <div className="center pane">
            <SplitPane
                split="horizontal"
                sizes={centerSplitSizes}
                onChange={setCenterSplitSizes}
                sashRender={(_, active) => (
                    <SashContent active={active} type="vscode" />
                )}
            >
                <div className="editorArea">
                    <DragTabs dragTabs={tabs} />
                </div>
                <div className="replArea">
                    <p>REPL Here</p>
                </div>
            </SplitPane>
        </div>
    );
}

export default CenterPane;