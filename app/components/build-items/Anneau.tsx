import React from "react";
import Image from "next/image";
import { BuildItemProps } from "@/types";

const Anneau = ({ item, squareVariants, openModal }: BuildItemProps) => {
  const ANNEAU_BASE_URL = "/img/anneaux";
  return (
    <div className="flex flex-col">
      <div className={`flex items-center justify-center relative ${!item && squareVariants}`} onClick={openModal}>
        {!item && (
          <Image
            src={`/img/utils/generic_ring.png`}
            width={100}
            height={100}
            alt="generic ring"
            className="object-scale-down opacity-50 "
          />
        )}
        {item && (
          <div onClick={openModal} className={`flex flex-col  items-center w-32 h-32 relative`}>
            <Image
              src={`/img/utils/bg_${item.rarete.toLowerCase()}.png`}
              alt={item.nom}
              width={150}
              height={150}
              className="absolute hover:cursor-pointer"
            />
            <Image
              src={`${ANNEAU_BASE_URL}/${item.image}.png`}
              alt={item.nom}
              width={150}
              height={150}
              className="hover:cursor-pointer z-10"
            />
          </div>
        )}
      </div>
      <p className="text-center">{item?.nom}</p>
    </div>
  );
};

export default Anneau;
