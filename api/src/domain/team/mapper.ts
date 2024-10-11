import { Player } from "../../entities/player";
import { DbPlayer } from "../../frameworks/database/types";


export const dbPlayerToEntity = (player: DbPlayer): Player => ({
  _id: player._id.toString(),
  name: player.name,
  photo: player.photo,
  position: player.position,
  birthdate: player.birthdate.toISOString(),
  price: `${player.signin.amount} ${player.signin.currency}`
});
