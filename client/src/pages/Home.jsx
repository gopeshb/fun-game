import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='w-full flex justify-center items-center'>
      <Link to='/user/game'>
      <button className='p-3 text-white font-bold '>Load Game</button>
      </Link>
    </div>
  )
}
