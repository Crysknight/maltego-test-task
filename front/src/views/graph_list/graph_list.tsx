import _React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { IGraph } from '@shared/types';

import { useStore } from '../../../src/composition';
import { MTTPage } from '../../../src/components';

import { GraphListItem } from './graph_list_item';

import './graph_list.scss';
import { GraphListSearch } from './graph_list_search';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { AddGraph } from './add_graph';

export const GraphList = observer(() => {
    const {
        graphList,
        modal,
    } = useStore();

    useEffect(() => {
        graphList.fetchGraphs();
    }, []);

    const handleNewGraphClick = () => {
        modal.addModal({
            content: <AddGraph />,
        });
    };

    return (
        <MTTPage>
            <div className="mtt-graph-list">
                {!graphList.list ? (
                    <div className="mtt-graph-list__loading">Loading...</div>
                ) : (
                    <>
                        <GraphListSearch />
                        <div className="mtt-graph-list__list">
                            {graphList.listWithSearch.map((graph: IGraph) => (
                                <GraphListItem key={graph.id} graph={graph} />
                            ))}
                            <div className="mtt-graph-list__new" onClick={handleNewGraphClick}>
                                <Icon
                                    path={mdiPlus}
                                    size={2}
                                    color="rgba(221, 220, 220, 0.15)"
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </MTTPage>
    );
});
