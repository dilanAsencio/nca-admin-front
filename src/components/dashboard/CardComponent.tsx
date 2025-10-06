import React from "react";
import ButtonComponent from "../shared/button/ButtonComponent";
import Image from "next/image";
import clsx from "clsx";

const CardComponent: React.FC<{
  labelButton: string;
  handleClick?: () => void;
  blockBtn?: boolean;
  checked?: boolean;
  img: { path: string; alt: string, w: number, h: number };
}> = ({
  labelButton, handleClick, img,
  blockBtn = false,
  checked = false
 }) => {

  const stepCheck = { path: "/assets/icon/step-check.svg", alt: "step-check-icon" };

  return (
    <div
      className="
        flex justify-between items-center gap-[1rem]
        bg-[#FFFFFF] rounded-[0.5rem] px-[1rem] py-[0.5rem]
        shadow-[0_4px_12px_0px_rgba(17,62,47,0.07)]
    "
    >
      <div className="relative py-[0.52rem] pl-[0.37rem] pr-[0.55rem]">
        <Image
          src={img.path}
          alt={img.alt}
          width={img.w ? img.w : 64}
          height={ img.h ? img.h : 56}
          loading="lazy"
          className={clsx(blockBtn && "opacity-30")}
        />
        {checked && <Image
          src={stepCheck.path}
          alt={stepCheck.alt}
          width={28}
          height={28}
          loading="lazy"
          className="absolute top-0 right-0"
        />}
      </div>
      <ButtonComponent
        blockAccess={blockBtn}
        className="primary"
        label={labelButton}
        onClick={handleClick}
      />
    </div>
  );
};

export default CardComponent;
