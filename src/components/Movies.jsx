import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({handleAddtoWatchList , handleRemoveFromWatchList , watchList}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    if(pageNo===1){
      setPageNo(pageNo)
    }
    else {
     setPageNo(pageNo - 1);
    }
  }

  const handleNext = () =>{
    setPageNo(pageNo + 1);
  }

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/popular?api_key=126147f2e252b77505ecc140f30b79a9&language=en-US&page=${pageNo}`
      )
      .then(function (res) {
        setMovies(res.data.results);
        //console.log(res.data.results);
      });

  }, [pageNo]);

  return (
    <div className="p-3">
      <div className="text-center m-4 text-2xl font-bold">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around gap-5">
        {movies.map((movieObj) => {
          const knownFor = movieObj.known_for?.[0];
          return (
            <MovieCard
              key={movieObj.id}
              movieObj={movieObj}
              poster_path={knownFor.poster_path || movieObj.profile_path}
              name= {knownFor.title}
              handleAddtoWatchList={handleAddtoWatchList}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
              watchList={watchList}
            />
          );
        })}
      </div>

      <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  );
}

export default Movies;

//https://api.themoviedb.org/3/person/popular?api_key=126147f2e252b77505ecc140f30b79a9&language=en-US&page=2




