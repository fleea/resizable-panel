import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import classNameBind from 'classnames';
import './resizable-panel.scss';

export enum Direction {
    HORIZONTAL,
    VERTICAL,
}
interface ResizablePanelProps {
    direction: Direction;
}

const ResizablePanel: FunctionComponent<ResizablePanelProps> = ({
    direction,
    children,
}) => {
    const panel = useRef<HTMLDivElement>(null);

    // By saving width and height of the container, we are able to finetune the spread of the width and height of each child
    const childrenLength = React.Children.toArray(children).length;
    const [panelSize, setPanelSize] = useState<number | undefined>(undefined);
    const [subPanelSizes, setSubPanelSizes] = useState<Array<number>>(
        Array.from(Array(childrenLength))
    );

    useEffect(() => {
        if (!panel.current) return;
        const { width, height } = panel.current.getBoundingClientRect();
        if (direction === Direction.HORIZONTAL && panelSize !== width) {
            setPanelSize(width);
            setSubPanelSizes(subPanelSizes.fill(width / childrenLength));
        }
        if (direction === Direction.VERTICAL && panelSize !== height) {
            setPanelSize(height);
            setSubPanelSizes(subPanelSizes.fill(height / childrenLength));
        }
    }, [panel]);

    const cn = classNameBind('resizable-panel', {
        'resizable-panel--horizontal': direction === Direction.HORIZONTAL,
        'resizable-panel--vertical': direction === Direction.VERTICAL,
    });

    const getResizedSibling = (
        resizedIndex: number,
        siblingIndex: number,
        subPanelSize: number
    ) => {
        const getSiblingsSize = (subPanelSizes || [])
            .filter(
                (size: number, panelIndex: number) =>
                    panelIndex !== resizedIndex &&
                    panelIndex !== siblingIndex &&
                    !!size &&
                    size > 0
            )
            .reduce((a, b) => a + b, 0);
        return panelSize ? panelSize - getSiblingsSize - subPanelSize : -1;
    };

    const onResize = (index: number) => (size: number) => {
        const sizes = (subPanelSizes || []).map(
            (subPanelSize: number, subPanelIndex: number) => {
                if (subPanelIndex === index) return size;
                if (subPanelIndex === index + 1)
                    return getResizedSibling(index, index + 1, size);
                return subPanelSize;
            }
        );
        setSubPanelSizes(sizes);
    };

    const getSize = (index: number) =>
        !!subPanelSizes[index] && subPanelSizes[index] !== -1
            ? subPanelSizes[index]
            : undefined;

    const childrenWithProps = React.Children.map(
        children,
        (child: any, index: number) => {
            return React.cloneElement(child, {
                direction: direction,
                size: getSize(index),
                isLastElement: index === childrenLength - 1,
                onResize: onResize(index),
            });
        }
    );
    return (
        <div className={cn} ref={panel}>
            {childrenWithProps}
        </div>
    );
};

export default ResizablePanel;
