import { IGraph } from '@shared/types';

import graphSeed from '@src/data/graphs.json';

export const memoryStorage = {
    graphs: JSON.parse(JSON.stringify(graphSeed)) as Array<IGraph>,
};
