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
    <div className="flex  h-full ">
      <div className="flex flex-col  gap-8 basis-1/2  py-4 overflow-y-auto">
        <h2 className="text-center font-extrabold text-3xl">Compagnons</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {sortedCompagnonsRarity.map((compagnon) => {
            return (
              <div className={`flex flex-col  items-center w-36 h-36 relative`} key={compagnon.nom}>
                <Image
                  onMouseEnter={() => setDisplayedCompagnon(compagnon)}
                  onClick={() => handleCompagnonClick(compagnon)}
                  src={`/img/utils/cadre_${compagnon.rarete.toLowerCase()}.png`}
                  alt={compagnon.nom}
                  width={100}
                  height={100}
                  className="absolute hover:cursor-pointer"
                />
                <Image
                  src={`${COMPAGNON_BASE_URL}/${compagnon.image}.png`}
                  alt={compagnon.nom}
                  width={100}
                  height={100}
                />
                <p className="text-sm text-center font-bold">{compagnon.nom}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4 border-l-2 py-4 bg-overlaySide basis-1/2 ">
        <div className="flex flex-col w-full items-center  ">
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
                        <Image src={`/img/utils/${cout[0]}.png`} width={50} height={50} alt="cout" />
                        <p className="absolute top-4 left-5 font-bold text-xl  ">{cout[1]}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="font-black text-2xl">{displayedCompagnon.nom}</p>

              <div className="flex flex-wrap gap-4">
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

        <div className="flex flex-wrap w-full justify-center gap-4 overflow-y-scroll pt-8 h-auto">
          {displayedCompagnon && (
            <>
              {displayedCompagnon.patchs[0].dons.map((don: DonCompagnons, key) => {
                return (
                  <div
                    key={key}
                    className="bg-attribute rounded-lg py-2 w-1/4 px-2 h-auto max-h-64 flex flex-col justify-between hover:cursor-pointer gap-2">
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
