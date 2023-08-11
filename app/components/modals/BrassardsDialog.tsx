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
  const ARMBAND_BASE_URL = "/img/brassards";

  const [selectedBrassard, setSelectedBrassard] = useState<Brassard | null>(null);
  const [displayedBrassard, setDisplayedBrassard] = useState<Brassard | null>(null);

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

  return (
    <div className="flex h-[80vh]">
      <div className="flex flex-col gap-8 basis-1/2 overflow-y-auto py-4">
        <h2 className="text-center font-extrabold text-3xl">Brassard</h2>
        <div className="flex flex-wrap gap-8 justify-center px-2">
          {sortedBrassardsRarity.map((brassard) => {
            const rarityBorder = `border-${brassard.rarete.toLowerCase()}`;
            return (
              <div
                onMouseEnter={() => setDisplayedBrassard(brassard)}
                onClick={() => handleBrassardClick(brassard)}
                className={`hover:cursor-pointer flex flex-col  items-center w-36 h-36  border-4 ${
                  brassard.rarete.toLowerCase() === "commun"
                    ? "border-commun"
                    : brassard.rarete.toLowerCase() === "rare"
                    ? "border-rare"
                    : brassard.rarete.toLowerCase() === "krosmique"
                    ? "border-krosmique"
                    : "border-infinite"
                }`}
                key={brassard.nom}>
                <Image src={`${ARMBAND_BASE_URL}/${brassard.image}.png`} alt={brassard.nom} width={80} height={80} />
                <p className="text-center leading-5 text-sm">{brassard.nom}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4 border-l-2 p-4 bg-overlaySide basis-1/2  ">
        <div className="flex flex-col w-full items-center gap-2 ">
          {displayedBrassard && (
            <>
              <Image
                src={`${ARMBAND_BASE_URL}/${displayedBrassard.image}.png`}
                width={120}
                height={120}
                alt={displayedBrassard.nom}
              />
              <p className="font-black text-2xl">{displayedBrassard.nom}</p>
              <p className="text-center">{displayedBrassard.patchs[0].pouvoir}</p>
              <div className="flex flex-wrap gap-2">
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

        <div className="flex flex-wrap w-full justify-center gap-4 overflow-y-scroll pt-8">
          {displayedBrassard && (
            <>
              {displayedBrassard.patchs[0].dons.map((don: DonBrassards, key) => {
                return (
                  <div
                    key={key}
                    className="bg-attribute rounded-lg py-2 w-1/4 px-2  h-44  flex flex-col justify-between hover:cursor-pointer">
                    <p className="text-sm text-center  font-black">{don.nom}</p>
                    <p className="text-sm text-center">{don.effet}</p>
                    <div className="flex justify-center ">
                      <Image src="/img/utils/rune_d_equipement.png" width={20} height={20} alt="cout_rune" />
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
