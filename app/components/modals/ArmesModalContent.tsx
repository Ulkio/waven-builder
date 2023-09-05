"use client";
import React, { useState, useEffect } from "react";
import data from "@/api/data.json";
import { Arme } from "@/types/index.ts";
import Weapon from "@/components/Weapon.tsx";

interface ArmesDialogProps {
  onSelectedArmeChange: (selectedArme: Arme) => void;
  onClickArme: () => void;
}

const ArmesDialog = ({
  onSelectedArmeChange,
  onClickArme,
}: ArmesDialogProps) => {
  const armes: Arme[] = data.armes.armes;
  const weaponCategories = [
    { category: "Crâ", filter: "crâ" },
    { category: "Xélor", filter: "xélor" },
    { category: "Eniripsa", filter: "eniripsa" },
    { category: "Iop", filter: "iop" },
    // { category: "Osamodas", filter: "osamodas" },
    // { category: "Sacrieur", filter: "sacrieur" },
    { category: "Sram", filter: "sram" },
  ];

  const [selectedArme, setSelectedArme] = useState<Arme | null>(null);
  const [displayedArme, setDisplayedArme] = useState<Arme | null>(null);

  const handleArmeClick = (arme: Arme) => {
    setSelectedArme(arme);
    onSelectedArmeChange(arme);
    onClickArme();
  };
  return (
    <div className="flex flex-wrap justify-center  gap-4 px-8 py-4">
      <h2 className="w-full text-center text-3xl font-extrabold">Armes</h2>
      {weaponCategories.map((weaponCategory) => (
        <div
          className="flex w-full flex-col gap-2"
          key={weaponCategory.category}
        >
          <p className="text-center text-2xl font-extrabold italic">
            {weaponCategory.category}
          </p>
          <div className="flex flex-wrap justify-evenly rounded-lg bg-overlaySide p-8">
            {armes
              .filter((arme) => arme.dieu === weaponCategory.filter)
              .map((arme) => (
                <Weapon
                  key={arme.nom}
                  arme={arme}
                  onClick={() => handleArmeClick(arme)}
                  onMouseEnter={() => setDisplayedArme(arme)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArmesDialog;
