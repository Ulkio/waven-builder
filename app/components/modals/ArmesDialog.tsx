"use client";
import React, { useState, useEffect } from "react";
import data from "@/api/data.json";
import { Arme } from "@/types/index.ts";
import Weapon from "@/components/Weapon.tsx";

interface ArmesDialogProps {
  onSelectedArmeChange: (selectedArme: Arme) => void;
  onClickArme: () => void;
}

const ArmesDialog = ({ onSelectedArmeChange, onClickArme }: ArmesDialogProps) => {
  const armes: Arme[] = data.armes.armes;
  const weaponCategories = [
    { category: "Crâ", filter: "crâ" },
    { category: "Xélor", filter: "xélor" },
    { category: "Eniripsa", filter: "eniripsa" },
    { category: "Iop", filter: "iop" },
    { category: "Osamodas", filter: "osamodas" },
    { category: "Sacrieur", filter: "sacrieur" },
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
    <div className="flex flex-wrap justify-center h-full px-8 gap-4 py-4">
      <h2 className="text-center w-full font-extrabold text-3xl">Arme</h2>
      {weaponCategories.map((weaponCategory) => (
        <div className="flex flex-col" key={weaponCategory.category}>
          <p className="text-2xl font-extrabold italic text-center">{weaponCategory.category}</p>
          <div className="flex flex-wrap justify-center gap-2 bg-overlaySide rounded-lg">
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
