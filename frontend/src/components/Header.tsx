import  { useState } from 'react';
import { Link } from 'react-router-dom';

// import './header.css'; // Import your CSS file

const Header = () => {
//   const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full h-[80px] bg-black z-10 flex justify-between items-center px-4 bg-cod-gray-900 ">
        <div className='left text-white text-3xl p-6' >  
            Receipe Management System
        </div>
        <div className='right'>
        <div className="hidden sm:flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold hover:no-underline hover:text-3xl bg-black hover:text-slate-100 transition-all duration-300 ease-in-out bg-gradient-to-r from-orange-200 to-indigo-100 bg-clip-text text-transparent">
                Home
              </Link>
                <Link to="/addrecipes" className="hover:text-3xl hover:text-slate-100 transition-all duration-300 ease-in-out bg-gradient-to-r from-orange-200 to-indigo-100 text-transparent bg-clip-text text-2xl font-bold hover:no-underline">
                  Add Recipe 
                </Link>
                <Link to="/profile" className="bg-gradient-to-r from-orange-200 to-indigo-100 text-transparent bg-clip-text text-2xl font-bold hover:no-underline">
                  Profile
                </Link>
                <span
                  className="text-red-600 hover:text-red-700 hover:text-3xl cursor-pointer transition-all duration-300 ease-in-out text-2xl font-bold hover:no-underline"
                >
                  Logout
                </span>
              </div>
        </div>
    </header>
  );
};

export default Header;
