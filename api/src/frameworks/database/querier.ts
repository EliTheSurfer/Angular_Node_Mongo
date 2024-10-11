import { FastifyInstance } from "fastify";
import { ObjectId } from "bson";
import { DbLeague, DbLeagueWithTeams, DbPlayer, dbQuerier, DbTeam } from "./types";
import { TABLES } from "./utils";

export const mongoDbQuerier = (fastify: FastifyInstance): dbQuerier => {
  return {
    getPlayersFromTeam: async (teamObjectId: ObjectId): Promise<DbPlayer[]> => {
      return await fastify.mongo.db?.collection<DbTeam>(TABLES.TEAMS).aggregate([
        { $match: { _id: teamObjectId } },
        {
          $lookup: {
            from: TABLES.PLAYERS,
            localField: TABLES.PLAYERS,
            foreignField: "_id",
            as: "playerDetails"
          }
        },
        { $unwind: "$playerDetails" },
        {
          $project: {
            _id: "$playerDetails._id",
            name: "$playerDetails.name",
            photo: "$playerDetails.thumbnail",
            position: "$playerDetails.position",
            birthdate: "$playerDetails.born",
            signin: "$playerDetails.signin"
          }
        }
      ]).toArray() as DbPlayer[];
    },
    getTeamsFromLeague: async (leagueObjectId: ObjectId): Promise<DbTeam[]> => {
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
    },
    getAllLeagues: async (): Promise<DbLeague[]> => {
      return await fastify.mongo.db?.collection<DbLeague>(TABLES.LEAGUES).find().toArray() ?? [];
    }
  };
};
