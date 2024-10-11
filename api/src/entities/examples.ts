import { League } from "./league";
import { Player } from "./player";
import { Team } from "./team";

export const leaguesExample: League[] = [
  {
    _id: '1',
    name: 'Premier League'
  },
  {
    _id: '2',
    name: 'La Liga'
  }
];
export const teamsExample: Team[] = [
  {
    id: '1',
    name: 'Manchester United',
    logo: 'https://example.com/manchester-united-logo.png'
  },
  {
    id: '2',
    name: 'Liverpool',
    logo: 'https://example.com/liverpool-logo.png'
  }
];

export const playersExample: Player[] = [
  {
    _id: '1',
    name: 'Cristiano Ronaldo',
    position: 'Forward',
    photo: 'https://example.com/john-doe.jpg',
    price: '50000000',
    birthdate: '1995-03-15'
  },
  {
    _id: '2',
    name: 'Zinedine Zidane',
    position: 'Midfielder',
    price: '40000000',
    birthdate: '1997-08-22'
  },
  {
    _id: '3',
    name: 'Roberto Carlos',
    position: 'Defender',
    photo: 'https://example.com/mike-johnson.jpg',
    price: '35000000',
    birthdate: '1993-11-30'
  }
];
