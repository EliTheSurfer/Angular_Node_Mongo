import { FastifyInstance } from 'fastify';
import { Http } from '../frameworks/http/utils';
import { leaguesExample } from '../entities/examples';
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
            example: leaguesExample
          }
        }
      }
    }, async (request, reply) => {
      const { id } = request.params;
      const players = await getPlayersFromATeam(fastify, id);
      return Http.OK(reply, { value: players });
    });
}
