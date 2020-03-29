import React from 'react';
import ResizablePanel, {
    Direction,
} from './components/resizable-panel/resizable-panel';
import './App.scss';
import ResizablePanelChild from './components/resizable-panel-child/resizable-panel-child';

function App() {
    return (
        <ResizablePanel direction={Direction.HORIZONTAL}>
            <ResizablePanelChild min={50}>
                <div className="content">
                    Aliquam nec efficitur sem, sit amet vehicula justo. Integer
                    velit turpis, viverra ac nulla eu, volutpat porta felis.
                    Fusce facilisis iaculis tincidunt. Nulla dictum nisi non
                    orci congue pretium. Quisque pulvinar magna quis tellus
                    facilisis faucibus. Integer commodo lobortis nulla. Interdum
                    et malesuada fames ac ante ipsum primis in faucibus. Nam
                    eget nisi varius lorem efficitur dignissim id nec tellus.
                    Phasellus nibh sem, volutpat sed ultricies non, ornare ut
                    massa. Cras cursus nibh non diam elementum scelerisque.
                </div>
            </ResizablePanelChild>
            <ResizablePanelChild min={100}>
                <div className="content">
                    Aliquam nec efficitur sem, sit amet vehicula justo. Integer
                    velit turpis, viverra ac nulla eu, volutpat porta felis.
                    Fusce facilisis iaculis tincidunt. Nulla dictum nisi non
                    orci congue pretium. Quisque pulvinar magna quis tellus
                    facilisis faucibus. Integer commodo lobortis nulla. Interdum
                    et malesuada fames ac ante ipsum primis in faucibus. Nam
                    eget nisi varius lorem efficitur dignissim id nec tellus.
                    Phasellus nibh sem, volutpat sed ultricies non, ornare ut
                    massa. Cras cursus nibh non diam elementum scelerisque.
                </div>
            </ResizablePanelChild>
            <ResizablePanelChild>
                <div className="content">
                    Aliquam nec efficitur sem, sit amet vehicula justo. Integer
                    velit turpis, viverra ac nulla eu, volutpat porta felis.
                    Fusce facilisis iaculis tincidunt. Nulla dictum nisi non
                    orci congue pretium. Quisque pulvinar magna quis tellus
                    facilisis faucibus. Integer commodo lobortis nulla. Interdum
                    et malesuada fames ac ante ipsum primis in faucibus. Nam
                    eget nisi varius lorem efficitur dignissim id nec tellus.
                    Phasellus nibh sem, volutpat sed ultricies non, ornare ut
                    massa. Cras cursus nibh non diam elementum scelerisque.
                </div>
            </ResizablePanelChild>
        </ResizablePanel>
    );
}

export default App;
