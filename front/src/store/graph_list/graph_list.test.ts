import { graphs } from '../../fixtures';
import { GlobalStore } from '../global_store';
import { GraphList } from './graph_list';

const graphList = new GraphList(new GlobalStore());

graphList.setList(graphs);

it('filters correctly by the search', () => {
    graphList.setSearch('TGraph 1');
    expect(graphList.listWithSearch).toHaveLength(1);
    expect(graphList.listWithSearch?.[0].id).toBe('t_graph_1');
});

it('search is case insensitive', () => {
    graphList.setSearch('tgraPH 1');
    expect(graphList.listWithSearch).toHaveLength(1);
    expect(graphList.listWithSearch?.[0].id).toBe('t_graph_1');
});

it('sorts items alphabetically', () => {
    graphList.setSearch('graph');
    expect(graphList.listWithSearch?.[0].id).toBe('a_graph_2');
    expect(graphList.listWithSearch?.[1].id).toBe('a_graph_3');
    expect(graphList.listWithSearch?.[2].id).toBe('a_graph_4');
    expect(graphList.listWithSearch?.[3].id).toBe('t_graph_1');
});

it('sorts items prioritized by corresponding name, then node label', () => {
    graphList.setSearch('AGraph 2');
    expect(graphList.listWithSearch?.[0].id).toBe('a_graph_2');
    expect(graphList.listWithSearch?.[1].id).toBe('a_graph_3');
});
