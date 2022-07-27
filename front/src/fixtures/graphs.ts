import { IGraph } from '@shared/types';

export const graphs: Array<IGraph> = [
    {
        id: 'a_graph_3',
        name: 'AGraph 3',
        data: {
            nodes: [
                {
                    id: 'node_1',
                    label: 'AGraph 2',
                },
            ],
            edges: [],
        },
    },
    {
        id: 't_graph_1',
        name: 'TGraph 1',
        data: {
            nodes: [],
            edges: [],
        },
    },
    {
        id: 'a_graph_2',
        name: 'AGraph 2',
        data: {
            nodes: [],
            edges: [],
        },
    },
    {
        id: 'a_graph_4',
        name: 'AGraph 4',
        data: {
            nodes: [
                {
                    id: 'node_2',
                    label: 'Hello',
                },
            ],
            edges: [],
        },
    },
];
