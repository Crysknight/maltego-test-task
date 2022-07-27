import { observer } from 'mobx-react-lite';
import { FormEvent } from 'react';

import { useStore } from '../../../src/composition';

import './graph_list_search.scss';

export const GraphListSearch = observer(() => {
    const { graphList } = useStore();

    const handleInput = (event: FormEvent) => {
        if (event.target instanceof HTMLInputElement) {
            graphList.setSearch(event.target.value);
        }
    };

    return (
        <div className="mtt-graph-list-search">
            <input
                type="text"
                className="mtt-graph-list-search__input"
                placeholder="search…"
                value={graphList.search}
                onInput={handleInput}
            />
        </div>
    );
});
