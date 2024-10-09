import { Static, Type } from '@sinclair/typebox';

export const PlayerSchema = Type.Object({
  _id: Type.String(),
  name: Type.String(),
  position: Type.String(),
  photo: Type.Optional(Type.String()),
  price: Type.String(),
  birthdate: Type.String({ format: 'date', pattern: '^\\d{4}-\\d{2}-\\d{2}$' })
});

export type Player = Static<typeof PlayerSchema>;
