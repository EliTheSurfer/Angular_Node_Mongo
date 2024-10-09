import { FastifyInstance } from "fastify";
import { ObjectId } from "bson";
import { DbTeam, DbPlayer } from "../../frameworks/mongoDB/types";
import { TABLES } from "../../frameworks/mongoDB/utils";

export const fetchPlayersFromTeam = async (fastify: FastifyInstance, teamObjectId: ObjectId): Promise<DbPlayer[]> => {
  const result = await fastify.mongo.db?.collection<DbTeam>(TABLES.TEAMS).aggregate([
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

  return result ?? [];
};
