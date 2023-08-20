"use client";
import React, { useState } from "react";
import Image from "next/image";
import data from "@/api/data.json";
import { Compagnon, CaracteristiqueCompagnons, DonCompagnons } from "@/types/index.ts";

interface CompagnonsDialogProps {
  onSelectedCompagnonChange: (selectedCompagnon: Compagnon) => void;
  onClickCompagnon: () => void;
}
const CompagnonsDialog = ({ onSelectedCompagnonChange, onClickCompagnon }: CompagnonsDialogProps) => {
  const compagnons: Compagnon[] = data.compagnons.compagnons;
  const COMPAGNON_BASE_URL = "/img/compagnons";

  const fireVariants = `absolute top-3 left-[1rem] font-bold text-xl text-outline`;
  const waterVariants = `absolute top-3 left-4 font-bold text-xl text-outline`;
  const earthVariants = `absolute top-2 left-4 font-bold text-xl text-outline`;
  const windVariants = `absolute top-3 left-4 font-bold text-xl text-outline`;

  const [selectedCompagnon, setSelectedCompagnon] = useState<Compagnon | null>(null);
  const [displayedCompagnon, setDisplayedCompagnon] = useState<Compagnon | null>(null);
  const [selectedRarityFilter, setSelectedRarityFilter] = useState<string | null>("commun");

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
    ? sortedCompagnonsRarity.filter((compagnon) => compagnon.rarete.toLowerCase() === selectedRarityFilter)
    : sortedCompagnonsRarity;

  const handleFilterClick = (rarity: string) => {
    setSelectedRarityFilter(rarity);
  };
  return (
    <div className="flex  h-full ">
      <div className="flex flex-col  gap-4 basis-1/2 overflow-y-auto py-4">
        <h2 className="text-center font-extrabold text-3xl">Compagnons</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleFilterClick("commun")}
            className="btn-filter text-commun border border-commun  px-2 rounded-md font-bold">
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
        <div className="flex flex-wrap gap-2 justify-center">
          {filteredCompagnons.map((compagnon) => {
            return (
              <div
                onMouseEnter={() => setDisplayedCompagnon(compagnon)}
                onClick={() => handleCompagnonClick(compagnon)}
                className={`flex flex-col  items-center w-36 h-36 relative`}
                key={compagnon.nom}>
                <div className="flex items-center relative ">
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
                  <div className="flex flex-col absolute -right-2">
                    {Object.entries(compagnon.patchs[0].couts).map((cout) => {
                      return (
                        <div key={cout[0] + cout[1]} className="flex flex-col">
                          <div className="relative flex flex-row  ">
                            <Image src={`/img/utils/${cout[0]}.png`} width={30} height={30} alt="cout" className="" />
                            <p className="absolute text-lg left-[0.7rem] top-1 font-bold text-outline ">{cout[1]}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="text-sm text-center font-bold">{compagnon.nom}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4 border-l-2 py-4 bg-overlaySide basis-1/2 ">
        <div className="flex flex-col w-full items-center gap-2">
          {displayedCompagnon && (
            <>
              <div className="flex items-center relative">
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
                <div className="flex flex-col gap-2 absolute -right-6">
                  {Object.entries(displayedCompagnon.patchs[0].couts).map((cout) => {
                    return (
                      <div key={cout[0] + cout[1]} className="h-full w-full relative">
                        <Image src={`/img/utils/${cout[0]}.png`} width={40} height={40} alt="cout" />
                        <p
                          className={
                            cout[0] === "feu"
                              ? fireVariants
                              : cout[0] === "eau"
                              ? waterVariants
                              : cout[0] === "terre"
                              ? earthVariants
                              : windVariants
                          }>
                          {cout[1]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="font-black text-2xl">{displayedCompagnon.nom}</p>

              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex bg-attribute rounded-lg p-2 gap-2 ">
                  <Image src="/img/utils/pv.png" width={25} height={25} alt="pv" />
                  <p className="font-bold">{displayedCompagnon.patchs[0].pv}</p>
                </div>
                <div className="flex bg-attribute rounded-lg p-2 gap-2 ">
                  <Image src="/img/utils/at.png" width={25} height={25} alt="pv" />
                  <p className="font-bold">{displayedCompagnon.patchs[0].at}</p>
                </div>
                <div className="flex bg-attribute rounded-lg p-2 gap-2 ">
                  <Image src="/img/utils/cc.png" width={25} height={25} alt="pv" />
                  <p className="font-bold">{displayedCompagnon.patchs[0].cc}</p>
                </div>
                <div className="flex bg-attribute rounded-lg p-2 gap-2 ">
                  <Image src="/img/utils/pm.png" width={25} height={25} alt="pv" />
                  <p className="font-bold">{displayedCompagnon.patchs[0].pm}</p>
                </div>
              </div>
              <p className="text-center">{displayedCompagnon.patchs[0].effet}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {displayedCompagnon.patchs[0].caracteristiques.map((carac: CaracteristiqueCompagnons) => {
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

        <div className="flex flex-wrap px-4 xl:px-0 w-full xl:justify-center gap-4 overflow-y-scroll xl:overflow-y-visible  pt-8 h-full">
          {displayedCompagnon && (
            <>
              {displayedCompagnon.patchs[0].dons.map((don: DonCompagnons, key) => {
                return (
                  <div
                    key={key}
                    className="bg-attribute rounded-lg py-2 w-full xl:w-1/4 px-2 h-auto max-h-60 flex flex-col justify-between hover:cursor-pointer gap-2">
                    <p className="text-sm text-center  font-black">{don.nom.toUpperCase()}</p>
                    <p className="text-md text-center">{don.effet}</p>
                    <div className="flex justify-center ">
                      <Image src="/img/utils/rune_de_compagnon.png" width={30} height={30} alt="cout_rune" />
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

export default CompagnonsDialog;
