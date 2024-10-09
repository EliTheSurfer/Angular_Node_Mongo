import { FastifyInstance } from "fastify";
import { fetchPlayersFromTeam } from "./fetcher";
import { dbPlayerToEntity } from "./mapper";
import { Player } from "../../entities/player";
import { ObjectId } from "bson";

export const getPlayersFromATeam = async (fastify: FastifyInstance, teamId: string): Promise<Player[]> => {
  const players = await fetchPlayersFromTeam(fastify, new ObjectId(teamId));
  return players.map(dbPlayerToEntity);
};
