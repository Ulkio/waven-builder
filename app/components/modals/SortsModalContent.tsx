"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import data from "@/api/data.json";
import { Sort, Couts, DonSorts, Arme } from "@/types/index.ts";

interface SortsDialogProps {
  onSelectedSortChange: (selectedSort: Sort) => void;
  onClickSort: () => void;
  dieu?: string;
  arme?: string;
}
const SortsDialog = ({
  onSelectedSortChange,
  onClickSort,
  dieu,
  arme,
}: SortsDialogProps) => {
  const sorts: Sort[] = data.sorts.sorts;
  const SORTS_BASE_URL = "/img/sorts";

  const fireVariants = `absolute top-3 left-[1rem] font-bold text-xl text-outline`;
  const waterVariants = `absolute top-3 left-4 font-bold text-xl text-outline`;
  const earthVariants = `absolute top-2 left-4 font-bold text-xl text-outline`;
  const windVariants = `absolute top-3 left-4 font-bold text-xl text-outline`;
  const astralVariants = `absolute top-1 left-4 font-bold text-xl text-outline`;
  const neutreVariants = `absolute top-2 left-4 font-bold text-xl text-outline`;
  const manaVariants = `absolute top-1 left-[0.6rem] font-bold text-xl text-outline`;

  const [searchInput, setsearchInput] = useState("");
  const [selectedSort, setSelectedSort] = useState<Sort | null>(null);
  const [displayedSort, setDisplayedSort] = useState<Sort | null>(null);

  const filteredSortsCommuns = sorts.filter((sort) => sort.dieu === dieu);
  const filteredSortsArme = sorts.filter((sort) => sort.arme === arme);

  const rarityOrder: { [key: string]: number } = {
    Feu: 1,
    Eau: 2,
    Terre: 3,
    Air: 4,
    Astral: 5,
  };

  const sortedSortsElement = sorts.sort((a, b): any => {
    const rarityA = a.element;
    const rarityB = b.element;

    const orderA = rarityOrder[rarityA] || Infinity;
    const orderB = rarityOrder[rarityB] || Infinity;

    return orderA - orderB;
  });

  const filteredSortsCommunsByName = filteredSortsCommuns.filter((sort) => {
    if (searchInput === "") {
      return true;
    }
    return sort.nom.toLowerCase().includes(searchInput.toLowerCase());
  });
  const filteredSortsArmeByName = filteredSortsArme.filter((sort) => {
    if (searchInput === "") {
      return true;
    }
    return sort.nom.toLowerCase().includes(searchInput.toLowerCase());
  });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchInput(e.target.value);
  };

  const handleSortClick = (sort: Sort) => {
    setSelectedSort(sort);
    onSelectedSortChange(sort);
    onClickSort();
  };
  return (
    <div className="flex h-full">
      <div className="flex basis-1/2 flex-col gap-8 overflow-y-auto py-4">
        <h2 className="text-center text-3xl font-extrabold">Sorts</h2>
        {arme ? (
          <>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Rechercher"
                value={searchInput}
                onChange={(e) => handleSearchInputChange(e)}
                className="ml-4 w-40 rounded-md border-2 border-white bg-overlay px-2 opacity-50"
              />
              <p className="ml-4 w-fit rounded-md bg-overlaySide p-2">
                Sorts {arme}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {filteredSortsArmeByName.map((sort) => {
                  return (
                    <div
                      className="flex h-28 w-28 flex-col items-center"
                      key={sort.nom}
                    >
                      <Image
                        onMouseEnter={() => setDisplayedSort(sort)}
                        onClick={() => handleSortClick(sort)}
                        src={`${SORTS_BASE_URL}/${sort.image}.png`}
                        alt={sort.nom}
                        width={80}
                        height={80}
                        priority
                        className="hover:cursor-pointer"
                      />
                      <p className="text-center text-sm font-bold ">
                        {sort.nom}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="ml-4 w-fit rounded-md bg-overlaySide p-2">
                Sorts Communs {dieu}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {filteredSortsCommunsByName.map((sort) => {
                  return (
                    <div
                      className="flex h-28  w-28 flex-col items-center "
                      key={sort.nom}
                    >
                      <Image
                        onMouseEnter={() => setDisplayedSort(sort)}
                        onClick={() => handleSortClick(sort)}
                        src={`${SORTS_BASE_URL}/${sort.image}.png`}
                        alt={sort.nom}
                        width={80}
                        height={80}
                        className="hover:cursor-pointer"
                      />
                      <p className="text-center text-sm font-bold">
                        {sort.nom}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <p className="ml-4 w-fit rounded-md bg-overlaySide p-2">
                Sorts {arme}
              </p>
              <div className="flex flex-wrap justify-start gap-2">
                {sortedSortsElement.map((sort) => {
                  return (
                    <div
                      className="flex h-36  w-36 flex-col items-center "
                      key={sort.nom}
                    >
                      <Image
                        onMouseEnter={() => setDisplayedSort(sort)}
                        onClick={() => handleSortClick(sort)}
                        src={`${SORTS_BASE_URL}/${sort.image}.png`}
                        alt={sort.nom}
                        width={80}
                        height={80}
                        className="hover:cursor-pointer"
                      />
                      <p className="text-center text-sm font-bold">
                        {sort.nom}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex basis-1/2 flex-col justify-evenly border-l-2 bg-overlaySide p-4  ">
        <div className="flex w-full flex-col items-center gap-8 py-4">
          {displayedSort && (
            <>
              <div className="relative flex flex-col items-center">
                <Image
                  src={`${SORTS_BASE_URL}/${displayedSort.image}.png`}
                  width={120}
                  height={120}
                  alt={displayedSort.nom}
                />
                <div className="absolute -top-4 left-[2.8rem] flex flex-col gap-2 ">
                  <div className="relative h-full w-full ">
                    <Image
                      src={`/img/utils/mana.png`}
                      width={30}
                      height={30}
                      alt="cout"
                    />
                    <p className={manaVariants}>
                      {displayedSort.patchs[0].cout}
                    </p>
                  </div>
                </div>
                {displayedSort.patchs[0].gains &&
                Object.keys(displayedSort.patchs[0].gains).length > 0 ? (
                  <div className="flex flex-col">
                    <div
                      key={displayedSort.patchs[0].cout}
                      className="relative flex gap-2"
                    >
                      {Object.entries(displayedSort.patchs[0].gains).map(
                        (gain, key) => {
                          return (
                            <div
                              key={key}
                              className="relative flex h-12 w-auto flex-row"
                            >
                              <Image
                                src={`/img/utils/${gain[0]}.png`}
                                width={40}
                                height={40}
                                alt="cout"
                                className="object-cover"
                              />
                              <p
                                className={
                                  gain[0] === "feu"
                                    ? fireVariants
                                    : gain[0] === "eau"
                                    ? waterVariants
                                    : gain[0] === "terre"
                                    ? earthVariants
                                    : gain[0] === "air"
                                    ? windVariants
                                    : gain[0] === "astral"
                                    ? astralVariants
                                    : neutreVariants
                                }
                              >
                                {gain[0] === "feu" && gain[1]}
                                {gain[0] === "eau" && gain[1]}
                                {gain[0] === "terre" && gain[1]}
                                {gain[0] === "air" && gain[1]}
                                {gain[0] === "astral" && gain[1]}
                                {gain[0] === "neutre" && gain[1]}
                              </p>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <p className="text-center text-2xl font-black">
                {displayedSort.nom}
              </p>

              <p className="text-center">{displayedSort.patchs[0].effet}</p>
            </>
          )}
        </div>

        <div className="flex h-full  w-full flex-wrap gap-4 overflow-y-scroll pt-8 xl:justify-center  xl:overflow-y-visible xl:px-0 ">
          {displayedSort?.patchs[0].dons && (
            <>
              {displayedSort.patchs[0].dons!.map((don: DonSorts, key) => {
                return (
                  <div
                    key={don.nom + key}
                    className="flex h-auto max-h-60 w-full flex-col justify-between gap-2 rounded-lg bg-attribute px-2 py-2 hover:cursor-pointer xl:w-1/4 "
                  >
                    <p className="text-center text-sm  font-black">{don.nom}</p>
                    <p className="text-center text-sm">{don.effet}</p>
                    <div className="flex items-center justify-center">
                      <Image
                        src="/img/utils/rune_de_sort.png"
                        width={30}
                        height={30}
                        alt="cout_rune"
                      />
                      <p className="text-center text-sm font-bold">
                        {don.cout}
                      </p>
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
