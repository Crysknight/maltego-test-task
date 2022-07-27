import _React, { useState } from 'react';
import {
    Link,
    Outlet,
} from 'react-router-dom';
import Icon from '@mdi/react';
import './app.scss';
import { MTTIcon } from './components';
import { Modal } from './layout';
import { mdiMenu } from '@mdi/js';

export const App = () => {
    const [isMenuDisplayed, setIsMenuDisplayed] = useState(true);

    const navigationClassName = `mtt-app-navigation${isMenuDisplayed ? ' mtt-app-navigation--opened' : ''}`;

    return (
        <div className="mtt-app">
            <div className="mtt-app-navigation-toggle">
                <MTTIcon onClick={() => setIsMenuDisplayed(!isMenuDisplayed)}>
                    <Icon
                        path={mdiMenu}
                        size={1.5}
                        color={isMenuDisplayed ? '#312d2e' : '#dddcdc'}
                    />
                </MTTIcon>
            </div>
            <aside className={navigationClassName}>
                <Link className="mtt-app-navigation__item" to="/list">
                    Graph List
                </Link>
                <Link className="mtt-app-navigation__item" to="/list/grph_3">
                    <b>Featured: </b>Graph grph_3
                </Link>
            </aside>
            <div className="mtt-app-content" onClick={() => setIsMenuDisplayed(false)}>
                <Outlet />
            </div>
            <Modal />
        </div>
    );
};
