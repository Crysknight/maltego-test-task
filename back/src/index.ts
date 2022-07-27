import createFastify from 'fastify';
import { graphRepo } from './repositories';

const fastify = createFastify({ logger: true });

fastify.get('/api/graphs', async (_req, _res) => {
    return await graphRepo.getAllGraphs();
});

(async () => {
    try {
        await fastify.listen({ port: 5000 });
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
})();
