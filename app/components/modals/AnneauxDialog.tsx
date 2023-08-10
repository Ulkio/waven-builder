"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import data from "@/api/data.json";
import { Anneaux, CaracteristiqueAnneaux, DonAnneaux } from "@/types/index.ts";

const AnneauxDialog = () => {
  const rings: Anneaux[] = data.equipements.anneaux;
  const RING_BASE_URL = "/img/anneaux";

  const rarityOrder: { [key: string]: number } = {
    Commun: 1,
    Rare: 2,
    Krosmique: 3,
    Infinite: 4,
  };
  const sortedRingsRarity = rings.sort((a, b): any => {
    const rarityA = a.rarete;
    const rarityB = b.rarete;

    const orderA = rarityOrder[rarityA] || Infinity;
    const orderB = rarityOrder[rarityB] || Infinity;

    return orderA - orderB;
  });

  const [selectedRing, setSelectedRing] = useState<Anneaux | null>(null);
  const [displayedRing, setDisplayedRing] = useState<Anneaux | null>(null);

  return (
    <div className="flex h-[80vh]">
      <div className="flex flex-col gap-8 basis-1/2 overflow-y-auto">
        <h2 className="text-center font-extrabold text-3xl">Anneaux</h2>
        <div className=" flex flex-wrap gap-8 justify-center">
          {sortedRingsRarity.map((ring) => {
            const rarityBorder = `border-${ring.rarete.toLowerCase()}`;
            return (
              <div
                onMouseEnter={() => setDisplayedRing(ring)}
                onClick={() => setSelectedRing(ring)}
                className={`hover:cursor-pointer flex flex-col  items-center w-32 h-32 border-2 ${rarityBorder}`}
                key={ring.nom}>
                <Image
                  src={`${RING_BASE_URL}/${ring.image}.png`}
                  alt={ring.nom}
                  width={80}
                  height={80}
                  className="hover:cursor-pointer"
                />
                <p className="text-sm">{ring.nom}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4 border-l-2 p-4 bg-overlaySide basis-1/2  ">
        <div className="flex flex-col w-full items-center gap-2 ">
          {displayedRing && (
            <>
              <Image
                src={`${RING_BASE_URL}/${displayedRing.image}.png`}
                width={120}
                height={120}
                alt={displayedRing.nom}
              />
              <p className="font-black text-2xl">{displayedRing.nom}</p>
              <p className="text-center">{displayedRing.patchs[0].pouvoir}</p>
              <div className="flex flex-wrap gap-2">
                {displayedRing.patchs[0].caracteristiques.map((carac: CaracteristiqueAnneaux) => {
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
          {displayedRing && (
            <>
              {displayedRing.patchs[0].dons.map((don: DonAnneaux, key) => {
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

export default AnneauxDialog;
