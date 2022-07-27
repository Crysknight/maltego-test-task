import _React from 'react';

import './page.scss';

export const MTTPage = ({ children }: { children: JSX.Element }) => (
    <div className="mtt-page">
        {children}
    </div>
);
