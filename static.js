const path = require('path');
const static = require('@fastify/static');

module.exports = async (fastify) => {
  fastify.register(static, {
    root: path.join(__dirname, 'public'),
  });

  fastify.setNotFoundHandler(async (request, reply) => {
    reply.statusCode = 404;
    return { status: 'static-not-found' };
  });

  fastify.setErrorHandler(async (error, request, reply) => {
    reply.statusCode = 500;
    return { status: 'static-error' };
  });
};
