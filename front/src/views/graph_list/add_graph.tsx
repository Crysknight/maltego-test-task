import _React, { FormEvent, useState } from 'react';

import { useStore } from '../../../src/composition';

import './add_graph.scss';

export const AddGraph = () => {
    const { graphList, modal } = useStore();
    const [graphName, setGraphName] = useState('');

    const handleSubmitClick = async () => {
        if (!graphName) {
            return;
        }

        await graphList.createGraph({ name: graphName });

        if (modal.list[0]) {
            modal.removeModal(modal.list[0].id);
        }
    };

    const handlegraphNameInput = (event: FormEvent) => {
        if (event.target instanceof HTMLInputElement) {
            setGraphName(event.target.value);
        }
    };

    return (
        <div className="mtt-add-graph">
            <div className="mtt-add-graph__title">Add new graph</div>
            <input
                type="text"
                className="mtt-add-graph__graph-title"
                placeholder="graph title…"
                value={graphName}
                onInput={handlegraphNameInput}
            />
            <div
                className="mtt-add-graph__submit"
                onClick={handleSubmitClick}
            >Submit</div>
        </div>
    );
};
