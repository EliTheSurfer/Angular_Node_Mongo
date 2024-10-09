import { describe, it, expect, vi } from 'vitest';
import { getPlayersFromATeam } from '../../../src/domain/team/useCases';
import { dbPlayerFactory, leagueId } from '../../../src/frameworks/mongoDB/factories';
import { FastifyInstance } from 'fastify';

describe('getPlayersFromATeam', () => {
  it('should return players from a team', async () => {
    // given
    const { fastifyInstanceMock, teamId } = setup().numberOfPlayers(5);

    // when
    const players = await getPlayersFromATeam(fastifyInstanceMock, teamId);

    // then
    expect(players.length).toEqual(5);
    expect(players[0]).toEqual(expect.objectContaining({
      _id: expect.any(String),
      name: expect.any(String),
      position: expect.any(String),
      birthdate: expect.any(String),
      photo: expect.any(String),
      price: expect.any(String),
    }));
  });
});

const setup = () => {
  return {
    numberOfPlayers: (numberOfPlayers: number) => {
      const fastifyInstanceMock = {
        mongo: {
          db: {
            collection: vi.fn().mockReturnValue({
              aggregate: vi.fn().mockReturnValue({
                toArray: vi.fn().mockReturnValue(dbPlayerFactory.buildList(numberOfPlayers))
              })
            })
          }
        }
      } as unknown as FastifyInstance;
      return { fastifyInstanceMock, teamId: leagueId.toString() };
    }
  };
};
