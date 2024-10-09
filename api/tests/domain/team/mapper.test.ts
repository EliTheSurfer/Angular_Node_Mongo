import { describe, it, expect } from 'vitest';
import { dbPlayerFactory } from '../../../src/frameworks/mongoDB/factories';
import { dbPlayerToEntity } from '../../../src/domain/team/mapper';

describe('dbTeamToEntity Mapper', () => {
  it('should map the db team to an entity', () => {
    // given
    const dbPlayer = dbPlayerFactory.build();

    // when
    const entity = dbPlayerToEntity(dbPlayer);

    // then
    expect(entity).toEqual({
      _id: '5d2d058cda07b95bb8f16f80',
      birthdate: '1990-01-01T00:00:00.000Z',
      name: 'Player1',
      photo: 'https://www.thesportsdb.com//images//media//player//headshot//a1af2i1557005128.png',
      position: 'Goalkeeper',
      price: '1000000 EUR',
    });
  });
});
