"use client";
import React, { useState, useEffect, HTMLProps } from "react";
import Image from "next/image";
import data from "@/api/data.json";
import { Anneau, CaracteristiqueAnneaux, DonAnneaux } from "@/types/index.ts";

interface AnneauxDialogProps {
  onSelectedAnneauChange: (selectedAnneau: Anneau) => void;
  onClickAnneau: () => void;
}
const AnneauxDialog = ({
  onSelectedAnneauChange,
  onClickAnneau,
}: AnneauxDialogProps) => {
  const rings: Anneau[] = data.equipements.anneaux;
  const RING_BASE_URL = "/img/anneaux";

  const [searchInput, setsearchInput] = useState("");
  const [selectedAnneau, setSelectedAnneau] = useState<Anneau | null>(null);
  const [displayedAnneau, setDisplayedAnneau] = useState<Anneau | null>(null);
  const [selectedRarityFilter, setSelectedRarityFilter] = useState<
    string | null
  >("commun");

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

  const filteredAnneaux = selectedRarityFilter
    ? sortedAnneauxRarity.filter(
        (anneau) => anneau.rarete.toLowerCase() === selectedRarityFilter,
      )
    : sortedAnneauxRarity;

  const filteredByName = filteredAnneaux.filter((anneau) => {
    if (searchInput === "") {
      return true;
    }
    return anneau.nom.toLowerCase().includes(searchInput.toLowerCase());
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
        <h2 className="text-center text-3xl font-extrabold">Anneaux</h2>
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
        <div className=" flex flex-wrap justify-center gap-8">
          {filteredByName.map((ring) => {
            return (
              <div
                onMouseEnter={() => setDisplayedAnneau(ring)}
                onClick={() => handleAnneauClick(ring)}
                key={ring.nom}
                className={`relative flex  h-36 w-36 flex-col items-center`}
              >
                <Image
                  src={`/img/utils/bg_${ring.rarete.toLowerCase()}.png`}
                  alt={ring.nom}
                  width={100}
                  height={100}
                  priority
                  className="absolute hover:cursor-pointer"
                />
                <Image
                  src={`${RING_BASE_URL}/${ring.image}.png`}
                  alt={ring.nom}
                  width={90}
                  height={90}
                  priority
                  className="z-10 hover:cursor-pointer"
                />
                <p className="z-10 pt-4 text-center font-bold">{ring.nom}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex basis-1/2 flex-col gap-4 border-l-2 bg-overlaySide py-4  ">
        <div className="gap- flex w-full flex-col items-center">
          {displayedAnneau && (
            <>
              <div className={`relative flex  h-36 w-36 flex-col items-center`}>
                <Image
                  src={`/img/utils/bg_${displayedAnneau.rarete.toLowerCase()}.png`}
                  alt={displayedAnneau.nom}
                  width={150}
                  height={150}
                  className="absolute hover:cursor-pointer"
                />
                <Image
                  src={`${RING_BASE_URL}/${displayedAnneau.image}.png`}
                  alt={displayedAnneau.nom}
                  width={150}
                  height={150}
                  className="z-10 hover:cursor-pointer"
                />
              </div>

              <p className="text-center text-2xl font-black">
                {displayedAnneau.nom}
              </p>
              <p className="text-center">{displayedAnneau.patchs[0].pouvoir}</p>
              <div className="flex flex-wrap justify-center gap-2 text-center">
                {displayedAnneau.patchs[0].caracteristiques.map(
                  (carac: CaracteristiqueAnneaux, key) => {
                    return (
                      <p
                        key={key + carac.effet}
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

        <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll px-4  xl:flex-row  xl:flex-wrap xl:justify-center xl:overflow-y-visible xl:px-0 xl:pt-8">
          {displayedAnneau && (
            <>
              {displayedAnneau.patchs[0].dons.map((don: DonAnneaux, key) => {
                return (
                  <div
                    key={key + don.effet}
                    className="flex h-auto max-h-60 w-full flex-col justify-between gap-2 rounded-lg bg-attribute px-2 py-2 hover:cursor-pointer xl:w-1/4"
                  >
                    <p className="text-center text-sm  font-black">{don.nom}</p>
                    <p className="text-center text-sm">{don.effet}</p>
                    <div className="flex justify-center ">
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
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnneauxDialog;
