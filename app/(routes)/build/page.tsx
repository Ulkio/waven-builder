"use client";
import Hexagon from "@/components/Hexagon";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "react-responsive-modal/styles.css";
import "./modal.css";
import { Modal } from "react-responsive-modal";
import AnneauxDialog from "@/components/modals/AnneauxDialog";
import BrassardsDialog from "@/components/modals/BrassardsDialog";
import CompagnonsDialog from "@/components/modals/CompagnonsDialog";
import ArmesDialog from "@/components/modals/ArmesDialog";
import { Anneau, Arme, Brassard, Compagnon, Sort } from "@/types";

const Build = () => {
  ////////////////////////////////TODO////////////////////////////////
  // Afficher les stats de la classe sous le nom
  // Sorts dans le json
  // Sorts modal
  // Sorts handlers
  // Sauvegarder

  // STYLE VARIANTS
  const squareVariants = `bg-black bg-opacity-60  border-4 border-white border-solid h-24 w-24 lg:w-32 lg:h-32 rounded-xl hover:cursor-pointer`;
  const companionSquareVariants = `h-24 w-24 lg:w-32 lg:h-32 hover:cursor-pointer`;
  const spellSquareVariants = `bg-black opacity-60 border-2 border-white border-solid h-16 w-16 rounded-lg hover:cursor-pointer`;
  const titleVariants = `uppercase italic font-extrabold text-2xl opacity-80`;

  //#region STATES
  const [selectedArme, setSelectedArme] = useState<Arme | null>(null);
  const [selectedAnneau1, setSelectedAnneau1] = useState<Anneau | null>(null);
  const [selectedAnneau2, setSelectedAnneau2] = useState<Anneau | null>(null);
  const [selectedAnneau3, setSelectedAnneau3] = useState<Anneau | null>(null);
  const [selectedAnneau4, setSelectedAnneau4] = useState<Anneau | null>(null);
  const [selectedBrassard, setSelectedBrassard] = useState<Brassard | null>(null);
  const [selectedCompagnon1, setSelectedCompagnon1] = useState<Compagnon | null>(null);
  const [selectedCompagnon2, setSelectedCompagnon2] = useState<Compagnon | null>(null);
  const [selectedCompagnon3, setSelectedCompagnon3] = useState<Compagnon | null>(null);
  const [selectedCompagnon4, setSelectedCompagnon4] = useState<Compagnon | null>(null);
  const [selectedSort, setSelectedSort] = useState<Sort | null>(null);

  const ARME_BASE_URL = "/img/armes";
  const ANNEAU_BASE_URL = "/img/anneaux";
  const BRASSARD_BASE_URL = "/img/brassards";
  const COMPAGNON_BASE_URL = "/img/compagnons";
  const SORT_BASE_URL = "/img/sorts";
  //#endregion

  //#region MODAL
  const [openAnneau1Modal, setOpenAnneau1Modal] = useState(false);
  const [openAnneau2Modal, setOpenAnneau2Modal] = useState(false);
  const [openAnneau3Modal, setOpenAnneau3Modal] = useState(false);
  const [openAnneau4Modal, setOpenAnneau4Modal] = useState(false);
  const [openCompagnon1Modal, setOpenCompagnon1Modal] = useState(false);
  const [openCompagnon2Modal, setOpenCompagnon2Modal] = useState(false);
  const [openCompagnon3Modal, setOpenCompagnon3Modal] = useState(false);
  const [openCompagnon4Modal, setOpenCompagnon4Modal] = useState(false);
  const [openBrassardModal, setOpenBrassardModal] = useState(false);
  const [openArmeModal, setOpenArmeModal] = useState(false);
  const [openSortModal, setOpenSortModal] = useState(false);

  const onOpenModalAnneau1 = () => setOpenAnneau1Modal(true);
  const onOpenModalAnneau2 = () => setOpenAnneau2Modal(true);
  const onOpenModalAnneau3 = () => setOpenAnneau3Modal(true);
  const onOpenModalAnneau4 = () => setOpenAnneau4Modal(true);
  const onOpenModalCompagnon1 = () => setOpenCompagnon1Modal(true);
  const onOpenModalCompagnon2 = () => setOpenCompagnon2Modal(true);
  const onOpenModalCompagnon3 = () => setOpenCompagnon3Modal(true);
  const onOpenModalCompagnon4 = () => setOpenCompagnon4Modal(true);
  const onOpenModalBrassard = () => setOpenBrassardModal(true);
  const onOpenModalArmes = () => setOpenArmeModal(true);
  const onOpenModalSort = () => setOpenSortModal(true);

  const onCloseModalAnneau = () => {
    setOpenAnneau1Modal(false);
    setOpenAnneau2Modal(false);
    setOpenAnneau3Modal(false);
    setOpenAnneau4Modal(false);
  };
  const onCloseModalBrassard = () => setOpenBrassardModal(false);
  const onCloseModalCompagnon = () => {
    setOpenCompagnon1Modal(false);
    setOpenCompagnon2Modal(false);
    setOpenCompagnon3Modal(false);
    setOpenCompagnon4Modal(false);
  };
  const onCloseModalArme = () => setOpenArmeModal(false);
  const onCloseModalSort = () => setOpenSortModal(false);
  //#endregion

  //#region FUNCTIONS
  const handleSelectedAnneau1Change = (selectedAnneau: Anneau) => {
    setSelectedAnneau1(selectedAnneau);
  };
  const handleSelectedAnneau2Change = (selectedAnneau: Anneau) => {
    setSelectedAnneau2(selectedAnneau);
  };
  const handleSelectedAnneau3Change = (selectedAnneau: Anneau) => {
    setSelectedAnneau3(selectedAnneau);
  };
  const handleSelectedAnneau4Change = (selectedAnneau: Anneau) => {
    setSelectedAnneau4(selectedAnneau);
  };
  const handleSelectedBrassardChange = (selectedBrassard: Brassard) => {
    setSelectedBrassard(selectedBrassard);
  };
  const handleSelectedCompagnon1Change = (selectedCompagnon: Compagnon) => {
    setSelectedCompagnon1(selectedCompagnon);
  };
  const handleSelectedCompagnon2Change = (selectedCompagnon: Compagnon) => {
    setSelectedCompagnon2(selectedCompagnon);
  };
  const handleSelectedCompagnon3Change = (selectedCompagnon: Compagnon) => {
    setSelectedCompagnon3(selectedCompagnon);
  };
  const handleSelectedCompagnon4Change = (selectedCompagnon: Compagnon) => {
    setSelectedCompagnon4(selectedCompagnon);
  };
  const handleSelectedArmeChange = (selectedArme: Arme) => {
    setSelectedArme(selectedArme);
  };
  const handleSelectedSortChange = (selectedSort: Sort) => {
    setSelectedSort(selectedSort);
  };
  const handleClickAnneau = () => {
    onCloseModalAnneau();
  };
  const handleClickBrassard = () => {
    onCloseModalBrassard();
  };
  const handleClickCompagnon = () => {
    onCloseModalCompagnon();
  };
  const handleClickArme = () => {
    onCloseModalArme();
  };
  const handleClickSort = () => {
    onCloseModalSort();
  };
  //#endregion

  // USEEFFECTS

  return (
    <main className="h-screen">
      <div className="flex flex-col p-12 gap-4 justify-between h-full pt-32">
        <div className="flex">
          <div className="flex flex-col basis-1/6 px-4 ">
            <div className="flex flex-col h-full  items-center ">
              <p className={titleVariants}>Anneau</p>
              <div className="flex flex-col gap-2 ">
                <div className={squareVariants} onClick={onOpenModalAnneau1}>
                  {selectedAnneau1 && (
                    <Image
                      src={`${ANNEAU_BASE_URL}/${selectedAnneau1.image}.png`}
                      width={200}
                      height={200}
                      alt={`${selectedAnneau1.nom}`}
                    />
                  )}
                </div>
                <div className={squareVariants} onClick={onOpenModalAnneau2}>
                  {selectedAnneau2 && (
                    <Image
                      src={`${ANNEAU_BASE_URL}/${selectedAnneau2.image}.png`}
                      width={200}
                      height={200}
                      alt={`${selectedAnneau2.nom}`}
                    />
                  )}
                </div>
                <div className={squareVariants} onClick={onOpenModalAnneau3}>
                  {selectedAnneau3 && (
                    <Image
                      src={`${ANNEAU_BASE_URL}/${selectedAnneau3.image}.png`}
                      width={200}
                      height={200}
                      alt={`${selectedAnneau3.nom}`}
                    />
                  )}
                </div>
                <div className={squareVariants} onClick={onOpenModalAnneau4}>
                  {selectedAnneau4 && (
                    <Image
                      src={`${ANNEAU_BASE_URL}/${selectedAnneau4.image}.png`}
                      width={200}
                      height={200}
                      alt={`${selectedAnneau4.nom}`}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col basis-1/6 px-4  ">
            <div className="flex flex-col h-full lg:justify-between  items-center  ">
              <div className="flex flex-col items-center">
                <p className={titleVariants}>Brassard</p>
                <div className={squareVariants} onClick={onOpenModalBrassard}>
                  {selectedBrassard && (
                    <Image
                      src={`${BRASSARD_BASE_URL}/${selectedBrassard.image}.png`}
                      width={200}
                      height={200}
                      alt={`${selectedBrassard.nom}`}
                    />
                  )}
                </div>
              </div>
              {/* <div className="flex flex-col items-center">
                <p className={titleVariants}>Broche</p>
                <div className={squareVariants}></div>
              </div>
              <div className="flex flex-col items-center">
                <p className={titleVariants}>Familier</p>
                <div className={squareVariants}></div>
              </div> */}
            </div>
          </div>
          <div className="flex flex-col basis-2/6 px-4 ">
            <div className="flex flex-col h-full w-auto items-center gap-2">
              {selectedArme ? (
                <>
                  <Image
                    src={`${ARME_BASE_URL}/${selectedArme?.image}.png`}
                    alt="classe"
                    width={200}
                    height={200}
                    onClick={onOpenModalArmes}
                    className="hover:cursor-pointer"
                  />
                  <p className="font-black text-3xl">{selectedArme?.nom}</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
                      <Image src="/img/utils/pv.png" width={30} height={30} alt="pv" />
                      <p>{selectedArme.patchs[0].pv}</p>
                    </div>
                    <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
                      <Image src="/img/utils/at.png" width={30} height={30} alt="pv" />
                      <p>{selectedArme.patchs[0].at}</p>
                    </div>
                    <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
                      <Image src="/img/utils/cc.png" width={30} height={30} alt="pv" />
                      <p>{selectedArme.patchs[0].cc}</p>
                    </div>
                    <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
                      <Image src="/img/utils/pm.png" width={30} height={30} alt="pv" />
                      <p>{selectedArme.patchs[0].pm}</p>
                    </div>
                  </div>
                  <p className="text-center">{selectedArme?.patchs[0].effet}</p>
                  <div className="flex flex-row items-center gap-8 pt-12">
                    <Hexagon content="(wip)" size={100} />
                    <Hexagon content="(wip)" size={100} />
                  </div>
                </>
              ) : (
                <Hexagon onClick={onOpenModalArmes} content="Choisis une classe" size={200} />
              )}
            </div>
          </div>
          <div className="flex flex-col basis-2/6 px-4  h-full gap-8">
            <div className="flex flex-col gap-2 px-4">
              <p className={titleVariants}>Compagnons</p>
              <div className="flex flex-row gap-4">
                <div
                  className={`${selectedCompagnon1 ? companionSquareVariants : squareVariants}`}
                  onClick={onOpenModalCompagnon1}>
                  {selectedCompagnon1 && (
                    <Image
                      src={`${COMPAGNON_BASE_URL}/${selectedCompagnon1.image}.png`}
                      width={300}
                      height={300}
                      alt={`${selectedCompagnon1.nom}`}
                    />
                  )}
                </div>
                <div
                  className={`${selectedCompagnon2 ? companionSquareVariants : squareVariants}`}
                  onClick={onOpenModalCompagnon2}>
                  {selectedCompagnon2 && (
                    <Image
                      src={`${COMPAGNON_BASE_URL}/${selectedCompagnon2.image}.png`}
                      width={300}
                      height={300}
                      alt={`${selectedCompagnon2.nom}`}
                    />
                  )}
                </div>
                <div
                  className={`${selectedCompagnon3 ? companionSquareVariants : squareVariants}`}
                  onClick={onOpenModalCompagnon3}>
                  {selectedCompagnon3 && (
                    <Image
                      src={`${COMPAGNON_BASE_URL}/${selectedCompagnon3.image}.png`}
                      width={300}
                      height={300}
                      alt={`${selectedCompagnon3.nom}`}
                    />
                  )}
                </div>
                <div
                  className={`${selectedCompagnon4 ? companionSquareVariants : squareVariants}`}
                  onClick={onOpenModalCompagnon4}>
                  {selectedCompagnon4 && (
                    <Image
                      src={`${COMPAGNON_BASE_URL}/${selectedCompagnon4.image}.png`}
                      width={300}
                      height={300}
                      alt={`${selectedCompagnon4.nom}`}
                    />
                  )}
                </div>
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
          <Hexagon content="Sauvegarder(wip)" size={200} />
        </div>
      </div>
      <div>
        <Modal
          open={openArmeModal}
          onClose={onCloseModalArme}
          center
          showCloseIcon={false}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <ArmesDialog onClickArme={handleClickArme} onSelectedArmeChange={handleSelectedArmeChange} />
        </Modal>
        <Modal
          open={openAnneau1Modal}
          onClose={onCloseModalAnneau}
          center
          showCloseIcon={false}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <AnneauxDialog onClickAnneau={handleClickAnneau} onSelectedAnneauChange={handleSelectedAnneau1Change} />
        </Modal>
        <Modal
          open={openAnneau2Modal}
          onClose={onCloseModalAnneau}
          center
          showCloseIcon={false}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <AnneauxDialog onClickAnneau={handleClickAnneau} onSelectedAnneauChange={handleSelectedAnneau2Change} />
        </Modal>
        <Modal
          open={openAnneau3Modal}
          onClose={onCloseModalAnneau}
          center
          showCloseIcon={false}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <AnneauxDialog onClickAnneau={handleClickAnneau} onSelectedAnneauChange={handleSelectedAnneau3Change} />
        </Modal>
        <Modal
          open={openAnneau4Modal}
          onClose={onCloseModalAnneau}
          center
          showCloseIcon={false}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <AnneauxDialog onClickAnneau={handleClickAnneau} onSelectedAnneauChange={handleSelectedAnneau4Change} />
        </Modal>
        <Modal
          open={openBrassardModal}
          onClose={onCloseModalBrassard}
          center
          showCloseIcon={false}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <BrassardsDialog
            onClickBrassard={handleClickBrassard}
            onSelectedBrassardChange={handleSelectedBrassardChange}
          />
        </Modal>
        <Modal
          open={openCompagnon1Modal}
          onClose={onCloseModalCompagnon}
          center
          showCloseIcon={false}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <CompagnonsDialog
            onClickCompagnon={handleClickCompagnon}
            onSelectedCompagnonChange={handleSelectedCompagnon1Change}
          />
        </Modal>
        <Modal
          open={openCompagnon2Modal}
          onClose={onCloseModalCompagnon}
          center
          showCloseIcon={false}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <CompagnonsDialog
            onClickCompagnon={handleClickCompagnon}
            onSelectedCompagnonChange={handleSelectedCompagnon2Change}
          />
        </Modal>
        <Modal
          open={openCompagnon3Modal}
          onClose={onCloseModalCompagnon}
          center
          showCloseIcon={false}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <CompagnonsDialog
            onClickCompagnon={handleClickCompagnon}
            onSelectedCompagnonChange={handleSelectedCompagnon3Change}
          />
        </Modal>
        <Modal
          open={openCompagnon4Modal}
          onClose={onCloseModalCompagnon}
          center
          showCloseIcon={false}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <CompagnonsDialog
            onClickCompagnon={handleClickCompagnon}
            onSelectedCompagnonChange={handleSelectedCompagnon4Change}
          />
        </Modal>
      </div>
    </main>
  );
};

export default Build;
