import React from "react";
import Image from "next/image";
import { BuildSortProps } from "@/types";
import { Tooltip } from "react-tooltip";

const Sort = ({ item, spellSquareVariants, openModal, index }: BuildSortProps) => {
  const SORT_BASE_URL = "/img/sorts";
  return (
    <div onClick={openModal} className={item ? "w-16 h-16" : spellSquareVariants}>
      {item && (
        <div
          data-tooltip-id={`tooltip-sort-${index}`}
          data-tooltip-content={item.nom}
          data-tooltip-place="bottom"
          className="flex items-center relative">
          <Image src={`${SORT_BASE_URL}/${item.image}.png`} width={200} height={200} alt={item.nom} />
          <Tooltip id={`tooltip-sort-${index}`} className="tooltip z-10 " />
        </div>
      )}
    </div>
  );
};

export default Sort;
