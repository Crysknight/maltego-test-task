import {
    makeObservable,
    observable,
    action,
} from 'mobx';

import { stringRandom } from '../../../src/utils';

import { AbstractStore } from '../abstract_store';

export interface IModal {
    id: string,
    content: JSX.Element,
}

export class Modal extends AbstractStore {
    public list: Array<IModal> = [];

    constructor(...args: ConstructorParameters<typeof AbstractStore>) {
        super(...args);

        makeObservable(this, {
            list: observable,
            addModal: action,
            removeModal: action,
        });
    }

    public addModal(payload: {
        id?: string,
        content: JSX.Element,
        autoRemove?: boolean | number,
    }) {
        const {
            content,
            autoRemove = false,
        } = payload;

        const id = payload.id ?? stringRandom();
        this.list = [...this.list, { id, content }];

        if (autoRemove) {
            setTimeout(
                () => this.removeModal(id),
                typeof autoRemove === 'number' ? autoRemove : 5000,
            );
        }
    }

    public removeModal(id: string) {
        this.list = this.list.filter(error => error.id !== id);
    }
};
