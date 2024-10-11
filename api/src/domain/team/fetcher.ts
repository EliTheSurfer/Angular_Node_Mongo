import { FastifyInstance } from "fastify";
import { ObjectId } from "bson";
import { mongoDbQuerier } from "../../frameworks/database/querier";
import { DbPlayer } from "../../frameworks/database/types";

export const fetchPlayers = (fastify: FastifyInstance) => {
  return {
    fromThisTeam: (teamObjectId: ObjectId): Promise<DbPlayer[]> => {
      return mongoDbQuerier(fastify).getPlayersFromTeam(teamObjectId);
    }
  };
};
