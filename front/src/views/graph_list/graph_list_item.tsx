import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiDeleteOutline } from '@mdi/js'

import { IGraph } from '@shared/types';

import { MTTIcon } from '../../../src/components';

import './graph_list_item.scss';
import { useStore } from '../../../src/composition';
import { MouseEventHandler } from 'react';

export const GraphListItem = ({ graph }: { graph: IGraph }) => {
    const { graphList } = useStore();

    const handleClick: MouseEventHandler<HTMLDivElement> = event => {
        event.stopPropagation();
        event.preventDefault();

        graphList.deleteGraph(graph.id);
    };

    return (
        <Link className="mtt-graph-list-item" to={`/list/${graph.id}`}>
            <div className="mtt-graph-list-item__data">
                <div className="mtt-graph-list-item__title">{ graph.name }</div>
                <div className="mtt-graph-list-item__data-piece">
                    Nodes: {graph.data.nodes.length}
                </div>
                <div className="mtt-graph-list-item__data-piece">
                    Edges: {graph.data.edges.length}
                </div>
            </div>
            <div className="mtt-graph-list-item__actions">
                <MTTIcon onClick={handleClick}>
                    <Icon path={mdiDeleteOutline} size={1} />
                </MTTIcon>
            </div>
        </Link>
    );
};
