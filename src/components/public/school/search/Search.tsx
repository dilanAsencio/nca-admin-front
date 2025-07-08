"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUI } from '@/providers/ui-context';
import InputComponent from '@/components/shared/input/InputComponent';
import ButtonComponent from '@/components/shared/button/ButtonComponent';
import DropdownComponent from '@/components/shared/dropdown/DropdownComponent';
import "./style.css";

const Search: React.FC<{search: (search: string) => void}> = ({search}) => {
  const {
    reset,
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  const { logoNexus } = useUI();

  const iconMap = {
    path: "/assets/landing/icon/icon-map.svg",
    alt: "icon-map",
  };
  const iconSearch = {
    path: "/assets/icon/header/search.svg",
    alt: "icon-search",
  };


  return(
  <header className="custom-header w-full flex justify-center items-start rounded-[4.375rem] p-[1rem] gap-[0.75rem]">
    <div className="lg:w-[21.3rem]">
      <InputComponent
        isInputSearch={true}
        name="searchSchool"
        className='primary'
        placeholder='Buscar por nombre. idioma, género, ect.'
        typeInput='text'
        onKeyUp={(e) => search(e.target.value)}
        register={register("searchSchool")}
      />
    </div>
    <ButtonComponent
      className="tertiary-outline"
      icon={iconMap}
      type="button"
      label="Ver mapa"
    />
    <DropdownComponent
      name='drCiudad'
      className='primary'
      placeholder="Ciudad"
      options={[
        { label: "Barranquilla", value: "ciudad-1" },
        { label: "Barrancabermeja", value: "ciudad-2" },
        { label: "Santa Marta", value: "ciudad-3" },
      ]}
     />
    <DropdownComponent
      name='drGenero'
      className='primary'
      placeholder="Genero"
      options={[
        { label: "Masculino", value: "masculino" },
        { label: "Femenino", value: "femenino" },
        { label: "Otros...", value: "otro" },
      ]}
     />
    <DropdownComponent
      name='drIdioma'
      className='primary'
      placeholder="Idioma"
      options={[
        { label: "Español", value: "español" },
        { label: "Ingles", value: "ingles" },
        { label: "Aleman", value: "aleman" },
      ]}
     />
    <DropdownComponent
      name='drReligion'
      className='primary'
      placeholder="Religion"
      options={[
        { label: "Catolico", value: "1" },
        { label: "Evangelico", value: "2" },
        { label: "Otros...", value: "3" },
      ]}
     />
    <ButtonComponent
      className="tertiary"
      icon={iconSearch}
      type="button"
    />
  </header>
)};

export default Search;
