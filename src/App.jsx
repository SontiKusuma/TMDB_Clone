import React, { useEffect } from "react";
import "./App.css";
import "./index.css";
import { Navbar } from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";

function App() {
  let [watchList, setWatchList] = useState([]);
  
  function handleAddtoWatchList(movieObj) {
    if (watchList.some((m) => m.known_for?.[0]?.id === movieObj.id)) {
      return;
    }


    let newWatchList = [
      ...watchList,
      movieObj
      // {
      //   known_for: [movieObj],
      //   id: movieObj.id,
      //   profile_path: movieObj.profile_path,
      //   genre_ids: movieObj.genre_ids || [],
      // },
    ];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
    console.log(newWatchList);
  }

  let handleRemoveFromWatchList = (movieObj) => {
    let filteredWatchList = watchList.filter((movie) => {
      return movie.id !== movieObj.id;
    });
    setWatchList(filteredWatchList);
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchList));
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchList(JSON.parse(moviesFromLocalStorage));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  watchList={watchList}
                  handleAddtoWatchList={handleAddtoWatchList}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchList
                watchList={watchList}
                setWatchList={setWatchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

