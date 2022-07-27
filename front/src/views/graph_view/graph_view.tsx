import _React, { MouseEvent, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Canvas } from 'reaflow';

import { MTTPage } from '../../../src/components';
import { useStore } from '../../../src/composition';

import './graph_view.scss';

export const GraphView = observer(() => {
    const {
        graphView,
    } = useStore();
    const { graphId } = useParams();

    useEffect(() => {
        if (graphId) {
            graphView.fetchGraph(graphId);
        }
    }, [graphId]);

    const nodesTranslated = graphView.graph
        ? graphView.graph.data.nodes.map(({ id, label }) => ({ id, text: label }))
        : null;

    const edgesTranslated = graphView.graph
        ? graphView.graph.data.edges.map(({ source, target }) => {
            return {
                id: `${source}_${target}`,
                from: source,
                to: target,
            };
        })
        : null;

    return (
        <MTTPage>
            <div className="mtt-graph-view">
                {!graphView.graph ? (
                    <div className="mtt-graph-view__loading">Loading...</div>
                ) : (
                    <>
                        <div className="mtt-graph-view__data">
                            <div className="mtt-graph-view__graph-title">
                                {graphView.graph.name}
                            </div>
                        </div>
                        <div className="mtt-graph-view__canvas">
                            <Canvas
                                maxWidth={1000}
                                maxHeight={800}
                                nodes={nodesTranslated!}
                                edges={edgesTranslated!}
                            />
                        </div>
                    </>
                )}
            </div>
        </MTTPage>
    );
});
