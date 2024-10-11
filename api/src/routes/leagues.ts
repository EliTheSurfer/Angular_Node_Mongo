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
          ,
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
    }, async (_request, reply) => {
      try {
        const leagues = await getAllLeagues(fastify);
        return Http.OK(reply, {
          value: leagues,
          cache: { duration: cacheControlDuration.ONE_DAY },
        });
      } catch (error) {
        fastify.log.error(error);
        return Http.INTERNAL_SERVER_ERROR(reply);
      }
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
      },
      async (request, reply) => {
        const { id } = request.params;
        const teams = await getLeagueTeams(fastify, id);
        try {
          return Http.OK(reply, {
            value: teams,
            cache: { duration: cacheControlDuration.ONE_HOUR },
          });
        } catch (error) {
          fastify.log.error(error);
          return Http.INTERNAL_SERVER_ERROR(reply);
        }
      });
}
