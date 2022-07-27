import createFastify from 'fastify';
import path from 'path';
import cors from '@fastify/cors';
import fStatic from '@fastify/static';

import { IGraph, IGraphCreate } from '@shared/types';

import { graphRepo } from './repositories';

const fastify = createFastify({ logger: true });

fastify.register(cors);
fastify.register(fStatic, {
    root: path.resolve(__dirname, '../../../static'),
});

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

fastify.get('/', async (_req, reply) => {
    return reply.sendFile('index.html');
});

fastify.setNotFoundHandler((_req, reply) => {
    reply.sendFile('index.html');
});

(async () => {
    try {
        await fastify.listen({ port: 5000 });
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
})();
