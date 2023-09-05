import React from "react";
import Image from "next/image";
import { BuildItemProps } from "@/types";

const Brassard = ({ item, squareVariants, openModal }: BuildItemProps) => {
  const BRASSARD_BASE_URL = "/img/brassards";
  return (
    <div className="flex flex-col ">
      <div
        className={`relative flex items-center justify-center ${
          !item && squareVariants
        }`}
        onClick={openModal}
      >
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
          <div className={`relative flex  h-32 w-32 flex-col items-center`}>
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
              className="z-10 hover:cursor-pointer"
            />
          </div>
        )}
      </div>
      <p className="py-2 text-center">{item?.nom}</p>
    </div>
  );
};

export default Brassard;
