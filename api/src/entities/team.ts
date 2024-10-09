import { Type, Static } from "@sinclair/typebox";

export const TeamSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  logo: Type.String({ format: 'uri' }),
});

export type Team = Static<typeof TeamSchema>;
