import { describe, it, expect, vi } from 'vitest';
import { fetchTeamsFromLeague } from '../../../src/domain/league/fetcher';
import { ObjectId } from 'bson';
import { dbLeagueWithTeamsFactory } from '../../../src/frameworks/mongoDB/factories';
import { FastifyInstance } from 'fastify';

describe('fetchTeamsFromLeague', () => {
  it('should return teams from a league', async () => {
    // given
    const { fastifyInstanceMock, leagueId } = setup();
    // when
    const teams = await fetchTeamsFromLeague(fastifyInstanceMock, leagueId);

    // then
    expect(teams.length).toEqual(3);
    expect(teams[0]).toEqual({
      _id: expect.any(String),
      name: expect.any(String),
      thumbnail: expect.any(String),
      players: expect.any(Array)
    });
  });
});


const setup = () => {
  const fastifyInstanceMock = {
    mongo: {
      db: {
        collection: vi.fn().mockReturnValue({
          aggregate: vi.fn().mockReturnValue({
            toArray: vi.fn().mockReturnValue([dbLeagueWithTeamsFactory.build()])
          })
        })
      }
    }
  } as unknown as FastifyInstance;
  const leagueId = new ObjectId('5d2cdcf7da07b95bb8f16ed1');
  return { fastifyInstanceMock, leagueId };
};
