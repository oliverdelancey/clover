import React, { useState, useRef } from "react";
import SplitPane, { SashContent } from "split-pane-react";
import 'split-pane-react/esm/themes/default.css';

import CodeEditor from "./editor";
import DragTabs, { useDragTabs } from "./tabs";

const CenterPane = () => {
    const [centerSplitSizes, setCenterSplitSizes] = useState([60, 40]);

    const tabs = useDragTabs([
        {
            name: "scratch",
            content: <CodeEditor />
        },
    ]);

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
                    <button onClick={() => tabs.addTab(
                        {
                            name: "New Tab",
                            content: <p>New Tab here</p>
                        })}
                    >Add Tab</button>
                </div>
                <div className="replArea">
                    <p>REPL Here</p>
                </div>
            </SplitPane>
        </div>
    );
}

export default CenterPane;