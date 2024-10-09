import { FastifyInstance } from "fastify";
import { ObjectId } from "bson";
import { DbTeam, DbLeagueWithTeams, DbLeague } from "../../frameworks/mongoDB/types";
import { TABLES } from "../../frameworks/mongoDB/utils";

export const fetchTeamsFromLeague = async (fastify: FastifyInstance, leagueObjectId: ObjectId): Promise<DbTeam[]> => {
  const result = await fastify.mongo.db?.collection<DbLeagueWithTeams>(TABLES.LEAGUES).aggregate([
    { $match: { _id: leagueObjectId } },
    {
      $lookup: {
        from: TABLES.TEAMS,
        localField: TABLES.TEAMS,
        foreignField: '_id',
        as: 'teamDetails'
      }
    }
  ]).toArray();

  return result?.[0]?.teamDetails ?? [];
};

export const fetchAllLeagues = async (fastify: FastifyInstance): Promise<DbLeague[]> => {
  return fastify.mongo.db?.collection<DbLeague>(TABLES.LEAGUES).find().toArray() ?? [];
};
