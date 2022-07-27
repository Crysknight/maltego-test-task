import {
    action,
    computed,
    makeObservable,
    observable,
} from 'mobx';

import { IGraph, IGraphCreate } from '@shared/types';

import { AbstractStore } from '../abstract_store';

export class GraphList extends AbstractStore {
    public list: Array<IGraph> | null = null;
    public search: string = '';

    public get listWithSearch(): Array<IGraph> {
        if (!this.list) {
            return [];
        }

        if (!this.search) {
            return this.list;
        }

        const regExp = new RegExp(this.search, 'i');
        return [...this.list] // sort mutates the array, that's why sread
            .filter(({ name, data: { nodes } }) => {
                return (
                    regExp.test(name) ||
                    nodes.some(({ label }) => regExp.test(label))
                );
            })
            .sort((graphA, graphB) => {
                // Graphs with corresponding name display higher
                if (regExp.test(graphA.name) && !regExp.test(graphB.name)) {
                    return -1;
                } else if (!regExp.test(graphA.name) && regExp.test(graphB.name)) {
                    return 1;
                }

                // Otherwise, sort alphabetically
                return graphA.name < graphB.name ? -1 : 1;
            });
    }

    constructor(...args: ConstructorParameters<typeof AbstractStore>) {
        super(...args);

        makeObservable(this, {
            list: observable,
            search: observable,
            listWithSearch: computed,
            setList: action.bound,
            setSearch: action.bound,
        });
    }

    public async fetchGraphs(): Promise<void> {
        try {
            const response = await this.axiosInstance.get('/graphs');
            this.setList(response.data);
        } catch (error) {
            this.handleError(error);
        }
    }

    public async createGraph(graphCreate: IGraphCreate): Promise<IGraph | undefined> {
        if (!this.list) {
            return;
        }

        try {
            const response = await this.axiosInstance.post('/graphs', graphCreate);
            if (response.data) {
                this.setList([...this.list, response.data]);
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    public async deleteGraph(graphId: IGraph['id']): Promise<IGraph | undefined> {
        if (!this.list) {
            return;
        }

        try {
            const response = await this.axiosInstance.delete(`/graphs/${graphId}`);
            if (response.data) {
                this.setList(this.list.filter(({ id }) => id !== response.data.id));
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    public setList(newList: Array<IGraph>): void {
        this.list = newList;
    }

    public setSearch(newSearch: string): void {
        this.search = newSearch;
    }
};
