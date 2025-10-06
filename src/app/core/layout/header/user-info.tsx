"use client";
import React, { useEffect } from "react";
import style from "@/app/font.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/providers/store";

interface UserInfoProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const UserInfo: React.FC<UserInfoProps> = (props: {isOpen: boolean, setIsOpen: (isOpen: boolean) => void}) => {

  const { infoUser } = useSelector((state: RootState) => state.auth);
  const { isOpen, setIsOpen } = props;

  const handleClickOutside = (event: MouseEvent) => {
  const target = event.target ?? null;
  if (!(target as Element)?.closest('.header')) {
    setIsOpen(false);
  }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (<>
    <div className={`user-info flex items-center px-[1rem] gap-[0.5rem] ${style["font-info-user"]}`} onClick={() => setIsOpen(!isOpen)}>
      <img src="/assets/img/avatar-default.svg" className="w-[2rem] h-[2rem] rounded-[50%]" alt="usuraio" />
      <span className="user-name max-md:hidden">
        {typeof infoUser === 'string' ? infoUser : infoUser?.username || "Usuario"}
      </span>
      <FontAwesomeIcon className="max-md:hidden" icon={!isOpen ? faChevronDown : faChevronUp} />
    </div>
    </>
  );
};

export default UserInfo;
