import { FastifyInstance } from 'fastify';
import { getAllLeagues, getLeagueTeams } from '../domain/league/useCases';
import { Http, cacheControlDuration } from '../frameworks/http/utils';
import { LeagueSchema } from '../entities/league';
import { Type } from '@sinclair/typebox';
import { TeamSchema } from '../entities/team';
import { leaguesExample, teamsExample } from '../entities/examples';
export default async function (fastify: FastifyInstance) {
  fastify
    .get('/leagues', {
      schema: {
        description: 'Get all leagues',
        tags: ['leagues'],
        response: {
          200: {
            type: 'array',
            items: LeagueSchema,
            example: leaguesExample
          }
        }
      }
    }, async (_request, reply) => {
      const leagues = await getAllLeagues(fastify);
      return Http.OK(reply, { value: leagues });
    })
    .get<{ Params: { id: string } }>('/leagues/:id',
      {
        schema: {
          description: 'Get teams for a specific league',
          tags: ['leagues'],
          params: Type.Object({
            id: Type.String({ type: 'string' })
          }),
          response: {
            200: {
              type: 'array',
              items: TeamSchema,
              example: teamsExample
            }
          }
        }
      }
      ,
      async (request, reply) => {
        const { id } = request.params;
        const teams = await getLeagueTeams(fastify, id);
        return Http.OK(reply, {
          value: teams,
          cache: { duration: cacheControlDuration.ONE_HOUR },
        });
      });
}
