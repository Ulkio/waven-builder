"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import data from "@/api/data.json";
import { Compagnon, CaracteristiqueCompagnons, DonCompagnons, Couts } from "@/types/index.ts";

interface CompagnonsDialogProps {
  onSelectedCompagnonChange: (selectedCompagnon: Compagnon) => void;
  onClickCompagnon: () => void;
}
const CompagnonsDialog = ({ onSelectedCompagnonChange, onClickCompagnon }: CompagnonsDialogProps) => {
  const compagnons: Compagnon[] = data.compagnons.compagnons;
  const COMPAGNON_BASE_URL = "/img/compagnons";

  const [selectedCompagnon, setSelectedCompagnon] = useState<Compagnon | null>(null);
  const [displayedCompagnon, setDisplayedCompagnon] = useState<Compagnon | null>(null);

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
  return (
    <div className="flex h-[80vh]">
      <div className="flex flex-col gap-8 basis-1/2 overflow-y-auto py-4">
        <h2 className="text-center font-extrabold text-3xl">Compagnon</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {sortedCompagnonsRarity.map((compagnon) => {
            return (
              <div
                className={`flex flex-col  items-center w-40 h-40 border-4 ${
                  compagnon.rarete.toLowerCase() === "commun"
                    ? "border-commun"
                    : compagnon.rarete.toLowerCase() === "rare"
                    ? "border-rare"
                    : compagnon.rarete.toLowerCase() === "krosmique"
                    ? "border-krosmique"
                    : "border-infinite"
                }`}
                key={compagnon.nom}>
                <Image
                  onMouseEnter={() => setDisplayedCompagnon(compagnon)}
                  onClick={() => handleCompagnonClick(compagnon)}
                  src={`${COMPAGNON_BASE_URL}/${compagnon.image}.png`}
                  alt={compagnon.nom}
                  width={120}
                  height={120}
                  className="hover:cursor-pointer"
                />
                <p className="text-sm text-center">{compagnon.nom}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4 border-l-2 p-4 bg-overlaySide basis-1/2  ">
        <div className="flex flex-col w-full items-center gap-2 ">
          {displayedCompagnon && (
            <>
              <div className="flex items-center">
                <Image
                  src={`${COMPAGNON_BASE_URL}/${displayedCompagnon.image}.png`}
                  width={200}
                  height={200}
                  alt={displayedCompagnon.nom}
                />
                <div className="flex flex-col gap-2">
                  {Object.entries(displayedCompagnon.patchs[0].couts).map((cout) => {
                    return (
                      <div key={cout[0] + cout[1]} className="flex items-center ">
                        <Image src={`/img/utils/${cout[0]}.png`} width={30} height={30} alt="cout" />
                        <p className="font-bold ">{cout[1]}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="font-black text-2xl">{displayedCompagnon.nom}</p>

              <div className="flex flex-wrap gap-2">
                <div className="flex bg-attribute rounded-lg px-2">
                  <Image src="/img/utils/pv.png" width={20} height={20} alt="pv" />
                  <p>{displayedCompagnon.patchs[0].pv}</p>
                </div>
                <div className="flex bg-attribute rounded-lg px-2">
                  <Image src="/img/utils/at.png" width={20} height={20} alt="pv" />
                  <p>{displayedCompagnon.patchs[0].at}</p>
                </div>
                <div className="flex bg-attribute rounded-lg px-2">
                  <Image src="/img/utils/cc.png" width={20} height={20} alt="pv" />
                  <p>{displayedCompagnon.patchs[0].cc}</p>
                </div>
                <div className="flex bg-attribute rounded-lg px-2">
                  <Image src="/img/utils/pm.png" width={20} height={20} alt="pv" />
                  <p>{displayedCompagnon.patchs[0].pm}</p>
                </div>
              </div>
              <p>{displayedCompagnon.patchs[0].effet}</p>
              <div className="flex flex-wrap gap-2">
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

        <div className="flex flex-wrap w-full justify-center gap-4 overflow-y-scroll">
          {displayedCompagnon && (
            <>
              {displayedCompagnon.patchs[0].dons.map((don: DonCompagnons, key) => {
                return (
                  <div
                    key={key}
                    className="bg-attribute rounded-lg py-2 w-1/4 px-2  h-44  flex flex-col justify-between hover:cursor-pointer">
                    <p className="text-sm text-center  font-black">{don.nom.toUpperCase()}</p>
                    <p className="text-sm text-center">{don.effet}</p>
                    <div className="flex justify-center ">
                      <Image src="/img/utils/rune_de_compagnon.png" width={20} height={20} alt="cout_rune" />
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
