//magic
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
//components
import { Box, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
//interface
import IFilmAndIsFavoite from "../types/IFilmAndIsFavoite";
//style
import "../App.css";
//util
import convertToRoman from "../utils/convertNumberToRomanNumerals";

interface MovieProps {
  movie: IFilmAndIsFavoite | undefined;
  sendIdAddToFavorites: (episode_id: string) => void;
}
const MovieDetails: React.FC<MovieProps> = (props) => {
  const { movie, sendIdAddToFavorites } = props;
  const content = useRef<HTMLDivElement>(null);
  const [episodeNum, setEpisodeNum] = useState<string>();

  useEffect(() => {
    //parse episode id to roman numerals
    let int = parseInt(movie?.episode_id!, 10);
    setEpisodeNum(convertToRoman(int));

    //animation
    if (movie !== undefined) {
      let tl = gsap.timeline();
      tl.fromTo(
        content.current,
        { top: "100%" },
        { top: "-170%", duration: 200 }
      );
    }
  }, [movie]);

  const toggleIsFavorite = (episode_id: string) => {
    sendIdAddToFavorites(episode_id);
  };
  return (
    <>
      <Box sx={boxStyle}>
        {/* add to favorite - btn & title */}
        {movie !== undefined ? (
          <Grid container>
            <Grid
              item
              container
              xs={12}
              alignItems="center"
              justifyContent="center">
              {movie.isFavoite ? "Remove From" : "Add To"} Favorites
            </Grid>
            <Grid
              item
              xs={12}
              container
              alignItems="center"
              justifyContent="center">
              <IconButton onClick={() => toggleIsFavorite(movie.episode_id)}>
                {movie.isFavoite ? (
                  <FavoriteIcon sx={{ color: "rgb(229, 177, 58)" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "rgb(229, 177, 58)" }} />
                )}
              </IconButton>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
        {/*opning crawl animation  */}
        <section className="crawl">
          <div className="crawlContent" ref={content}>
            <h1 className="episode-number">Episode {episodeNum}</h1>
            <h2 className="episode-title">{movie?.title.toUpperCase()}</h2>
            <p>{movie?.opening_crawl}</p>
          </div>
        </section>
        {/* this div is position absolute to the bottom of the window, to hide opening crawl animation */}
        <div className={"hideTextDiv"}></div>
      </Box>
    </>
  );
};

export default MovieDetails;
const boxStyle = {
  height: "90vh",
  borderWidth: 5,
  borderColor: "rgb(229, 177, 58)",
  borderStyle: "solid",
  borderRadius: 10,
};
