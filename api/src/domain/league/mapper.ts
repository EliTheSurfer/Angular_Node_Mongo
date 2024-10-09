import { League } from "../../entities/league";
import { Team } from "../../entities/team";
import { DbLeague, DbTeam } from "../../frameworks/mongoDB/types";

export const dbLeagueToEntity = (league: DbLeague): League => ({
  _id: league._id.toString(),
  name: league.name,
});

export const dbLeagueWithTeamsToEntity = (team: DbTeam): Team => ({
  id: team._id.toString(),
  name: team.name,
  logo: team.thumbnail
});
