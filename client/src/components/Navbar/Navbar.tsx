import React, { useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import Logo from '../../../images/logo.png';

const NavbarItem = ({
  title,
  classProps = '',
}: {
  title: string;
  classProps?: React.HTMLAttributes<HTMLLIElement>['className'];
}) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  return (
    <nav className='flex items-center justify-between w-full py-4 md:justify-center'>
      <div className='md:flex-[0.5] flex-initial justify-center items-center relative left-5 md:left-0'>
        <img src={Logo} alt='logo' className='w-32 cursor-pointer' />
      </div>
      <ul className='flex-row items-center justify-between flex-initial hidden text-white list-none md:flex'>
        {['Market', 'Exchange', 'Tutorials', 'Wallets'].map((title, index) => {
          return <NavbarItem key={index + title} title={title} />;
        })}
        <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
          Login
        </li>
      </ul>
      <div className='relative flex right-5'>
        {toggleMenu ? (
          <AiOutlineClose
            className='text-white cursor-pointer md:hidden'
            onClick={() => setToggleMenu(false)}
            fontSize={28}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className='text-white cursor-pointer md:hidden'
            onClick={() => setToggleMenu(true)}
          />
        )}

        {toggleMenu && (
          <ul
            className='fixed top-0 z-10 p-3 -right-2 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'>
            <li className='w-full my-2 text-xl'>
              <AiOutlineClose
                className='text-white cursor-pointer md:hidden'
                onClick={() => setToggleMenu(false)}
                fontSize={28}
              />
            </li>
            {['Market', 'Exchange', 'Tutorials', 'Wallets'].map((title, index) => {
              return <NavbarItem key={index + title} title={title} classProps='my-2 text-lg' />;
            })}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
