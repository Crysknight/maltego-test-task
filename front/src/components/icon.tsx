import _React, { MouseEventHandler } from 'react';

import './icon.scss';

export const MTTIcon = (
    { children, onClick }:
    { children: JSX.Element, onClick: MouseEventHandler<HTMLDivElement> }
) => (
    <div className="mtt-icon" onClick={onClick}>
        {children}
    </div>
);
