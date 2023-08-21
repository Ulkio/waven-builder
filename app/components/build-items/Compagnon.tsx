import React from "react";
import Image from "next/image";
import { BuildCompagnonProps } from "@/types";
import { Tooltip } from "react-tooltip";

const Compagnon = ({
  item,
  companionSquareVariants,
  emptyCompanionVariants,
  openModal,
  index,
}: BuildCompagnonProps) => {
  const COMPAGNON_BASE_URL = "/img/compagnons";

  return (
    <div
      onClick={openModal}
      className={`bg-contain bg-no-repeat h-24 w-24 hover:cursor-pointer ${
        item ? companionSquareVariants : emptyCompanionVariants
      }`}>
      {item && (
        <div className="flex flex-col relative">
          <Image
            data-tooltip-content={item.nom}
            data-tooltip-place="bottom"
            data-tooltip-id={`tooltip-compagnon-${index}`}
            src={`/img/utils/cadre_${item.rarete.toLowerCase()}.png`}
            alt={item.nom}
            width={200}
            height={200}
            className="absolute"
          />
          <Image src={`${COMPAGNON_BASE_URL}/${item.image}.png`} width={200} height={200} alt={item.nom} />
        </div>
      )}
      <p className="text-center">{item?.nom}</p>
    </div>
  );
};

export default Compagnon;
