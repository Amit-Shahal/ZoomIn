import * as React from "react";
//components
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
//interface
import IFilmAndIsFavoite from "../types/IFilmAndIsFavoite";
//style
import "../App.css";

interface Props {
  movies: IFilmAndIsFavoite[] | undefined;
  sendMovieToParent: (episode_id: string) => void;
  sendIdAddToFavorites: (episode_id: string) => void;
}

const MoviesList: React.FC<Props> = (props) => {
  const { movies, sendMovieToParent, sendIdAddToFavorites } = props;

  const handleClick = (episode_id: string) => {
    sendMovieToParent(episode_id);
  };
  const toggleIsFavorite = (episode_id: string) => {
    sendIdAddToFavorites(episode_id);
  };

  return (
    <div style={movieListDivStyle}>
      {movies?.map((movie: IFilmAndIsFavoite, index) => {
        return (
          <Grid
            container
            key={index}
            direction="row"
            onClick={() => handleClick(movie.episode_id)}
            className={"movieListDiv"}
            sx={{ height: `${100 / movies.length}%`, cursor: "pointer" }}>
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              xs={12}
              md={10}>
              <Typography
                variant="h6"
                align="center"
                // adjustable text font size
                style={{ fontSize: "3vw" }}>
                {movie.title}
              </Typography>
            </Grid>
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              xs={12}
              md={2}>
              <IconButton onClick={() => toggleIsFavorite(movie.episode_id)}>
                {movie.isFavoite ? (
                  <FavoriteIcon sx={{ color: "rgb(229, 177, 58)" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "rgb(229, 177, 58)" }} />
                )}
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};
export default MoviesList;

const movieListDivStyle = {
  height: "90vh",
  borderWidth: 5,
  borderColor: "rgb(229, 177, 58)",
  borderStyle: "solid",
  borderRadius: 30,
};
