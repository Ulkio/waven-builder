"use client";
import React, { useState, useEffect } from "react";
import data from "@/api/data.json";
import { Arme } from "@/types/index.ts";
import Weapon from "@/components/Weapon.tsx";
import "react-tooltip/dist/react-tooltip.css";

interface ArmesDialogProps {
  onSelectedArmeChange: (selectedArme: Arme) => void;
  onClickArme: () => void;
}

const ArmesDialog = ({ onSelectedArmeChange, onClickArme }: ArmesDialogProps) => {
  const armes: Arme[] = data.armes.armes;
  const armesCra = armes.filter((arme) => arme.dieu === "crâ");
  const armesEniripsa = armes.filter((arme) => arme.dieu === "eniripsa");
  const armesIop = armes.filter((arme) => arme.dieu === "iop");
  const armesOsamodas = armes.filter((arme) => arme.dieu === "osamodas");
  const armesSacrieur = armes.filter((arme) => arme.dieu === "sacrieur");
  const armesSram = armes.filter((arme) => arme.dieu === "sram");
  const armesXelor = armes.filter((arme) => arme.dieu === "xélor");

  const [selectedArme, setSelectedArme] = useState<Arme | null>(null);
  const [displayedArme, setDisplayedArme] = useState<Arme | null>(null);

  const handleArmeClick = (arme: Arme) => {
    setSelectedArme(arme);
    onSelectedArmeChange(arme);
    onClickArme();
  };
  return (
    <div className="flex flex-wrap justify-center h-[90vh] px-8 gap-4">
      <h2 className="text-center w-full font-extrabold text-3xl">Arme</h2>
      <div className="flex flex-col">
        <p className="text-2xl font-extrabold italic text-center">Crâ</p>
        <div className="flex gap-2 bg-overlaySide rounded-lg ">
          {armesCra.map((arme) => {
            return (
              <Weapon
                key={arme.nom}
                arme={arme}
                onClick={() => handleArmeClick(arme)}
                onMouseEnter={() => setDisplayedArme(arme)}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-extrabold italic text-center">Xélor</p>
        <div className="flex gap-2 bg-overlaySide rounded-lg">
          {armesXelor.map((arme) => {
            return (
              <Weapon
                key={arme.nom}
                arme={arme}
                onClick={() => handleArmeClick(arme)}
                onMouseEnter={() => setDisplayedArme(arme)}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-extrabold italic text-center">Eniripsa</p>
        <div className="flex gap-2 bg-overlaySide rounded-lg">
          {armesEniripsa.map((arme) => {
            return (
              <Weapon
                key={arme.nom}
                arme={arme}
                onClick={() => handleArmeClick(arme)}
                onMouseEnter={() => setDisplayedArme(arme)}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-extrabold italic text-center">Iop</p>
        <div className="flex gap-2 bg-overlaySide rounded-lg">
          {armesIop.map((arme) => {
            return (
              <Weapon
                key={arme.nom}
                arme={arme}
                onClick={() => handleArmeClick(arme)}
                onMouseEnter={() => setDisplayedArme(arme)}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-extrabold italic text-center">Osamodas</p>
        <div className="flex gap-2 bg-overlaySide rounded-lg">
          {armesOsamodas.map((arme) => {
            return (
              <Weapon
                key={arme.nom}
                arme={arme}
                onClick={() => handleArmeClick(arme)}
                onMouseEnter={() => setDisplayedArme(arme)}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-extrabold italic text-center">Sacrieur</p>
        <div className="flex gap-2 bg-overlaySide rounded-lg">
          {armesSacrieur.map((arme) => {
            return (
              <Weapon
                key={arme.nom}
                arme={arme}
                onClick={() => handleArmeClick(arme)}
                onMouseEnter={() => setDisplayedArme(arme)}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-extrabold italic text-center">Sram</p>
        <div className="flex gap-2 bg-overlaySide rounded-lg">
          {armesSram.map((arme) => {
            return (
              <Weapon
                key={arme.nom}
                arme={arme}
                onClick={() => handleArmeClick(arme)}
                onMouseEnter={() => setDisplayedArme(arme)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArmesDialog;
