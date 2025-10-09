import clsx from "clsx";
import Image from "next/image";

const CardProcessComponent: React.FC<{icon: {path: string; alt: string}, label: string}> = (props) => {
    const {icon, label} = props;
    return (
        <div className={clsx(
            "bg-white p-[1rem] rounded-[0.5rem] flex items-center",
            "shadow-[1px_6px_24px_0px_#26262666]",
        )}>
            <div className="flex flex-col items-center gap-[0.82rem]">
            <Image
                src={icon.path}
                alt={icon.alt}
                width={25}
                height={25}
                loading="lazy"
            />
            <span className="m-0 text-[1rem] text-gray-900 font-normal leading-[1.25rem] min-w-[9.7rem] text-center">
                {label}
            </span>
            </div>
        </div>
    );
}

export default CardProcessComponent;