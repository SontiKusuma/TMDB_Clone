import React from 'react'

function Banner() {
  return (
    <div className='w-full h-[120vh] md:h-[95vh]  bg-cover bg-center flex items-end' style={{backgroundImage : 'url(https://images.alphacoders.com/111/thumb-1920-1119553.jpg)'}}>
        <div className='text-white text-xl text-center w-full bg-gray-900/60 p-3'>Avengers Endgame</div>
    </div>
    
  )
}

export default Banner