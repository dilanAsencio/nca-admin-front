"use client";

import ProgressBarComponent from "@/components/shared/progressBar/ProgressBarComponent";
import SwitchComponent from "@/components/shared/switch/SwitchComponent";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface CardProgressInfoProps {
  campusLogo: { path: string; alt: string };
  campusName: string;
  aspirantName: string;
  progress: number;
  swIsNeeded: (sw: boolean) => void;
}

export default function CardProgressInfo({
  aspirantName,
  campusLogo,
  campusName,
  progress,
}: CardProgressInfoProps) {
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [enabled, setEnabled] = useState<boolean>(false);
  useEffect(() => {
    if (progress) {
      setCurrentProgress(progress);
    }
  }, [progress]);
  return (
    <div className={clsx(
      "flex flex-col gap-[1rem] items-center p-[1rem] rounded-[0.5rem] shadow-[0_7px_21px_0px_#451A1A0A] bg-[#FFFFFF]",
      "md:flex-row md:justify-between"
      )}>
      <div className="flex justify-between w-full md:items-center md:justify-start md:gap-[1rem]">
        <Image
          src={campusLogo.path}
          alt={campusLogo.alt}
          width={37}
          height={37}
          loading="lazy"
        />
        <div className="flex flex-col">
          <span className="m-0 text-[0.9375rem] font-medium leading-[123%] tracking-[-2%] text-gray-500 capitalize">
            {campusName}
          </span>
          <span className="m-0 text-[0.9375rem] font-medium leading-[123%] tracking-[-2%] text-gray-500 capitalize">
            {aspirantName}
          </span>
        </div>
      </div>

      <div className="flex min-w-[14.75rem]">
        <ProgressBarComponent value={currentProgress ?? 0} height="10px"  />
      </div>

      <div className="flex justify-between w-full md:justify-end md:items-center md:gap-[0.625rem]">
        <SwitchComponent
          checked={enabled}
          onChange={setEnabled}
        />
        <span className="m-0 text-gray-500 leading-[123%] text-[0.9375rem] font-medium">
          ¿Qué me hace falta?
        </span>
      </div>
    </div>
  );
}
