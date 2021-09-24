import React, { useEffect, useState } from "react";
//ts interface
import IFilmAndIsFavoite from "../types/IFilmAndIsFavoite";
//componenets
import { Grid } from "@mui/material";
import MoviesList from "./MoviesList";
import MovieDetails from "./MovieDetails";

const MoviesGrid: React.FC = () => {
  const [data, setData] = useState<IFilmAndIsFavoite[]>();
  const [pressedMovie, setPressedMovie] = useState<IFilmAndIsFavoite>();
  //#fetch data and local storge region
  useEffect(() => {
    const favoritesArr: string[] = JSON.parse(
      localStorage.getItem("favoritesArr")!
    );

    const url = "https://swapi.dev/api/films";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //set isFavorite in data
        if (favoritesArr !== null) {
          data.results.forEach((movie: IFilmAndIsFavoite) => {
            for (let favorite of favoritesArr) {
              if (movie.episode_id === favorite) {
                movie.isFavoite = true;
                break;
              } else {
                movie.isFavoite = false;
              }
            }
          });
        } else {
          data.results.forEach((movie: IFilmAndIsFavoite) => {
            movie.isFavoite = false;
          });
        }
        setData(data.results);
      });
  }, []);
  //#endregion
  const getClickedMovie = (episode_id: string) => {
    setPressedMovie(data?.find((movie) => movie.episode_id === episode_id));
  };

  const toggleFavorites = (episode_id: string) => {
    let favoritesArr: string[] = [];
    setData((prevData) => {
      for (let movie of prevData!) {
        if (movie.episode_id === episode_id) {
          movie.isFavoite = !movie.isFavoite;
        }
        if (movie.isFavoite) {
          favoritesArr.push(movie.episode_id);
        }
      }
      return [...prevData!];
    });
    localStorage.setItem("favoritesArr", JSON.stringify(favoritesArr));
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
