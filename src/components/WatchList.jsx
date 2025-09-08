import React, { useEffect, useState } from "react";

import genreids from "../Utility/genre"

function watchList({ watchList , setWatchList , handleRemoveFromWatchList}) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(['All Genres']);
  const [currGenre , setCurrGenre] = useState('All Genres');

  let handleSearch = (e) => {
    setSearch(e.target.value)
  };

  let handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  let sortIncreasing = () => {
    let sortedIncreasing = watchList.sort((movieA , movieB) => {
      return movieA.known_for[0].vote_average - movieB.known_for[0].vote_average
    })
    setWatchList([...sortedIncreasing])
  }

  let sortDecreasing = () => {
    let sortedDecreasing = watchList.sort((movieA , movieB) => {
      return movieB.known_for[0].vote_average - movieA.known_for[0].vote_average
    })
    setWatchList([...sortedDecreasing])
  }

  useEffect(() => {
  let temp = watchList
    .map((movieObj) => {
      const firstGenreId = movieObj?.known_for?.[0]?.genre_ids?.[0];
      return firstGenreId !== undefined ? genreids[firstGenreId] : null;
    })
    .filter((genre) => genre !== null); // Remove invalid ones

  // Optional: make it unique
  const uniqueGenres = Array.from(new Set(temp));

  setGenreList(['All Genres', ...uniqueGenres]);
  console.log(uniqueGenres);
}, [watchList]);

  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
      {genreList.map((genre) => (
   <div onClick={()=>handleFilter(genre)} className={ currGenre==genre ? "flex justify-center items-center h-[2rem] w-[6rem] bg-blue-400 rounded-xl text-white font-bold" : "flex justify-center items-center h-[2rem] w-[6rem] bg-gray-400/50 rounded-xl text-white font-bold mx-3"}>
          {genre}
  </div>
))}     
        
      </div>

      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search for movies"
          className="bg-gray-200 h-[2rem] w-[18rem] outline-none px-3"
        ></input>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200  m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center">
                <div onClick={sortIncreasing} className="p-2"><i class="fa-solid fa-arrow-up"></i></div>
                <div className="p-2">Ratings</div>
                <div onClick={sortDecreasing} className="p-2"><i class="fa-solid fa-arrow-down"></i></div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchList.filter(( movieObj )=> {
              if(currGenre=='All Genres') {
              return true
            }
            else{
              return genreids[movieObj.known_for?.[0]?.genre_ids?.[0]] === currGenre;
            }
          })
            .filter((movieObj) => {
                const knownFor = movieObj?.known_for?.[0];
                const title = knownFor?.title || knownFor?.original_name || "";
                return title.toLowerCase().includes(search.toLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr key={movieObj.known_for[0].id} className="border-b-2">

                    <td className="flex items-center px-5 py-5">
                      <img
                        className="h-[5rem] w-[10rem]"
                        src={`https://image.tmdb.org/t/p/w185${movieObj.known_for[0].poster_path}`}
                      />

                      <div className="mx-10">
                        {movieObj.known_for[0].title ||
                          movieObj.known_for[0].original_name}
                      </div>
                    </td>
                    <td>{movieObj.known_for[0].vote_average}</td>
                    <td>{movieObj.popularity}</td>
                     <td>
  {genreids[movieObj.known_for?.[0]?.genre_ids?.[0]] || "Unknown"}
</td>


                    <td onClick={()=> handleRemoveFromWatchList(movieObj)} className="text-red-700">Delete</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default watchList;


