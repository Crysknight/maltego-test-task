import { observer } from 'mobx-react-lite';
import _React, { MouseEventHandler } from 'react';
import { useStore } from '../composition';

import './modal.scss';

export const Modal = observer(() => {
    const { modal } = useStore();

    if (!modal.list.length) {
        return <></>;
    }

    const handleCloseClick = () => {
        modal.removeModal(modal.list[0].id);
    };

    const preventContentClick: MouseEventHandler<HTMLDivElement> = event => {
        event.stopPropagation();
    };

    return (
        <div className="mtt-modal" onClick={handleCloseClick}>
            <div className="mtt-modal__content" onClick={preventContentClick}>
                {modal.list[0].content}
            </div>
        </div>
    );
});
