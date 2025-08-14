"use client";

import React from 'react';
import Link from 'next/link';
import RenderIcon from './RenderIconsMenu';
import style from '@/app/font.module.css';
import "./style.css"
import { useLanding } from '@/providers/landing-context';
import clsx from 'clsx';

const menuItems = [
  { label: 'Home', name: 'home', href: '/landing', width: "auto" },
  { label: 'Colegios', name: 'colegios', href: '/landing/school', width: "auto" },
  { label: 'Inscríbete', name: 'inscripcion', href: '/landing', width: "auto" },
  { label: 'Admisiones', name: 'admisiones', href: '/landing', width: "auto" },
  { label: 'Certificaciones', name: 'certificaciones', href: '/landing', width: "auto" },
  { label: 'Noticias', name: 'noticias', href: '/landing', width: "auto" },
  { label: '¿Quienes Somos?', name: 'quienes-somos', href: '/landing', width: "8rem" },
];

const NavigationMenu: React.FC<{openMenu: boolean}> = ({openMenu}) => {
  const {handleMenu, menuSelected} = useLanding();
  return (
    <nav className="bg-white xl:border-0 xl:bg-transparent">
      <div className="max-w-7xl flex items-center">
        <ul className={`m-0 p-0 xl:flex gap-2 ${openMenu ? 'block' : 'hidden'} xl:block
          ${openMenu ? 'absolute bg-white z-30 top-[5.313rem] right-[1.875rem]' : ''}
        `}> 
          {menuItems.map(item => (
            <li className='' key={item.name}>
              <Link href={item.href}
                onClick={() => {handleMenu(item.name)}}
                className={clsx("px-2 py-1 rounded-[0.5rem] custom-link flex flex-col items-center font-normal text-[1rem] gap-[0.75rem]",
                  openMenu ? 'flex-row' : 'flex-col', item.name,`${style["font-outfit"]}`, `w-[${item.width}]`,
                  menuSelected === item.name ? 'active' : menuSelected === null && item.name === 'home' ? 'active' : '',
                )}>
                <RenderIcon name={item.name} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationMenu;
