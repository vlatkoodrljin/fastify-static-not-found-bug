const fastify = require('fastify')({ logger: true });
const static = require('./static');

const start = async () => {
  try {
    fastify.get('/', async () => {
      return { hello: 'world' };
    });

    fastify.register(static, { prefix: '/public'});

    fastify.setNotFoundHandler(async (request, reply) => {
      reply.statusCode = 404;
      return { status: 'not-found' };
    });
  
    fastify.setErrorHandler(async (error, request, reply) => {
      reply.statusCode = 500;
      return { status: 'error' };
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
