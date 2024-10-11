import { describe, it, expect, vi } from 'vitest';
import { getAllLeagues, getLeagueTeams } from '../../../src/domain/league/useCases';
import { dbLeagueFactory, dbLeagueWithTeamsFactory, leagueId } from '../../../src/frameworks/database/factories';
import { FastifyInstance } from 'fastify';

describe('getAllLeagues', () => {
  it('should return all leagues', async () => {
    // given
    const { fastifyInstanceMock } = setup().numberOfLeagues(10);

    // when
    const leagues = await getAllLeagues(fastifyInstanceMock);

    // then
    expect(leagues.length).toEqual(10);
    expect(leagues[0]).toEqual(expect.objectContaining({
      _id: expect.any(String),
      name: expect.any(String),
    }));
  });
});

describe('getLeagueTeams', () => {
  it('should return teams from a league', async () => {
    // given
    const { fastifyInstanceMock, leagueId } = setup().numberOfLeagues(3);

    // when
    const teams = await getLeagueTeams(fastifyInstanceMock, leagueId);

    // then
    expect(teams.length).toEqual(3);
    expect(teams[0]).toEqual(expect.objectContaining({
      id: expect.any(String),
      logo: expect.any(String),
      name: expect.any(String),
    }));
  });
});

const setup = () => {
  return {
    numberOfLeagues: (numberOfLeagues: number) => {
      const fastifyInstanceMock = {
        mongo: {
          db: {
            collection: vi.fn().mockReturnValue({
              find: vi.fn().mockReturnValue({
                toArray: vi.fn().mockReturnValue(dbLeagueFactory.buildList(numberOfLeagues))
              }),
              aggregate: vi.fn().mockReturnValue({
                toArray: vi.fn().mockReturnValue([dbLeagueWithTeamsFactory.build()])
              })
            })
          }
        }
      } as unknown as FastifyInstance;
      return { fastifyInstanceMock, leagueId: leagueId.toString() };
    }
  };
};
