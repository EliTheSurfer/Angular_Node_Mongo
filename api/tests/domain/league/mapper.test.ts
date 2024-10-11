import { describe, it, expect } from 'vitest';
import { dbLeagueToEntity } from "../../../src/domain/league/mapper";
import { dbLeagueFactory } from "../../../src/frameworks/database/factories";

describe('dbLeagueToEntity Mapper', () => {
  it('should map the db league to an entity', () => {
    // given
    const league = dbLeagueFactory.build();

    // when
    const entity = dbLeagueToEntity(league);

    // then
    expect(entity).toEqual({
      _id: '5d2cdcf7da07b95bb8f16ed1',
      name: 'English Premier League',
    });
  });
});
