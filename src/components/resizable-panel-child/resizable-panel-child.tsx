import React, { FunctionComponent, useRef, useState, useEffect } from 'react';
import './resizable-panel-child.scss';
import { Direction } from '../resizable-panel/resizable-panel';

export interface ResizablePanelChildProps {
    size?: number;
    min?: number;
    direction?: Direction;
    isLastElement?: boolean;
    onResize?: (size: number) => void;
}

const ResizablePanelChild: FunctionComponent<ResizablePanelChildProps> = ({
    size,
    min = 0,
    children,
    direction = Direction.HORIZONTAL,
    isLastElement = true,
    onResize,
}) => {
    const panelChild = useRef<HTMLDivElement>(null);
    const [panelX, setPanelX] = useState<number | undefined>(undefined);
    const [panelY, setPanelY] = useState<number | undefined>(undefined);
    useEffect(() => {
        if (!panelChild.current) return;
        const { x, y } = panelChild.current.getBoundingClientRect();
        if (panelX !== x) setPanelX(x);
        if (panelY !== y) setPanelY(y);
    }, [panelChild.current, size]);
    const handleStartResizing = (event: React.MouseEvent) => {
        document.addEventListener('mousemove', handleMouseMove as any);
        document.addEventListener('mouseup', handleMouseUp as any);
    };
    const handleMouseMove = (event: React.MouseEvent) => {
        const { clientX, clientY } = event;
        if (
            panelX !== undefined &&
            direction === Direction.HORIZONTAL &&
            !!onResize
        )
            onResize(clientX - panelX);
        if (
            panelY !== undefined &&
            direction === Direction.VERTICAL &&
            !!onResize
        )
            onResize(clientY - panelY);
    };
    const handleMouseUp = (event: React.MouseEvent) => {
        document.removeEventListener('mousemove', handleMouseMove as any);
    };

    const getStyle = (
        direction: Direction,
        size?: number
    ): React.CSSProperties => {
        if (direction === Direction.VERTICAL) {
            return {
                height: size ? Math.max(size, min) : undefined,
                flexGrow: size === undefined ? 1 : 'initial',
                flexShrink: size === undefined ? 'initial' : 0,
            };
        }
        return {
            width: size ? Math.max(size, min) : undefined,
            flexGrow: size === undefined ? 1 : 'initial',
            flexShrink: size === undefined ? 'initial' : 0,
        };
    };
    return (
        <div
            className="resizable-panel__child"
            ref={panelChild}
            style={!isLastElement ? getStyle(direction, size) : { flexGrow: 1 }}
        >
            {children}
            {!isLastElement && (
                <div
                    className="resizable-panel__handler"
                    onMouseDown={handleStartResizing}
                />
            )}
        </div>
    );
};

export default ResizablePanelChild;
