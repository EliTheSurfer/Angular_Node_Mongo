import { Static, Type } from '@sinclair/typebox';

export const LeagueSchema = Type.Object({
  _id: Type.String(),
  name: Type.String(),
});

export type League = Static<typeof LeagueSchema>;
const TeamSchema = Type.Object({
  _id: Type.String(),
  name: Type.String(),
});

export const LeagueWithTeamsSchema = Type.Composite([
  LeagueSchema,
  Type.Object({
    teams: Type.Array(TeamSchema),
  }),
]);

export type LeagueWithTeams = Static<typeof LeagueWithTeamsSchema>;
