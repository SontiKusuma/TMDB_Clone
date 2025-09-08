import React from 'react'

import Logo from '../MovieLogo.png'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='flex border h-[10vh] space-x-8 items-center pl-3 py-4'> 
    <img className='w-[40px]' src={Logo} alt="" />

    <Link to='/' className='text-blue-500 text-xl font-bold'>Movies</Link>
    <Link to='watchlist' className='text-blue-500 text-xl font-bold'>Watchlist</Link>
    </div>
  )
}
