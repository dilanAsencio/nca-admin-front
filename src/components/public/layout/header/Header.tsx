"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useUI } from '@/providers/ui-context';
import NavigationMenu from '../menu/NavigationMenu';
import "./style.css";

const Header: React.FC = () => {
  const { logoNexus } = useUI();
  const [ user, setUser ] = useState("/assets/landing/icon/header/user-profile-01.svg");
  const [openMenu, setOpenMenu] = useState(false);
  const [logoMenu, setLogoMenu] = useState("/assets/landing/icon/header/menu-01.svg");

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    if (openMenu) {
      setLogoMenu("/assets/landing/icon/header/menu-01.svg");
    } else {
      setLogoMenu("/assets/landing/icon/header/x-01.svg");
    }
  }

  return(
  <header className="custom-header w-full py-[0.5rem] px-[2rem] rounded-[0.5rem] flex items-center justify-between">
    <div className="flex items-center">
      <a href="/landing"><img src={logoNexus} alt="nexuscore" className="w-[9.625rem] h-[2rem]" /></a>
    </div>

    <NavigationMenu openMenu={openMenu} />

    <div className='content-profile'>
      <div className="custom-profile hidden h-[2.813rem] w-[5.438rem] justify-between
        xl:flex xl:items-center xl:gap-3.5 xl:rounded-4xl xl:px-2 xl:py-1.5">
        <img className='hidden xl:block' src={user} alt="user-profile" width={28} height={28}/>
        <FontAwesomeIcon className='mr-2' icon={faChevronDown} />
      </div>
      <div className="custom-profile p-2 rounded-[0.5rem] block cursor-pointer xl:hidden">
        <img src={logoMenu} alt="menu-bars" onClick={() => toggleMenu()} />
      </div>
    </div>
  </header>
)};

export default Header;
