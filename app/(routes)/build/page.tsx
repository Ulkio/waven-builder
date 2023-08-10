"use client";
import Hexagon from "@/components/Hexagon";
import React, { useState } from "react";
import Image from "next/image";
import "react-responsive-modal/styles.css";
import "./modal.css";
import { Modal } from "react-responsive-modal";
import AnneauxDialog from "@/components/modals/AnneauxDialog";
import BrassardsDialog from "@/components/modals/BrassardsDialog";
import CompagnonsDialog from "@/components/modals/CompagnonsDialog";

const Build = () => {
  const squareVariants = `bg-black opacity-60 border-4 border-white border-solid h-24 w-24 lg:w-32 lg:h-32 rounded-xl hover:cursor-pointer`;
  const spellSquareVariants = `bg-black opacity-60 border-2 border-white border-solid h-16 w-16 rounded-lg hover:cursor-pointer`;
  const titleVariants = `uppercase italic font-extrabold text-2xl opacity-80`;
  const [openRingModal, setOpenRingModal] = useState(false);
  const [openArmbandModal, setOpenArmbandModal] = useState(false);
  const [openCompagnonModal, setOpenCompagnonModal] = useState(false);

  const onOpenModalRing = () => setOpenRingModal(true);
  const onOpenModalArmband = () => setOpenArmbandModal(true);
  const onOpenModalCompagnon = () => setOpenCompagnonModal(true);

  const onCloseModalRing = () => setOpenRingModal(false);
  const onCloseModalArmband = () => setOpenArmbandModal(false);
  const onCloseModalCompagnon = () => setOpenCompagnonModal(false);
  return (
    <main className="h-screen">
      <div className="flex flex-col p-12 gap-4 justify-between h-full pt-32">
        <div className="flex">
          <div className="flex flex-col basis-1/6 px-4 ">
            <div className="flex flex-col h-full  items-center ">
              <p className={titleVariants}>Anneaux</p>
              <div className="flex flex-col gap-2 ">
                <div className={squareVariants} onClick={onOpenModalRing}></div>
                <div className={squareVariants} onClick={onOpenModalRing}></div>
                <div className={squareVariants} onClick={onOpenModalRing}></div>
                <div className={squareVariants} onClick={onOpenModalRing}></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col basis-1/6 px-4  ">
            <div className="flex flex-col h-full lg:justify-between  items-center  ">
              <div className="flex flex-col items-center">
                <p className={titleVariants}>Brassard</p>
                <div className={squareVariants} onClick={onOpenModalArmband}></div>
              </div>
              <div className="flex flex-col items-center">
                <p className={titleVariants}>Broche</p>
                <div className={squareVariants}></div>
              </div>
              <div className="flex flex-col items-center">
                <p className={titleVariants}>Familier</p>
                <div className={squareVariants}></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col basis-2/6 px-4 ">
            <div className="flex flex-col h-full w-auto items-center gap-2">
              <Image src="/img/armes/191.png" alt="classe" width={250} height={250} />
              <p className="font-black text-3xl">Classe</p>
              <p className="text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit corrupti aperiam, eveniet deleniti hic.
              </p>
              <div className="flex flex-row items-center gap-8 pt-12">
                <Hexagon content="Passif" size={100} />
                <Hexagon content="Passif" size={100} />
              </div>
            </div>
          </div>
          <div className="flex flex-col basis-2/6 px-4  h-full gap-8">
            <div className="flex flex-col gap-2 px-4">
              <p className={titleVariants}>Compagnons</p>
              <div className="flex flex-row gap-4">
                <Hexagon size={75} onClick={setOpenCompagnonModal} />
                <Hexagon size={75} onClick={setOpenCompagnonModal} />
                <Hexagon size={75} onClick={setOpenCompagnonModal} />
                <Hexagon size={75} onClick={setOpenCompagnonModal} />
              </div>
            </div>
            <div className="flex flex-col gap-2 px-4 ">
              <p className={titleVariants}>Sorts</p>
              <div className="flex flex-wrap gap-2 max-w-96">
                <div className={spellSquareVariants}></div>
                <div className={spellSquareVariants}></div>
                <div className={spellSquareVariants}></div>
                <div className={spellSquareVariants}></div>
                <div className={spellSquareVariants}></div>
                <div className={spellSquareVariants}></div>
                <div className={spellSquareVariants}></div>
                <div className={spellSquareVariants}></div>
                <div className={spellSquareVariants}></div>
                <div className={spellSquareVariants}></div>
                <div className={spellSquareVariants}></div>
                <div className={spellSquareVariants}></div>
                <div className={spellSquareVariants}></div>
                <div className={spellSquareVariants}></div>
                <div className={spellSquareVariants}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 p-8">
          <Hexagon content="Sauvegarder" size={200} />
        </div>
      </div>
      <div>
        <Modal
          open={openRingModal}
          onClose={onCloseModalRing}
          center
          showCloseIcon={false}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <AnneauxDialog />
        </Modal>
        <Modal
          open={openArmbandModal}
          onClose={onCloseModalArmband}
          center
          showCloseIcon={false}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <BrassardsDialog />
        </Modal>
        <Modal
          open={openCompagnonModal}
          onClose={onCloseModalCompagnon}
          center
          showCloseIcon={false}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <CompagnonsDialog />
        </Modal>
      </div>
    </main>
  );
};

export default Build;
