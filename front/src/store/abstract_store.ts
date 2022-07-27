import { axiosInstance } from '../../src/axios';
import { GlobalStore } from './global_store';

export abstract class AbstractStore {
    protected axiosInstance = axiosInstance;

    constructor(protected globalStore: GlobalStore) {}

    protected handleError(error: any) {
        console.error('ApiError', error);

        if (error instanceof Error) {
            this.globalStore.appError.addError({ message: error.message });
        } else {
            const stringified = JSON.stringify(error, null, 4);
            this.globalStore.appError.addError({ message: `Unknown error: ${stringified}` });
        }
    }
};
