import { Factory } from 'fishery';
import { DbLeague, DbLeagueWithTeams, DbPlayer, DbTeam } from './types';
import { ObjectId } from 'bson';
import { randomUUID } from 'node:crypto';

export const leagueId = new ObjectId('5d2cdcf7da07b95bb8f16ed1');
const teamIds = [
  '5d2d01fdda07b95bb8f16f0a',
  '5d2d02d7da07b95bb8f16f2a',
  '5d2d8f60da07b95bb8f17170'
];

const teamDetailFactory = Factory.define<DbLeagueWithTeams['teamDetails'][number]>((sequence) => ({
  _id: randomUUID(),
  name: `Team${sequence}`,
  thumbnail: 'https://www.thesportsdb.com//images//media//team//badge//a1af2i1557005128.png',
  players: [
    '5d2d058cda07b95bb8f16f80',
    '5d2d0653da07b95bb8f16fa8'
  ]
}));

export const dbLeagueFactory = Factory.define<DbLeague>(() => ({
  _id: leagueId,
  name: 'English Premier League',
  sport: 'soccer',
  teams: teamIds
}));

export const dbLeagueWithTeamsFactory = Factory.define<DbLeagueWithTeams>(() => ({
  _id: leagueId,
  name: 'English Premier League',
  sport: 'soccer',
  teams: teamIds,
  teamDetails: teamDetailFactory.buildList(3)
}));

export const dbTeamFactory = Factory.define<DbTeam>(() => ({
  _id: new ObjectId('5d2cdcf7da07b95bb8f16ed1'),
  name: 'Arsenal',
  leagueId: leagueId.toString(),
  thumbnail: 'https://www.thesportsdb.com//images//media//team//badge//a1af2i1557005128.png',
  players: [
    '5d2d058cda07b95bb8f16f80',
  ]
}));

export const dbPlayerFactory = Factory.define<DbPlayer>(() => ({
  _id: '5d2d058cda07b95bb8f16f80',
  name: 'Player1',
  photo: 'https://www.thesportsdb.com//images//media//player//headshot//a1af2i1557005128.png',
  position: 'Goalkeeper',
  birthdate: new Date('1990-01-01'),
  signin: {
    amount: 1000000,
    currency: 'EUR'
  }
}));
