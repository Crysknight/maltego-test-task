import createFastify from 'fastify';
import { graphRepo } from './repositories';
import cors from '@fastify/cors';
import { IGraph } from '@shared/types';
import { IGraphCreate } from '@shared/types/graph';

const fastify = createFastify({ logger: true });

fastify.register(cors);

fastify.get('/api/graphs', async (_req, _res) => {
    return await graphRepo.getAllGraphs();
});

fastify.post<{
    Body: IGraphCreate,
}>('/api/graphs', async (request, _res) => {
    return await graphRepo.createGraph(request.body);
});

fastify.get<{
    Params: { graphId: IGraph['id'] }
}>('/api/graphs/:graphId', async (request, _res) => {
    return await graphRepo.getGraphById(request.params.graphId);
});

fastify.delete<{
    Params: { graphId: IGraph['id'] }
}>('/api/graphs/:graphId', async (request, _res) => {
    return await graphRepo.deleteGraph(request.params.graphId);
});

(async () => {
    try {
        await fastify.listen({ port: 5000 });
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
})();
