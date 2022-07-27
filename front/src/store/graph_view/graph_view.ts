import { IGraph } from '@shared/types';
import { action, makeObservable, observable } from 'mobx';
import { AbstractStore } from '../abstract_store';

export class GraphView extends AbstractStore {
    public graph: IGraph | null = null;

    constructor(...args: ConstructorParameters<typeof AbstractStore>) {
        super(...args);

        makeObservable(this, {
            graph: observable,
            setGraph: action,
        });
    }

    public async fetchGraph(graphId: IGraph['id']): Promise<void> {
        try {
            const response = await this.axiosInstance.get(`/graphs/${graphId}`);
            this.setGraph(response.data);
        } catch (error) {
            this.handleError(error);
        }
    }

    public setGraph(newGraph: IGraph): void {
        this.graph = newGraph;
    }
};
