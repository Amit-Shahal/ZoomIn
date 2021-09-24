import React, { useState } from "react";
//ts interface
import IFilmAndIsFavoite from "../types/IFilmAndIsFavoite";
//componenets
import { Grid } from "@mui/material";
import MoviesList from "./MoviesList";
import MovieDetails from "./MovieDetails";
interface Props {
  data: IFilmAndIsFavoite[];

  sendDataToParent: (episode_id: string) => void;
}
const MoviesGrid: React.FC<Props> = (props) => {
  const { data, sendDataToParent } = props;
  const [pressedMovie, setPressedMovie] = useState<IFilmAndIsFavoite>();

  const getClickedMovie = (episode_id: string) => {
    setPressedMovie(data?.find((movie) => movie.episode_id === episode_id));
  };

  const toggleFavorites = (episode_id: string) => {
    sendDataToParent(episode_id);
  };

  return (
    <Grid container spacing={1} sx={gridStyle}>
      <Grid item xs={4}>
        <MoviesList
          movies={data}
          sendMovieToParent={getClickedMovie}
          sendIdAddToFavorites={toggleFavorites}
        />
      </Grid>
      <Grid item xs={8}>
        <MovieDetails
          movie={pressedMovie}
          sendIdAddToFavorites={toggleFavorites}
        />
      </Grid>
    </Grid>
  );
};

export default MoviesGrid;

const gridStyle = { marginTop: "3vh", width: "90%", marginLeft: "5%" };
