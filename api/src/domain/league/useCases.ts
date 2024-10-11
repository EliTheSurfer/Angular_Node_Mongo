import { FastifyInstance } from "fastify";
import { League } from "../../entities/league";
import { dbLeagueToEntity, dbLeagueWithTeamsToEntity } from "./mapper";
import { Team } from "../../entities/team";
import { fetchAllLeagues, fetchTeams } from "./fetcher";
import { ObjectId } from "bson";

export const getAllLeagues = async (fastify: FastifyInstance): Promise<League[]> => {
  const leagues = await fetchAllLeagues(fastify);
  return leagues.map(dbLeagueToEntity);
};

export const getLeagueTeams = async (fastify: FastifyInstance, leagueId: string): Promise<Team[]> => {
  const leagueObjectId = new ObjectId(leagueId);
  const teams = await fetchTeams(fastify).fromThisLeague(leagueObjectId);
  return teams.map(dbLeagueWithTeamsToEntity);
};
