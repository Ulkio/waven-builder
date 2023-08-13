"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import data from "@/api/data.json";
import { Sort, Couts, DonSorts } from "@/types/index.ts";

interface SortsDialogProps {
  onSelectedSortChange: (selectedSort: Sort) => void;
  onClickSort: () => void;
}
const SortsDialog = ({ onSelectedSortChange, onClickSort }: SortsDialogProps) => {
  const sorts: Sort[] = data.sorts.sorts;
  const SORTS_BASE_URL = "/img/sorts";

  const [selectedSort, setSelectedSort] = useState<Sort | null>(null);
  const [displayedSort, setDisplayedSort] = useState<Sort | null>(null);

  const handleSortClick = (sort: Sort) => {
    setSelectedSort(sort);
    onSelectedSortChange(sort);
    onClickSort();
  };
  return (
    <div className="flex h-full">
      <div className="flex flex-col gap-8 basis-1/2 overflow-y-auto">
        <h2 className="text-center font-extrabold text-3xl">Sort</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {sorts.map((sort) => {
            return (
              <div className="flex flex-col  items-center w-36 h-36 " key={sort.nom}>
                <Image
                  onMouseEnter={() => setDisplayedSort(sort)}
                  onClick={() => handleSortClick(sort)}
                  src={`${SORTS_BASE_URL}/${sort.image}.png`}
                  alt={sort.nom}
                  width={80}
                  height={80}
                  className="hover:cursor-pointer"
                />
                <p className="text-sm text-center font-bold">{sort.nom}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col p-4 justify-evenly border-l-2 bg-overlaySide basis-1/2  ">
        <div className="flex flex-col w-full items-center gap-8">
          {displayedSort && (
            <>
              <div className="flex items-center relative">
                <Image
                  src={`${SORTS_BASE_URL}/${displayedSort.image}.png`}
                  width={120}
                  height={120}
                  alt={displayedSort.nom}
                />
                <div className="flex flex-col gap-2 absolute -right-12">
                  <div key={displayedSort.patchs[0].cout} className="h-full w-full relative ">
                    <Image src={`/img/utils/${displayedSort.element}.png`} width={50} height={50} alt="cout" />
                    <p className="absolute top-4 left-5 font-bold text-2xl">{displayedSort.patchs[0].cout}</p>
                  </div>
                </div>
              </div>
              <p className="font-black text-2xl">{displayedSort.nom}</p>

              <p>{displayedSort.patchs[0].effet}</p>
            </>
          )}
        </div>

        <div className="flex flex-wrap  xl:px-0 w-full xl:justify-center gap-4 overflow-y-scroll xl:overflow-y-visible  pt-8 h-full">
          {displayedSort?.patchs[0].dons && (
            <>
              {displayedSort.patchs[0].dons!.map((don: DonSorts, key) => {
                return (
                  <div
                    key={don.nom + key}
                    className="bg-attribute rounded-lg py-2 w-full xl:w-1/4 px-2 h-auto max-h-64 flex flex-col justify-between hover:cursor-pointer gap-2">
                    <p className="text-md text-center  font-black">{don.nom}</p>
                    <p className="text-md text-center">{don.effet}</p>
                    <div className="flex justify-center ">
                      <Image src="/img/utils/rune_de_sort.png" width={20} height={20} alt="cout_rune" />
                      <p className="text-sm text-center font-bold">{don.cout}</p>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortsDialog;
