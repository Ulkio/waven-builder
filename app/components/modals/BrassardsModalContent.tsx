"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import data from "@/api/data.json";
import {
  Brassard,
  CaracteristiqueBrassards,
  DonBrassards,
} from "@/types/index.ts";

interface BrassardsDialogProps {
  onSelectedBrassardChange: (selectedBrassard: Brassard) => void;
  onClickBrassard: () => void;
}
const BrassardsDialog = ({
  onSelectedBrassardChange,
  onClickBrassard,
}: BrassardsDialogProps) => {
  const brassards: Brassard[] = data.equipements.brassards;
  const BRASSARD_BASE_URL = "/img/brassards";

  const [searchInput, setsearchInput] = useState("");
  const [selectedBrassard, setSelectedBrassard] = useState<Brassard | null>(
    null,
  );
  const [displayedBrassard, setDisplayedBrassard] = useState<Brassard | null>(
    null,
  );
  const [selectedRarityFilter, setSelectedRarityFilter] = useState<
    string | null
  >("commun");

  const handleBrassardClick = (brassard: Brassard) => {
    setSelectedBrassard(brassard);
    onSelectedBrassardChange(brassard);
    onClickBrassard();
  };
  const rarityOrder: { [key: string]: number } = {
    Commun: 1,
    Rare: 2,
    Krosmique: 3,
    Infinite: 4,
  };
  const sortedBrassardsRarity = brassards.sort((a, b): any => {
    const rarityA = a.rarete;
    const rarityB = b.rarete;

    const orderA = rarityOrder[rarityA] || Infinity;
    const orderB = rarityOrder[rarityB] || Infinity;

    return orderA - orderB;
  });

  const filteredBrassards = selectedRarityFilter
    ? sortedBrassardsRarity.filter(
        (brassard) => brassard.rarete.toLowerCase() === selectedRarityFilter,
      )
    : sortedBrassardsRarity;

  const filteredByName = filteredBrassards.filter((brassard) => {
    if (searchInput === "") {
      return true;
    }
    return brassard.nom.toLowerCase().includes(searchInput.toLowerCase());
  });
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchInput(e.target.value);
  };
  const handleFilterClick = (rarity: string) => {
    setSelectedRarityFilter(rarity);
  };
  return (
    <div className="flex h-full">
      <div className="flex basis-1/2 flex-col gap-4 overflow-y-auto py-4">
        <h2 className="text-center text-3xl font-extrabold">Brassards</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleFilterClick("commun")}
            className="btn-filter rounded-md border border-commun px-2 font-bold text-commun"
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
        <div className="flex flex-wrap justify-center gap-8">
          {filteredByName.map((brassard) => {
            return (
              <div
                onMouseEnter={() => setDisplayedBrassard(brassard)}
                onClick={() => handleBrassardClick(brassard)}
                key={brassard.nom}
                className={`relative flex  h-36 w-36 flex-col items-center`}
              >
                <Image
                  src={`/img/utils/bg_${brassard.rarete.toLowerCase()}.png`}
                  alt={brassard.nom}
                  width={100}
                  height={100}
                  priority
                  className="absolute hover:cursor-pointer"
                />
                <Image
                  src={`${BRASSARD_BASE_URL}/${brassard.image}.png`}
                  alt={brassard.nom}
                  width={90}
                  height={90}
                  priority
                  className="z-10 hover:cursor-pointer"
                />
                <p className="z-10 pt-4 text-center font-bold">
                  {brassard.nom}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex basis-1/2 flex-col gap-4 border-l-2 bg-overlaySide py-4  ">
        <div className="flex w-full flex-col items-center gap-2">
          {displayedBrassard && (
            <>
              <div className={`relative flex  h-36 w-36 flex-col items-center`}>
                <Image
                  src={`/img/utils/bg_${displayedBrassard.rarete.toLowerCase()}.png`}
                  alt={displayedBrassard.nom}
                  width={150}
                  height={150}
                  className="absolute hover:cursor-pointer"
                />
                <Image
                  src={`${BRASSARD_BASE_URL}/${displayedBrassard.image}.png`}
                  alt={displayedBrassard.nom}
                  width={150}
                  height={150}
                  className="z-10 hover:cursor-pointer"
                />
              </div>
              <p className="text-center text-2xl font-black">
                {displayedBrassard.nom}
              </p>
              <p className="text-center">
                {displayedBrassard.patchs[0].pouvoir}
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-center">
                {displayedBrassard.patchs[0].caracteristiques.map(
                  (carac: CaracteristiqueBrassards) => {
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

        <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll px-4 xl:flex-row  xl:flex-wrap xl:justify-center xl:overflow-y-visible xl:px-0 xl:pt-8">
          {displayedBrassard && (
            <>
              {displayedBrassard.patchs[0].dons.map(
                (don: DonBrassards, key) => {
                  return (
                    <div
                      key={key}
                      className="flex h-auto max-h-60 w-full flex-col justify-between gap-2 rounded-lg bg-attribute px-2 py-2 hover:cursor-pointer xl:w-1/4"
                    >
                      <p className="text-center text-sm  font-black">
                        {don.nom}
                      </p>
                      <p className="text-center text-sm">{don.effet}</p>
                      <div className="flex items-center justify-center">
                        <Image
                          src="/img/utils/rune_d_equipement.png"
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

export default BrassardsDialog;
