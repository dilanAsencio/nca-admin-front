import React from "react";
import ButtonComponent from "../shared/button/ButtonComponent";

const CardComponent: React.FC<{labelButton: string, handleClick?: () => void}> = ({labelButton, handleClick}) => {
  return (
    <div className="
        flex flex-col justify-between items-center gap-[1.25rem]
        bg-[#FFFFFF] rounded-[0.5rem] px-[1rem] py-[1.5rem]
        shadow-[0_4px_12px_0px_rgba(17,62,47,0.07)]
    ">
        <img src="/assets/img/logo-curriculum.svg" className="w-[3.2rem]" alt="logo-curriculum" />
        <ButtonComponent
          className="primary"
          label={labelButton}
          onClick={handleClick}
        />
    </div>
  );
}

export default CardComponent;