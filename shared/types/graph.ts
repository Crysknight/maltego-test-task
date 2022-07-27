import { IGraphEdge } from './graph_edge';
import { IGraphNode } from './graph_node';

export interface IGraph {
    id: string;
    name: string;
    data: {
        nodes: Array<IGraphNode>;
        edges: Array<IGraphEdge>;
    };
};
