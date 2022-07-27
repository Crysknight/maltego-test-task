import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom'
import './index.css';
import { App } from './app';
import reportWebVitals from './reportWebVitals';
import * as views from './views';

if (process.env.NODE_ENV !== 'production') {
    require('./class-props-check');
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="list" element={<views.GraphList />} />
                <Route path="list/:graphId" element={<views.GraphView />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
