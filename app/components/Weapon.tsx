import React from "react";
import { Tooltip } from "react-tooltip";
import Image from "next/image";
import { Arme } from "@/types";
import "../styles/tooltip.css";

interface WeaponProps {
  arme: Arme;
  onMouseEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Weapon = ({ arme, onClick, onMouseEnter }: WeaponProps) => {
  const ARME_BASE_URL = "/img/armes";
  return (
    <div
      data-tooltip-id="my-tooltip"
      data-tooltip-content={`${arme.patchs[0].effet}`}
      data-tooltip-place="bottom"
      className="flex flex-col justify-center items-center p-2 "
      key={arme.nom}>
      <Image
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        src={`${ARME_BASE_URL}/${arme.image}.png`}
        alt={arme.nom}
        width={100}
        height={100}
        className="hover:cursor-pointer "
      />
      <Tooltip id="my-tooltip" className="tooltip w-1/2 xl:w-auto" />
      <p className="text-md text-center font-bold ">{arme.nom}</p>
    </div>
  );
};

export default Weapon;
