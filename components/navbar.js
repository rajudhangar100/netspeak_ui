import React from 'react'

const Navbar = () => {
  return (
     <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20 text-white shadow-md">
          <h1 className="text-2xl font-bold text-neon-green drop-shadow-md">NetSage</h1>
          <ul className="flex space-x-6 text-lg">
            <li><a href="#" className="hover:text-neon-green">Home</a></li>
            <li><a href="#" className="hover:text-neon-green">About</a></li>
            <li><a href="#" className="hover:text-neon-green">Docs</a></li>
          </ul>
        </nav>
  )
}

export default Navbar
