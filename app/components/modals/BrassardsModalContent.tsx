"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import data from "@/api/data.json";
import { Brassard, CaracteristiqueBrassards, DonBrassards } from "@/types/index.ts";

interface BrassardsDialogProps {
  onSelectedBrassardChange: (selectedBrassard: Brassard) => void;
  onClickBrassard: () => void;
}
const BrassardsDialog = ({ onSelectedBrassardChange, onClickBrassard }: BrassardsDialogProps) => {
  const brassards: Brassard[] = data.equipements.brassards;
  const BRASSARD_BASE_URL = "/img/brassards";

  const [searchInput, setsearchInput] = useState("");
  const [selectedBrassard, setSelectedBrassard] = useState<Brassard | null>(null);
  const [displayedBrassard, setDisplayedBrassard] = useState<Brassard | null>(null);
  const [selectedRarityFilter, setSelectedRarityFilter] = useState<string | null>("commun");

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
    ? sortedBrassardsRarity.filter((brassard) => brassard.rarete.toLowerCase() === selectedRarityFilter)
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
      <div className="flex flex-col gap-4 basis-1/2 overflow-y-auto py-4">
        <h2 className="text-center font-extrabold text-3xl">Brassards</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleFilterClick("commun")}
            className="btn-filter text-commun border border-commun px-2 rounded-md font-bold">
            Commun
          </button>
          <button
            onClick={() => handleFilterClick("rare")}
            className="btn-filter text-rare border border-rare  px-2 rounded-md font-bold">
            Rare
          </button>
          <button
            onClick={() => handleFilterClick("krosmique")}
            className="btn-filter text-krosmique border border-krosmique  px-2 rounded-md font-bold">
            Krosmique
          </button>
          <button
            onClick={() => handleFilterClick("infinite")}
            className="btn-filter text-infinite border border-infinite  px-2 rounded-md font-bold">
            Infinite
          </button>
        </div>
        <input
          type="text"
          placeholder="Rechercher"
          value={searchInput}
          onChange={(e) => handleSearchInputChange(e)}
          className="w-40 bg-overlay opacity-50 border-2 border-white rounded-md ml-8 px-2"
        />
        <div className="flex flex-wrap gap-8 justify-center">
          {filteredByName.map((brassard) => {
            return (
              <div
                onMouseEnter={() => setDisplayedBrassard(brassard)}
                onClick={() => handleBrassardClick(brassard)}
                key={brassard.nom}
                className={`flex flex-col  items-center w-36 h-36 relative`}>
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
                  className="hover:cursor-pointer z-10"
                />
                <p className="text-center z-10 pt-4 font-bold">{brassard.nom}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4 border-l-2 py-4 bg-overlaySide basis-1/2  ">
        <div className="flex flex-col w-full items-center gap-2">
          {displayedBrassard && (
            <>
              <div className={`flex flex-col  items-center w-36 h-36 relative`}>
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
                  className="hover:cursor-pointer z-10"
                />
              </div>
              <p className="font-black text-2xl text-center">{displayedBrassard.nom}</p>
              <p className="text-center">{displayedBrassard.patchs[0].pouvoir}</p>
              <div className="flex flex-wrap justify-center gap-2 text-center">
                {displayedBrassard.patchs[0].caracteristiques.map((carac: CaracteristiqueBrassards) => {
                  return (
                    <p key={carac.effet} className="bg-attribute rounded-lg px-4 py-2">
                      {carac.taux + carac.effet}
                    </p>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col xl:justify-center px-4 xl:px-0 xl:flex-row xl:flex-wrap w-full  gap-4 overflow-y-scroll xl:overflow-y-visible xl:pt-8 h-full">
          {displayedBrassard && (
            <>
              {displayedBrassard.patchs[0].dons.map((don: DonBrassards, key) => {
                return (
                  <div
                    key={key}
                    className="bg-attribute rounded-lg py-2 w-full xl:w-1/4 px-2 h-auto max-h-60 flex flex-col justify-between hover:cursor-pointer gap-2">
                    <p className="text-sm text-center  font-black">{don.nom}</p>
                    <p className="text-sm text-center">{don.effet}</p>
                    <div className="flex justify-center items-center">
                      <Image src="/img/utils/rune_d_equipement.png" width={30} height={30} alt="cout_rune" />
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

export default BrassardsDialog;
