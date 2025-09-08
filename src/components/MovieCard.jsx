import React from "react";

function MovieCard({
  movieObj,
  poster_path,
  name,
  handleAddtoWatchList,
  handleRemoveFromWatchList,
  watchList,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchList.length; i++) {
      if (watchList[i].id === movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="h-[50vh] w-[170px] bg-center bg-cover overflow-hidden rounded-lg hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        backgroundImage:
          //'url(https://i.pinimg.com/originals/0e/39/d5/0e39d5956e5370dcd7fca84dcb641a58.jpg)'
          `url(https://image.tmdb.org/t/p/w185${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => handleRemoveFromWatchList(movieObj)}
          className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
        >
          {" "}
          &#10060;{" "}
        </div>
      ) : (
        <div
          onClick={() => handleAddtoWatchList(movieObj)}
          className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
        >
          &#128525;
        </div>
      )}

      <div className="text-white text-xl text-center w-full bg-gray-900/60 p-2">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
