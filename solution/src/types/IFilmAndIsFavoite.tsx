import { IFilm } from "swapi-ts";
export default interface IFilmAndIsFavoite extends IFilm {
  isFavoite: boolean;
}
