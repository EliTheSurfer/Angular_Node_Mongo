import Fastify from 'fastify';
import fastifyMongo from '@fastify/mongodb';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import leaguesRoutes from './routes/leagues';
import teamRoutes from './routes/team';
const fastify = Fastify({ logger: true });
import cors from '@fastify/cors';

fastify.register(fastifyMongo, {
  url: 'mongodb://localhost:27017/sports'
});
fastify.register(cors, {
  origin: 'http://localhost:4200',
  methods: ['GET'],
  credentials: true
});

fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Sports API Documentation',
      description: 'Documentation for Sports API',
      version: '0.1.0'
    },
  },
});

fastify.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  }
});


fastify.after(() => {
  fastify
    .register(leaguesRoutes)
    .register(teamRoutes);

});


fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});
