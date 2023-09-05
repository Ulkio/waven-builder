import React from "react";
import Image from "next/image";
import { BuildItemProps } from "@/types";

const Anneau = ({
  item,
  squareVariants,
  openModal,
  size = 150,
}: BuildItemProps) => {
  const ANNEAU_BASE_URL = "/img/anneaux";
  return (
    <div className="mb-6 flex flex-col">
      <div
        className={`relative flex items-center justify-center ${
          !item && squareVariants
        }`}
        onClick={openModal}
      >
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
          <div
            onClick={openModal}
            className={`relative flex  h-32 w-32 flex-col items-center`}
          >
            <Image
              src={`/img/utils/bg_${item.rarete.toLowerCase()}.png`}
              alt={item.nom}
              width={size}
              height={size}
              className="absolute hover:cursor-pointer"
            />
            <Image
              src={`${ANNEAU_BASE_URL}/${item.image}.png`}
              alt={item.nom}
              width={size}
              height={size}
              className="z-10 hover:cursor-pointer"
            />
            <p className="text-center">{item?.nom}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Anneau;
