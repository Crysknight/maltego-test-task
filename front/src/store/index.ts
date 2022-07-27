import { createContext } from 'react';

import { GlobalStore } from './global_store';

const store = new GlobalStore();

if (process.env.NODE_ENV !== 'production') {
    // @ts-ignore
    window.store = store;
}

export const rootStoreContext = createContext(store);
