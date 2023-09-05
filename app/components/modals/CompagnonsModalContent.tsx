"use client";
import React, { useState } from "react";
import Image from "next/image";
import data from "@/api/data.json";
import {
  Compagnon,
  CaracteristiqueCompagnons,
  DonCompagnons,
} from "@/types/index.ts";

interface CompagnonsDialogProps {
  onSelectedCompagnonChange: (selectedCompagnon: Compagnon) => void;
  onClickCompagnon: () => void;
}
const CompagnonsDialog = ({
  onSelectedCompagnonChange,
  onClickCompagnon,
}: CompagnonsDialogProps) => {
  const compagnons: Compagnon[] = data.compagnons.compagnons;
  const COMPAGNON_BASE_URL = "/img/compagnons";

  const fireVariants = `absolute top-3 left-[1rem] font-bold text-xl text-outline`;
  const waterVariants = `absolute top-3 left-4 font-bold text-xl text-outline`;
  const earthVariants = `absolute top-2 left-4 font-bold text-xl text-outline`;
  const windVariants = `absolute top-3 left-4 font-bold text-xl text-outline`;

  const [searchInput, setsearchInput] = useState("");
  const [selectedCompagnon, setSelectedCompagnon] = useState<Compagnon | null>(
    null,
  );
  const [displayedCompagnon, setDisplayedCompagnon] =
    useState<Compagnon | null>(null);
  const [selectedRarityFilter, setSelectedRarityFilter] = useState<
    string | null
  >("commun");

  const handleCompagnonClick = (compagnon: Compagnon) => {
    setSelectedCompagnon(compagnon);
    onSelectedCompagnonChange(compagnon);
    onClickCompagnon();
  };
  const rarityOrder: { [key: string]: number } = {
    Commun: 1,
    Rare: 2,
    Krosmique: 3,
    Infinite: 4,
  };
  const sortedCompagnonsRarity = compagnons.sort((a, b): any => {
    const rarityA = a.rarete;
    const rarityB = b.rarete;

    const orderA = rarityOrder[rarityA] || Infinity;
    const orderB = rarityOrder[rarityB] || Infinity;

    return orderA - orderB;
  });

  const filteredCompagnons = selectedRarityFilter
    ? sortedCompagnonsRarity.filter(
        (compagnon) => compagnon.rarete.toLowerCase() === selectedRarityFilter,
      )
    : sortedCompagnonsRarity;

  const filteredByName = filteredCompagnons.filter((compagnon) => {
    if (searchInput === "") {
      return true;
    }
    return compagnon.nom.toLowerCase().includes(searchInput.toLowerCase());
  });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchInput(e.target.value);
  };

  const handleFilterClick = (rarity: string) => {
    setSelectedRarityFilter(rarity);
  };
  return (
    <div className="flex  h-full ">
      <div className="flex basis-1/2  flex-col gap-4 overflow-y-auto py-4">
        <h2 className="text-center text-3xl font-extrabold">Compagnons</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleFilterClick("commun")}
            className="btn-filter rounded-md border border-commun  px-2 font-bold text-commun"
          >
            Commun
          </button>
          <button
            onClick={() => handleFilterClick("rare")}
            className="btn-filter rounded-md border border-rare  px-2 font-bold text-rare"
          >
            Rare
          </button>
          <button
            onClick={() => handleFilterClick("krosmique")}
            className="btn-filter rounded-md border border-krosmique  px-2 font-bold text-krosmique"
          >
            Krosmique
          </button>
          <button
            onClick={() => handleFilterClick("infinite")}
            className="btn-filter rounded-md border border-infinite  px-2 font-bold text-infinite"
          >
            Infinite
          </button>
        </div>
        <input
          type="text"
          placeholder="Rechercher"
          value={searchInput}
          onChange={(e) => handleSearchInputChange(e)}
          className="ml-8 w-40 rounded-md border-2 border-white bg-overlay px-2 opacity-50"
        />
        <div className="flex flex-wrap justify-center gap-2">
          {filteredByName.map((compagnon, index) => {
            return (
              <div
                onMouseEnter={() => setDisplayedCompagnon(compagnon)}
                onClick={() => handleCompagnonClick(compagnon)}
                className={`relative flex  h-36 w-36 flex-col items-center`}
                key={compagnon.nom + index}
              >
                <div className="relative flex items-center ">
                  <Image
                    src={`/img/utils/cadre_${compagnon.rarete.toLowerCase()}.png`}
                    alt={compagnon.nom}
                    width={100}
                    height={100}
                    priority
                    className="absolute hover:cursor-pointer"
                  />
                  <Image
                    src={`${COMPAGNON_BASE_URL}/${compagnon.image}.png`}
                    alt={compagnon.nom}
                    width={100}
                    height={100}
                    priority
                  />
                  <div className="absolute -right-2 flex flex-col">
                    {Object.entries(compagnon.patchs[0].couts).map((cout) => {
                      return (
                        <div key={cout[0] + cout[1]} className="flex flex-col">
                          <div className="relative flex flex-row  ">
                            <Image
                              src={`/img/utils/${cout[0]}.png`}
                              width={30}
                              height={30}
                              alt="cout"
                              className=""
                            />
                            <p className="text-outline absolute left-[0.7rem] top-1 text-lg font-bold ">
                              {cout[1]}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="text-center text-sm font-bold">{compagnon.nom}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex basis-1/2 flex-col gap-4 border-l-2 bg-overlaySide py-4 ">
        <div className="flex w-full flex-col items-center gap-2">
          {displayedCompagnon && (
            <>
              <div className="relative flex items-center">
                <Image
                  src={`/img/utils/cadre_${displayedCompagnon.rarete.toLowerCase()}.png`}
                  alt={displayedCompagnon.nom}
                  width={150}
                  height={150}
                  className="absolute hover:cursor-pointer"
                />
                <Image
                  src={`${COMPAGNON_BASE_URL}/${displayedCompagnon.image}.png`}
                  width={150}
                  height={150}
                  alt={displayedCompagnon.nom}
                />
                <div className="absolute -right-6 flex flex-col gap-2">
                  {Object.entries(displayedCompagnon.patchs[0].couts).map(
                    (cout) => {
                      return (
                        <div
                          key={cout[0] + cout[1]}
                          className="relative h-full w-full"
                        >
                          <Image
                            src={`/img/utils/${cout[0]}.png`}
                            width={40}
                            height={40}
                            alt="cout"
                          />
                          <p
                            className={
                              cout[0] === "feu"
                                ? fireVariants
                                : cout[0] === "eau"
                                ? waterVariants
                                : cout[0] === "terre"
                                ? earthVariants
                                : windVariants
                            }
                          >
                            {cout[1]}
                          </p>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
              <p className="text-2xl font-black">{displayedCompagnon.nom}</p>

              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex gap-2 rounded-lg bg-attribute p-2 ">
                  <Image
                    src="/img/utils/pv.png"
                    width={25}
                    height={25}
                    alt="pv"
                  />
                  <p className="font-bold">{displayedCompagnon.patchs[0].pv}</p>
                </div>
                <div className="flex gap-2 rounded-lg bg-attribute p-2 ">
                  <Image
                    src="/img/utils/at.png"
                    width={25}
                    height={25}
                    alt="pv"
                  />
                  <p className="font-bold">{displayedCompagnon.patchs[0].at}</p>
                </div>
                <div className="flex gap-2 rounded-lg bg-attribute p-2 ">
                  <Image
                    src="/img/utils/cc.png"
                    width={25}
                    height={25}
                    alt="pv"
                  />
                  <p className="font-bold">{displayedCompagnon.patchs[0].cc}</p>
                </div>
                <div className="flex gap-2 rounded-lg bg-attribute p-2 ">
                  <Image
                    src="/img/utils/pm.png"
                    width={25}
                    height={25}
                    alt="pv"
                  />
                  <p className="font-bold">{displayedCompagnon.patchs[0].pm}</p>
                </div>
              </div>
              <p className="text-center">
                {displayedCompagnon.patchs[0].effet}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {displayedCompagnon.patchs[0].caracteristiques.map(
                  (carac: CaracteristiqueCompagnons) => {
                    return (
                      <p
                        key={carac.effet}
                        className="rounded-lg bg-attribute px-4 py-2"
                      >
                        {carac.taux + carac.effet}
                      </p>
                    );
                  },
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex h-full w-full flex-wrap gap-4 overflow-y-scroll px-4 pt-8 xl:justify-center  xl:overflow-y-visible xl:px-0">
          {displayedCompagnon && (
            <>
              {displayedCompagnon.patchs[0].dons.map(
                (don: DonCompagnons, key) => {
                  return (
                    <div
                      key={key}
                      className="flex h-auto max-h-60 w-full flex-col justify-between gap-2 rounded-lg bg-attribute px-2 py-2 hover:cursor-pointer xl:w-1/4"
                    >
                      <p className="text-center text-sm  font-black">
                        {don.nom.toUpperCase()}
                      </p>
                      <p className="text-center text-sm">{don.effet}</p>
                      <div className="flex items-center justify-center">
                        <Image
                          src="/img/utils/rune_de_compagnon.png"
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
                },
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompagnonsDialog;
