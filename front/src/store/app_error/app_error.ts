import {
    makeObservable,
    observable,
    action,
} from 'mobx';

import { stringRandom } from '../../../src/utils';

import { AbstractStore } from '../abstract_store';

export interface IAppError {
    id: string,
    message: string,
}

export class AppError extends AbstractStore {
    public list: Array<IAppError> = [];

    constructor(...args: ConstructorParameters<typeof AbstractStore>) {
        super(...args);

        makeObservable(this, {
            list: observable,
            addError: action,
            removeError: action,
        });
    }

    public addError(payload: {
        id?: string,
        message: string,
        autoRemove?: boolean | number,
    }) {
        const {
            message,
            autoRemove = true,
        } = payload;

        const id = payload.id ?? stringRandom();
        this.list = [...this.list, { id, message }];

        if (autoRemove) {
            setTimeout(
                () => this.removeError(id),
                typeof autoRemove === 'number' ? autoRemove : 5000,
            );
        }
    }

    public removeError(id: string) {
        this.list = this.list.filter(error => error.id !== id);
    }
};
