import { FastifyInstance } from "fastify";
import { ObjectId } from "bson";
import { DbTeam, DbLeague } from "../../frameworks/database/types";
import { mongoDbQuerier } from "../../frameworks/database/querier";

export const fetchTeams = (fastify: FastifyInstance) => {
  return {
    fromThisLeague: (leagueObjectId: ObjectId): Promise<DbTeam[]> => {
      return mongoDbQuerier(fastify).getTeamsFromLeague(leagueObjectId);
    }
  };
};

export const fetchAllLeagues = async (fastify: FastifyInstance): Promise<DbLeague[]> => {
  return mongoDbQuerier(fastify).getAllLeagues();
};
