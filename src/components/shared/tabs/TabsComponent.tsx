
import clsx from "clsx";

import "./style.css";
import Image from "next/image";
import styleFont from "@/app/font.module.css";


const TabsComponent: React.FC<{
    label: string,
    icon?: { path: string, alt: string }
    isActive: boolean,
    handleClick?: () => void
}> = ({
    label, icon, isActive = false, handleClick
}) => {
    
    return (
        <div
            onClick={() => handleClick} 
            className={clsx(
            styleFont["font-outfit"],
            isActive && "active",
            "inline-flex items-center custom-tab",
            "min-w-[6.5rem] w-max gap-[0.5rem]",
            "py-[0.75rem] px-[0.5rem] rounded-t-[0.5rem] cursor-pointer",
        )}>
            {icon && <Image 
                src={icon?.path}
                alt={icon?.alt}
                width={20}
                height={20}
                loading="lazy"
            />}
            <span className="label-tab">{label}</span>
        </div>
    );
}

export default TabsComponent;