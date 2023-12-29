import React, { useState } from "react";
import { createRoot } from 'react-dom/client';

// draggable splits
import SplitPane, { SashContent } from "split-pane-react";
import 'split-pane-react/esm/themes/default.css';

// in-house ui elements
import LeftPane from "./left-pane/left-pane";
import CenterPane from "./center-pane/center-pane";

const MainLayout = () => {
    const [mainSplitSizes, setMainSplitSizes] = useState([20, 60, 20]);

    return (
        <>
            <div className="topBar">
                <p>Top Bar</p>
            </div>
            <div className="mainArea">
                <SplitPane
                    split="vertical"
                    sizes={mainSplitSizes}
                    onChange={setMainSplitSizes}
                    sashRender={(_, active) => (
                        <SashContent active={active} type="vscode" />
                    )}
                >
                    <LeftPane />
                    <CenterPane />
                    <div className="right pane">
                        <p>Right Pane Here</p>
                    </div>
                </SplitPane>
            </div>
            <div className="statusBar">
                <p>Status Bar</p>
            </div>
        </>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<MainLayout />);
