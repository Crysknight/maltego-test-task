import { IGraph } from '@shared/types';
import { IGraphCreate } from '@shared/types';
import { stringRandom } from '@shared/utils';

import { memoryStorage } from '@src/storage';

export const graphRepo = {
    async getAllGraphs(): Promise<Array<IGraph>> {
        return memoryStorage.graphs;
    },
    async getGraphById(graphId: IGraph['id']): Promise<IGraph | undefined> {
        return memoryStorage.graphs.find(({ id }) => id === graphId);
    },
    async createGraph(graphCreate: IGraphCreate): Promise<IGraph> {
        const graph = {
            id: stringRandom(),
            data: {
                edges: [],
                nodes: [],
            },
            ...graphCreate,
        };
        memoryStorage.graphs.push(graph);
        return graph;
    },
    async deleteGraph(graphId: IGraph['id']): Promise<IGraph | undefined> {
        const foundGraph = await this.getGraphById(graphId);
        if (foundGraph) {
            memoryStorage.graphs = memoryStorage.graphs.filter(graph => graph !== foundGraph);
        }

        return foundGraph;
    },
};
