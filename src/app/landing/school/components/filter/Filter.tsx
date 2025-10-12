"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import style from "@/app/font.module.css";
import InputComponent from '@/components/shared/input/InputComponent';

const Filter: React.FC = () => {
  const {
    reset,
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  const [dropProgram, setDropProgram] = useState(true);
  const [dropNumStudents, setDropNumStudents] = useState(true);
  const [dropSpecialLearning, setDropSpecialLearning] = useState(true);
  const [dropMinAge, setDropMinAge] = useState(true);
  const [dropExteriorProgram, setDroExteriorProgram] = useState(true);
  const [dropMUniform, setDropUniform] = useState(true);
  const [dropEntryTime, setDropEntryTime] = useState(true);
  const [dropMaxStudentsClassroom, setDropMaxStudentsClassroom] = useState(true);
  const [dropPerForeigners, setDropPerForeigners] = useState(true);
  const [dropPerNativeTeachers, setDropPerNativeTeachers] = useState(true);
  const [dropPerStudentsStudyExterior, setDropPerStudentsStudyExterior] = useState(true);
  const [dropAgeSchools, setDropAgeSchools] = useState(true);

    const programs = [
        {label: "IB", value: "IB"},
        {label: "AP", value: "AP"},
        {label: "CIE", value: "CIE"},
        {label: "Doble titulación", value: "Doble"},
    ];

    const entryTimes = [
        {label: "Antes de 7", value: "1"},
        {label: "Entre 7 y 8", value: "2"},
        {label: "Entre 8 y 9", value: "3"},
        {label: "A medio día", value: "4"},
    ];

    const studensClassroom = [
        {label: "< 15", value: "1"},
        {label: "16 - 25", value: "2"},
        {label: "> 25", value: "3"},
    ];
    
    const perForeigners = [
        {label: "0%", value: "1"},
        {label: "0 - 12%", value: "2"},
        {label: "11 - 25%", value: "3"},
    ];
    
    const perNativeTeachers = [
        {label: "0%", value: "1"},
        {label: "0 - 12%", value: "2"},
        {label: "11 - 25%", value: "3"},
        {label: "> 25%", value: "4"},
    ];

    const perStudentsStudyExterior = [
        {label: "0%", value: "1"},
        {label: "0 - 12%", value: "2"},
        {label: "11 - 25%", value: "3"},
        {label: "> 25%", value: "4"},
    ];
    
    const ageSchools = [
        {label: "Menos de 20 años", value: "1"},
        {label: "21 - 50 años", value: "2"},
        {label: "51 - 100 años", value: "3"},
        {label: "más de 100 años", value: "4"},
    ];


  return(
  <nav className={`custom-nav-filter ${style["font-outfit"]}`}>
    <div className="flex flex-col w-full">
        <div className="content-international-program">
            <div className="flex justify-between items-center w-full content-title">
                <p className="m-0">Programa internacional</p><FontAwesomeIcon onClick={() => setDropProgram(!dropProgram)} icon={dropProgram ? faChevronUp : faChevronDown} />
            </div>
            {   dropProgram && <>
                <div className="text-help text-[1rem]">
                    <p className="m-0">*elige entre los distintos programas educativos</p>
                </div>

                <div className="flex flex-col gap-3">
                {   programs.map((items, index) => {
                        return(
                            <div key={index} className="flex flex-row gap-3">
                                <input type="checkbox" className='w-6 h-6' {...register("program")} value={items.value} />
                                <label className="m-0">{items.label}</label>
                            </div>
                        )
                    })
                }
                </div></>
            }

        </div>
    </div>
    <div className="flex flex-col w-full">
        <div className="content-number-studens">
            <div className="flex justify-between items-center w-full content-title">
                <p className="m-0">No. de estudiantes</p><FontAwesomeIcon onClick={() => setDropNumStudents(!dropNumStudents)} icon={dropNumStudents ? faChevronUp : faChevronDown} />
            </div>
            {
                dropNumStudents && <div className='flex flex-col gap-1'>
                    <label htmlFor="numStudents" className='text-help text-[0.88rem]'>No. de estudiantes</label>
                    <InputComponent
                        typeInput="number"
                        placeholder='No. de estudiantes'
                        className='form-control'
                        name="numStudents"
                        register={register("numStudents")}
                    />
                </div>
            }
        </div>
    </div>
    <div className="flex flex-col w-full">
        <div className="content-special-learning">
            <div className="flex justify-between items-center w-full content-title">
                <p className="m-0">¿Apoyo al aprendizaje para estudiantes con necesidades especiales?</p><FontAwesomeIcon onClick={() => setDropSpecialLearning(!dropSpecialLearning)} icon={dropSpecialLearning ? faChevronUp : faChevronDown} />
            </div>
            {
                dropSpecialLearning && <div className='flex flex-row justify-between'>
                    <div className='flex flex-row gap-2 basis-1/2'>
                        <input id='specialLearningYes' type="radio" className='w-6 h-6' value="yes" {...register("specialLearning")} />
                        <label htmlFor="specialLearningYes" className='text-help text-[1.25rem]'>Si</label>
                    </div>
                    <div className='flex flex-row gap-2  basis-1/2'>
                        <input id="specialLearningNo" type="radio" className='w-6 h-6' value="no" {...register("specialLearning")} />
                        <label htmlFor="specialLearningNo" className='text-help text-[1.25rem]'>no</label>
                    </div>
                </div>
            }
        </div>
    </div>
    <div className="flex flex-col w-full">
        <div className="content-min-age">
            <div className="flex justify-between items-center w-full content-title">
                <p className="m-0">Edad mínima de ingreso</p><FontAwesomeIcon onClick={() => setDropMinAge(!dropMinAge)} icon={dropMinAge ? faChevronUp : faChevronDown} />
            </div>
            {
                dropMinAge && <div className='flex flex-col gap-1'>
                    <label htmlFor="edadMinima" className='text-help text-[0.88rem]'>Edad mínima</label>
                    <InputComponent
                        typeInput="number"
                        placeholder='Edad mínima'
                        className='form-control'
                        name="edadMinima"
                        register={register("edadMinima")}
                    />
                </div>
            }
        </div>
    </div>
    <div className="flex flex-col w-full">
        <div className="content-exterior-program">
            <div className="flex justify-between items-center w-full content-title">
                <p className="m-0">Programa de imersión en el exterior</p><FontAwesomeIcon onClick={() => setDroExteriorProgram(!dropExteriorProgram)} icon={dropExteriorProgram ? faChevronUp : faChevronDown} />
            </div>
            {
                dropExteriorProgram && <>
                <div className="text-help text-[1rem]">
                    <p className="m-0">*Si el colegio cuenta con programa de imersión en el exterior</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row gap-2 basis-1/2'>
                        <input id='exteriorProgramYes' type="radio" className='w-6 h-6' value="yes" {...register("exteriorProgram")} />
                        <label htmlFor="exteriorProgramYes" className='text-help text-[1.25rem]'>Si</label>
                    </div>
                    <div className='flex flex-row gap-2  basis-1/2'>
                        <input id="exteriorProgramNo" type="radio" className='w-6 h-6' value="no" {...register("exteriorProgram")} />
                        <label htmlFor="exteriorProgramNo" className='text-help text-[1.25rem]'>no</label>
                    </div>
                </div></>
            }
        </div>
    </div>
    <div className="flex flex-col w-full">
        <div className="content-exterior-program">
            <div className="flex justify-between items-center w-full content-title">
                <p className="m-0">Uniforme</p><FontAwesomeIcon onClick={() => setDropUniform(!dropMUniform)} icon={dropMUniform ? faChevronUp : faChevronDown} />
            </div>
            {
                dropMUniform && <>
                <div className="text-help text-[1rem]">
                    <p className="m-0 max-w-[85%]">*Si el colegio cuenta con uniforme</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row gap-2 basis-1/2'>
                        <input id='uniformYes' type="radio" className='w-6 h-6' value="yes" {...register("uniform")} />
                        <label htmlFor="uniformYes" className='text-help text-[1.25rem]'>Si</label>
                    </div>
                    <div className='flex flex-row gap-2  basis-1/2'>
                        <input id="uniformNo" type="radio" className='w-6 h-6' value="no" {...register("uniform")} />
                        <label htmlFor="uniformNo" className='text-help text-[1.25rem]'>no</label>
                    </div>
                </div></>
            }
        </div>
    </div>
    <div className="flex flex-col w-full">
        <div className="content-entry-time-pre">
            <div className="flex justify-between items-center w-full content-title">
                <p className="m-0">Horario de entrada para preescolar</p><FontAwesomeIcon onClick={() => setDropEntryTime(!dropEntryTime)} icon={dropEntryTime ? faChevronUp : faChevronDown} />
            </div>
            {   dropEntryTime && <>
                <div className="text-help text-[1rem]">
                    <p className="m-0">*Horarios donde desea buscar</p>
                </div>

                <div className="flex flex-col gap-3">
                {   entryTimes.map((items, index) => {
                        return(
                            <div key={index} className="flex flex-row gap-3">
                                <input type="checkbox" className='w-6 h-6' {...register("entryTime")} value={items.value} />
                                <label className="m-0">{items.label}</label>
                            </div>
                        )
                    })
                }
                </div></>
            }

        </div>
    </div>
    <div className="flex flex-col w-full">
        <div className="content-max-studens-classroom">
            <div className="flex justify-between items-center w-full content-title">
                <p className="m-0">Número de estudiantes por salón</p><FontAwesomeIcon onClick={() => setDropMaxStudentsClassroom(!dropMaxStudentsClassroom)} icon={dropMaxStudentsClassroom ? faChevronUp : faChevronDown} />
            </div>
            {   dropMaxStudentsClassroom && 
                <div className="flex flex-col gap-3">
                {   studensClassroom.map((items, index) => {
                        return(
                            <div key={index} className="flex flex-row gap-3">
                                <input type="checkbox" className='w-6 h-6' {...register("mxStudensClassroom")} value={items.value} />
                                <label className="m-0">{items.label}</label>
                            </div>
                        )
                    })
                }
                </div>
            }

        </div>
    </div>
    <div className="flex flex-col w-full">
        <div className="content-per-foreigners">
            <div className="flex justify-between items-center w-full content-title">
                <p className="m-0">Porcentaje de familias extranjeras</p><FontAwesomeIcon onClick={() => setDropPerForeigners(!dropPerForeigners)} icon={dropPerForeigners ? faChevronUp : faChevronDown} />
            </div>
            {   dropPerForeigners && 
                <div className="flex flex-col gap-3">
                {   perForeigners.map((items, index) => {
                        return(
                            <div key={index} className="flex flex-row gap-3">
                                <input type="checkbox" className='w-6 h-6' {...register("perForeigners")} value={items.value} />
                                <label className="m-0">{items.label}</label>
                            </div>
                        )
                    })
                }
                </div>
            }

        </div>
    </div>
    <div className="flex flex-col w-full">
        <div className="content-per-native-teachers-scd-lenguage">
            <div className="flex justify-between items-center w-full content-title">
                <p className="m-0">Porcentaje de profesores nativos en el segundo idioma</p><FontAwesomeIcon onClick={() => setDropPerNativeTeachers(!dropPerNativeTeachers)} icon={dropPerNativeTeachers ? faChevronUp : faChevronDown} />
            </div>
            {   dropPerNativeTeachers && 
                <div className="flex flex-col gap-3">
                {   perNativeTeachers.map((items, index) => {
                        return(
                            <div key={index} className="flex flex-row gap-3">
                                <input type="checkbox" className='w-6 h-6' {...register("perNativeTeachers")} value={items.value} />
                                <label className="m-0">{items.label}</label>
                            </div>
                        )
                    })
                }
                </div>
            }

        </div>
    </div>
    <div className="flex flex-col w-full">
        <div className="content-per-students-study-exterior">
            <div className="flex justify-between items-center w-full content-title">
                <p className="m-0">Porcentaje de estudiantes que estudian pregrado en el exterior </p><FontAwesomeIcon onClick={() => setDropPerStudentsStudyExterior(!dropPerStudentsStudyExterior)} icon={dropPerStudentsStudyExterior ? faChevronUp : faChevronDown} />
            </div>
            {   dropPerStudentsStudyExterior && 
                <div className="flex flex-col gap-3">
                {   perStudentsStudyExterior.map((items, index) => {
                        return(
                            <div key={index} className="flex flex-row gap-3">
                                <input type="checkbox" className='w-6 h-6' {...register("perStudentsStudyExterior")} value={items.value} />
                                <label className="m-0">{items.label}</label>
                            </div>
                        )
                    })
                }
                </div>
            }

        </div>
    </div>
    <div className="flex flex-col w-full">
        <div className="content-age-school">
            <div className="flex justify-between items-center w-full content-title">
                <p className="m-0">Edad del colegio</p><FontAwesomeIcon onClick={() => setDropAgeSchools(!dropAgeSchools)} icon={dropAgeSchools ? faChevronUp : faChevronDown} />
            </div>
            {   dropAgeSchools && 
                <div className="flex flex-col gap-3">
                {   ageSchools.map((items, index) => {
                        return(
                            <div key={index} className="flex flex-row gap-3">
                                <input type="checkbox" className='w-6 h-6' {...register("ageSchool")} value={items.value} />
                                <label className="m-0">{items.label}</label>
                            </div>
                        )
                    })
                }
                </div>
            }

        </div>
    </div>
  </nav>
)};

export default Filter;
