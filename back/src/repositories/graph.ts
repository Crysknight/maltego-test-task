import { IGraph } from '@shared/types';

import { memoryStorage } from '@src/storage';

export const graphRepo = {
    async getAllGraphs(): Promise<Array<IGraph>> {
        return memoryStorage.graphs;
    },
    async getGraphById(targetId: string): Promise<IGraph | undefined> {
        return memoryStorage.graphs.find(({ id }) => id === targetId);
    },
};
