import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
//components
import MoviesGrid from "./components/MoviesGrid";
import logo from "./assets/logo.svg";
import volumeOff from "./assets/volume_off.svg";
import volumeOn from "./assets/volume_on.svg";
//style
import "./App.css";
//ts interface
import IFilmAndIsFavoite from "./types/IFilmAndIsFavoite";

const App: React.FC = () => {
  useEffect(() => {
    startAnimation();
    getData();
  }, []);

  const [muted, setMuted] = useState(true);
  //#animation region
  const intro = useRef<HTMLElement>(null); // long time ago
  const title = useRef<HTMLElement>(null); // code wars
  const content = useRef<HTMLDivElement>(null); // grid
  const audio = useRef<HTMLAudioElement>(document.createElement("audio"));

  const startAnimation = () => {
    let tl = gsap.timeline();
    tl.to(intro.current, {
      opacity: 1,
      delay: 1,
      duration: 4.5,
    })
      .to(intro.current, {
        opacity: 0,
        duration: 1.5,
        onComplete: () => {
          audio.current.play();
        },
      })
      .set(title.current, { opacity: 1, scale: 2.75, delay: 0.5 })
      .to(title.current, { scale: 0.05, ease: "power2", duration: 8 })
      .to(title.current, { opacity: 0, duration: 1.5 }, "-=1.5")
      .to(content.current, { opacity: 1, duration: 1.5 });
  };
  //#endregion
  //
  //#handle fetch data and local storge region
  const [data, setData] = useState<IFilmAndIsFavoite[]>();
  const getData = async () => {
    const favoritesArr: string[] = JSON.parse(
      localStorage.getItem("favoritesArr")!
    );
    const url = "https://swapi.dev/api/films";
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("got data");
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
  };

  const toggleIsFavorite = (episode_id: string) => {
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
  //#endregion

  return (
    <div className="App">
      <div className="container">
        <section className="intro" ref={intro}>
          <p>
            A long time ago, in a galaxy far,
            <br /> far away....
          </p>
        </section>
        <section className="title" ref={title}>
          <img src={logo} alt="Code Wars title" />
        </section>

        <div className="content" ref={content}>
          <MoviesGrid data={data!} sendDataToParent={toggleIsFavorite} />
        </div>
        <audio ref={audio} muted={muted}>
          <source
            type="audio/mpeg"
            src="https://ia801501.us.archive.org/23/items/StarWars_20180709/Star%20Wars.mp3"
          />
        </audio>
        <button
          className="volume"
          type="button"
          onClick={() => {
            audio.current.muted = !muted;
            setMuted(!muted);
          }}>
          {muted ? (
            <img src={volumeOff} alt="Volume is off" />
          ) : (
            <img src={volumeOn} alt="Volume is on" />
          )}
        </button>
      </div>
    </div>
  );
};

export default App;
