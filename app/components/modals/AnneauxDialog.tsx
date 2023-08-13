"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import data from "@/api/data.json";
import { Anneau, CaracteristiqueAnneaux, DonAnneaux } from "@/types/index.ts";

interface AnneauxDialogProps {
  onSelectedAnneauChange: (selectedAnneau: Anneau) => void;
  onClickAnneau: () => void;
}
const AnneauxDialog = ({ onSelectedAnneauChange, onClickAnneau }: AnneauxDialogProps) => {
  const rings: Anneau[] = data.equipements.anneaux;
  const RING_BASE_URL = "/img/anneaux";

  const [selectedAnneau, setSelectedAnneau] = useState<Anneau | null>(null);
  const [displayedAnneau, setDisplayedAnneau] = useState<Anneau | null>(null);

  const handleAnneauClick = (anneau: Anneau) => {
    setSelectedAnneau(anneau);
    onSelectedAnneauChange(anneau);
    onClickAnneau();
  };
  const rarityOrder: { [key: string]: number } = {
    Commun: 1,
    Rare: 2,
    Krosmique: 3,
    Infinite: 4,
  };
  const sortedAnneauxRarity = rings.sort((a, b): any => {
    const rarityA = a.rarete;
    const rarityB = b.rarete;

    const orderA = rarityOrder[rarityA] || Infinity;
    const orderB = rarityOrder[rarityB] || Infinity;

    return orderA - orderB;
  });

  return (
    <div className="flex h-full">
      <div className="flex flex-col gap-8 basis-1/2 overflow-y-auto">
        <h2 className="text-center font-extrabold text-3xl">Anneaux</h2>
        <div className=" flex flex-wrap gap-8 justify-center">
          {sortedAnneauxRarity.map((ring) => {
            return (
              <div
                key={ring.nom}
                onMouseEnter={() => setDisplayedAnneau(ring)}
                onClick={() => handleAnneauClick(ring)}
                className={`hover:cursor-pointer flex flex-col  items-center w-32 h-32 border-4 ${
                  ring.rarete.toLowerCase() === "commun"
                    ? "border-commun"
                    : ring.rarete.toLowerCase() === "rare"
                    ? "border-rare"
                    : ring.rarete.toLowerCase() === "krosmique"
                    ? "border-krosmique"
                    : "border-infinite"
                }`}>
                <Image
                  src={`${RING_BASE_URL}/${ring.image}.png`}
                  alt={ring.nom}
                  width={70}
                  height={70}
                  className="hover:cursor-pointer"
                />
                <p className="text-center leading-5">{ring.nom}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4 border-l-2 py-4 bg-overlaySide basis-1/2  ">
        <div className="flex flex-col w-full items-center ">
          {displayedAnneau && (
            <>
              <Image
                src={`${RING_BASE_URL}/${displayedAnneau.image}.png`}
                width={150}
                height={150}
                alt={displayedAnneau.nom}
              />
              <p className="font-black text-2xl">{displayedAnneau.nom}</p>
              <p className="text-center">{displayedAnneau.patchs[0].pouvoir}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {displayedAnneau.patchs[0].caracteristiques.map((carac: CaracteristiqueAnneaux, key) => {
                  return (
                    <p key={key + carac.effet} className="bg-attribute rounded-lg px-4 py-2">
                      {carac.taux + carac.effet}
                    </p>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col px-4 xl:px-0 xl:flex-row xl:flex-wrap w-full  gap-4  xl:pt-8 overflow-y-scroll xl:overflow-y-visible xl:justify-center h-full">
          {displayedAnneau && (
            <>
              {displayedAnneau.patchs[0].dons.map((don: DonAnneaux, key) => {
                return (
                  <div
                    key={key + don.effet}
                    className="bg-attribute rounded-lg py-2 w-full xl:w-1/4 px-2 h-auto max-h-64 flex flex-col justify-between hover:cursor-pointer gap-2">
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

export default AnneauxDialog;
