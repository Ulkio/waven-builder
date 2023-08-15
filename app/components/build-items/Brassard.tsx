import React from "react";
import Image from "next/image";
import { BuildItemProps } from "@/types";

const Brassard = ({ item, squareVariants, openModal }: BuildItemProps) => {
  const BRASSARD_BASE_URL = "/img/brassards";
  return (
    <div className="flex flex-col ">
      <div className={`flex items-center justify-center relative ${!item && squareVariants}`} onClick={openModal}>
        {!item && (
          <Image
            src={`/img/utils/generic_armband.png`}
            width={100}
            height={100}
            alt="generic armband"
            className="object-scale-down opacity-50"
          />
        )}
        {item && (
          <div className={`flex flex-col  items-center w-32 h-32 relative`}>
            <Image
              src={`/img/utils/bg_${item.rarete.toLowerCase()}.png`}
              alt={item.nom}
              width={150}
              height={150}
              className="absolute hover:cursor-pointer"
            />
            <Image
              src={`${BRASSARD_BASE_URL}/${item.image}.png`}
              alt={item.nom}
              width={150}
              height={150}
              className="hover:cursor-pointer z-10"
            />
          </div>
        )}
      </div>
      <p className="text-center py-2">{item?.nom}</p>
    </div>
  );
};

export default Brassard;
