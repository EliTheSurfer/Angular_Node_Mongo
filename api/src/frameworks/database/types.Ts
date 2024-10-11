import { ObjectId } from "bson";
import { WithId } from "mongodb";

export type DbLeague = WithId<{
  name: string;
  sport: string;
  teams: string[];
}>;

export type DbTeam = WithId<{
  name: string;
  thumbnail: string;
  players: string[];
  leagueId: string;
}>;
export type DbLeagueWithTeams = WithId<{
  name: string;
  sport: string;
  teams: string[];
  teamDetails: Array<{
    _id: string;
    name: string;
    thumbnail: string;
    players: string[];
  }>;
}>;

export interface DbPlayer {
  _id: string;
  name: string;
  photo?: string;
  position: string;
  birthdate: Date;
  signin: {
    amount: number;
    currency: string;
  };
}

export interface dbQuerier {
  getPlayersFromTeam: (teamId: ObjectId) => Promise<DbPlayer[]>;
  getTeamsFromLeague: (leagueId: ObjectId) => Promise<DbTeam[]>;
  getAllLeagues: () => Promise<DbLeague[]>;
}
