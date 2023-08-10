"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import data from "@/api/data.json";
import { Sort, Couts, DonSorts } from "@/types/index.ts";

const SortsDialog = () => {
  const sorts: Sort[] = data.sorts.sorts;
  const SORTS_BASE_URL = "/img/sorts";

  const [selectedSort, setSelectedSort] = useState<Sort | null>(null);
  const [displayedSort, setDisplayedSort] = useState<Sort | null>(null);

  return (
    <div className="flex h-[80vh]">
      <div className="flex flex-col gap-8 basis-1/2 overflow-y-auto">
        <h2 className="text-center font-extrabold text-3xl">Sort</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {sorts.map((sort) => {
            return (
              <div className="flex flex-col  items-center w-32 h-32 " key={sort.nom}>
                <Image
                  onMouseEnter={() => setDisplayedSort(sort)}
                  onClick={() => setSelectedSort(sort)}
                  src={`${SORTS_BASE_URL}/${sort.image}.jpg`}
                  alt={sort.nom}
                  width={80}
                  height={80}
                  className="hover:cursor-pointer"
                />
                <p className="text-sm text-center">{sort.nom}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4 border-l-2 p-4 bg-overlaySide basis-1/2  ">
        <div className="flex flex-col w-full items-center gap-2 ">
          {displayedSort && (
            <>
              <div className="flex items-center">
                <Image
                  src={`${SORTS_BASE_URL}/${displayedSort.image}.jpg`}
                  width={120}
                  height={120}
                  alt={displayedSort.nom}
                />
                <div className="flex flex-col gap-2">
                  {Object.entries(displayedSort.patchs[0].cout).map((cout) => {
                    return (
                      <div className="flex items-center ">
                        <Image src={`/img/utils/${cout[0]}.png`} width={30} height={30} alt="cout" />
                        <p className="font-bold ">{cout[1]}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="font-black text-2xl">{displayedSort.nom}</p>

              <p>{displayedSort.patchs[0].effet}</p>
            </>
          )}
        </div>

        <div className="flex flex-wrap w-full justify-center gap-4 overflow-y-scroll">
          {displayedSort && (
            <>
              {displayedSort.patchs[0].dons.map((don: DonSorts, key) => {
                return (
                  <div
                    key={key}
                    className="bg-attribute rounded-lg py-2 w-1/4 px-2  h-44  flex flex-col justify-between hover:cursor-pointer">
                    <p className="text-sm text-center  font-black">{don.nom}</p>
                    <p className="text-sm text-center">{don.effet}</p>
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
