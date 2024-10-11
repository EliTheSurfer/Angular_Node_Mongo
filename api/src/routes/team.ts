import { FastifyInstance } from 'fastify';
import { cacheControlDuration, Http } from '../frameworks/http/utils';
import { playersExample } from '../entities/examples';
import { PlayerSchema } from '../entities/player';
import { getPlayersFromATeam } from '../domain/team/useCases';

export default async function (fastify: FastifyInstance) {

  fastify
    .get<{ Params: { id: string } }>('/team/:id', {
      schema: {
        description: 'Get players list from a team',
        tags: ['team', 'players'],
        response: {
          200: {
            type: 'array',
            items: PlayerSchema,
            example: playersExample
          },
          500: {
            type: 'object',
            properties: {
              statusCode: { type: 'number', example: 500 },
              error: { type: 'string', example: 'Internal Server Error' },
              message: { type: 'string', example: 'An unexpected error occurred' }
            }
          }
        }
      }
    }, async (request, reply) => {
      try {
        const { id } = request.params;
        const players = await getPlayersFromATeam(fastify, id);
        return Http.OK(reply, {
          value: players,
          cache: { duration: cacheControlDuration.FIVE_MINUTES },
        });
      } catch (error) {
        fastify.log.error(error);
        return Http.INTERNAL_SERVER_ERROR(reply);
      }
    });
}
