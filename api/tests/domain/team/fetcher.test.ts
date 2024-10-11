import { describe, it, expect, vi } from 'vitest';
import { fetchPlayers } from '../../../src/domain/team/fetcher';
import { ObjectId } from 'bson';
import { dbPlayerFactory } from '../../../src/frameworks/database/factories';
import { FastifyInstance } from 'fastify';

describe('fetchPlayersFromTeam', () => {
  it('should return players from a team', async () => {
    // given
    const { fastifyInstanceMock, teamId } = setup();

    // when
    const players = await fetchPlayers(fastifyInstanceMock).fromThisTeam(teamId);

    // then
    expect(players.length).toBeGreaterThan(0);
    expect(players[0]).toEqual({
      _id: expect.any(String),
      birthdate: expect.any(Date),
      photo: expect.any(String),
      name: expect.any(String),
      position: expect.any(String),
      signin: expect.any(Object)
    });
  });
});


const setup = () => {
  const fastifyInstanceMock = {
    mongo: {
      db: {
        collection: vi.fn().mockReturnValue({
          aggregate: vi.fn().mockReturnValue({
            toArray: vi.fn().mockReturnValue([dbPlayerFactory.build()])
          })
        })
      }
    }
  } as unknown as FastifyInstance;
  const teamId = new ObjectId('5d2cdcf7da07b95bb8f16ed1');
  return { fastifyInstanceMock, teamId };
};
