"use client";
import Hexagon from "@/components/Hexagon";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "react-responsive-modal/styles.css";
import "../../styles/modal.css";
import { Modal } from "react-responsive-modal";
import AnneauxDialog from "@/components/modals/AnneauxDialog";
import BrassardsDialog from "@/components/modals/BrassardsDialog";
import CompagnonsDialog from "@/components/modals/CompagnonsDialog";
import ArmesDialog from "@/components/modals/ArmesDialog";
import { Anneau, Arme, Brassard, Compagnon, Build, Sort, Compagnons, Sorts, Armes, Anneaux } from "@/types";
import { AES, enc } from "crypto-js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StringBuildDialog from "@/components/modals/StringBuildDialog";
import Link from "next/link";

const Build = () => {
  ////////////////////////////////TODO////////////////////////////////
  // Sorts modal
  // Sorts handlers
  // dons, afficher dons a coté des items/sous le build?
  // image optimizisation (skeleton, moins d'images par row...)

  const buildKey = "importKey";

  //#region STATES
  const [build, setBuild] = useState<Build>({
    compagnons: [],
    anneaux: [],
    brassard: null,
    sorts: [],
    arme: null,
  });
  const [encryptedBuild, setEncryptedBuild] = useState("");
  //#endregion

  //#region STYLE VARIANTS
  const squareVariants = `bg-black bg-opacity-60  border-4 border-white border-solid h-24 w-24 lg:w-32 lg:h-32 rounded-xl hover:cursor-pointer`;
  const companionSquareVariants = `h-24 w-24  hover:cursor-pointer`;
  const spellSquareVariants = `bg-black opacity-60 border-2 border-white border-solid h-16 w-16 rounded-lg hover:cursor-pointer`;
  const titleVariants = `uppercase italic font-extrabold text-2xl opacity-80`;
  const emptyCompanionVariants = `h-24 bg-[url("/img/utils/cadre_commun.png")]`;
  //#endregion

  //#region URLs
  const ARME_BASE_URL = "/img/armes";
  const ANNEAU_BASE_URL = "/img/anneaux";
  const BRASSARD_BASE_URL = "/img/brassards";
  const COMPAGNON_BASE_URL = "/img/compagnons";
  const SORT_BASE_URL = "/img/sorts";
  //#endregion

  //#region SELECTABLES
  const [selectedArme, setSelectedArme] = useState<Arme | null>(null);
  const handleSelectedArmeChange = (selectedArme: Arme) => {
    setSelectedArme(selectedArme);
  };
  const [selectedBrassard, setSelectedBrassard] = useState<Brassard | null>(null);
  const handleSelectedBrassardChange = (selectedBrassard: Brassard) => {
    setSelectedBrassard(selectedBrassard);
  };
  const [selectedCompagnon1, setSelectedCompagnon1] = useState<Compagnon | null>(null);
  const handleSelectedCompagnon1Change = (selected: Compagnon) => {
    setSelectedCompagnon1(selected);
  };

  const [selectedCompagnon2, setSelectedCompagnon2] = useState<Compagnon | null>(null);
  const handleSelectedCompagnon2Change = (selected: Compagnon) => {
    setSelectedCompagnon2(selected);
  };

  const [selectedCompagnon3, setSelectedCompagnon3] = useState<Compagnon | null>(null);
  const handleSelectedCompagnon3Change = (selected: Compagnon) => {
    setSelectedCompagnon3(selected);
  };

  const [selectedCompagnon4, setSelectedCompagnon4] = useState<Compagnon | null>(null);
  const handleSelectedCompagnon4Change = (selected: Compagnon) => {
    setSelectedCompagnon4(selected);
  };
  const [selectedAnneau1, setSelectedAnneau1] = useState<Anneau | null>(null);
  const handleSelectedAnneau1Change = (selected: Anneau) => {
    setSelectedAnneau1(selected);
  };
  const [selectedAnneau2, setSelectedAnneau2] = useState<Anneau | null>(null);
  const handleSelectedAnneau2Change = (selected: Anneau) => {
    setSelectedAnneau2(selected);
  };

  const [selectedAnneau3, setSelectedAnneau3] = useState<Anneau | null>(null);
  const handleSelectedAnneau3Change = (selected: Anneau) => {
    setSelectedAnneau3(selected);
  };

  const [selectedAnneau4, setSelectedAnneau4] = useState<Anneau | null>(null);
  const handleSelectedAnneau4Change = (selected: Anneau) => {
    setSelectedAnneau4(selected);
  };

  //#endregion

  //#region MODAL
  const [openModalStringBuild, setOpenModalStringBuild] = useState<boolean>(false);
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

  const handleClickAnneau = () => {
    // onCloseModalAnneau();
  };
  const handleClickBrassard = () => {
    // onCloseModalBrassard();
  };
  const handleClickCompagnon = () => {
    // onCloseModalCompagnon();
  };
  const handleClickArme = () => {
    // onCloseModalArme();
  };
  const handleClickSort = () => {
    // onCloseModalSort();
  };
  const closeModalStringBuild = () => {
    setOpenModalStringBuild(false);
  };
  //#endregion

  //#region FUNCTIONS
  const handleClickSaveBuild = () => {
    setOpenModalStringBuild(true);
    const compagnonsArray = [
      selectedCompagnon1,
      selectedCompagnon2,
      selectedCompagnon3,
      selectedCompagnon4,
    ] as Compagnon[];
    const AnneauxArray = [selectedAnneau1, selectedAnneau2, selectedAnneau3, selectedAnneau4] as Anneau[];
    setBuild({
      arme: selectedArme,
      anneaux: AnneauxArray,
      brassard: selectedBrassard,
      compagnons: compagnonsArray,
      sorts: [],
    });
  };

  //#endregion

  // USEEFFECTS
  useEffect(() => {
    if (build.arme) {
      const stringBuild = JSON.stringify(build);
      const encrypted = AES.encrypt(stringBuild, buildKey).toString();
      setEncryptedBuild(encrypted);
    }
  }, [build]);

  return (
    <main className="h-screen">
      <Link href="/">
        <Image
          width={50}
          height={50}
          src="/img/left-arrow.png"
          alt="long-arrow-left"
          className="absolute top-2 left-20 invert"
        />
      </Link>
      <div className="flex  xl:flex-col xl:px-12 gap-4 justify-between xl:h-full pt-16 xl:pt-32">
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-0">
          <div className="flex xl:flex-col xl:basis-1/6 px-4">
            <div className="flex flex-col xl:h-full justify-center  items-center w-full">
              <p className={titleVariants}>Anneaux</p>
              <div className="flex xl:flex-col gap-2 ">
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
          <div className="flex xl:flex-col justify-between">
            <div className="flex xl:flex-col xl:basis-1/6  h-full w-full ">
              <div className="flex flex-col xl:h-full  justify-center  items-center w-full">
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
            </div>
            <div className="flex flex-col xl:h-full justify-center  items-center w-full">
              <p className={titleVariants}>Bientôt</p>
              <div className={squareVariants}></div>
            </div>
            <div className="flex flex-col xl:h-full justify-center  items-center w-full">
              <p className={titleVariants}>Bientôt</p>
              <div className={squareVariants}></div>
            </div>
          </div>
          <div className="flex flex-col xl:basis-2/6 px-4 ">
            <div className="flex flex-col xl:h-full w-auto items-center gap-2">
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
          <div className="flex flex-col xl:basis-2/6 px-4  xl:h-full gap-8">
            <div className="flex flex-col gap-2 px-4 items-center xl:items-start">
              <p className={titleVariants}>Compagnons</p>
              <div className="flex flex-row gap-4 justify-center">
                <div
                  className={`bg-contain h-28 w-28 hover:cursor-pointer ${
                    selectedCompagnon1 ? companionSquareVariants : emptyCompanionVariants
                  }`}
                  onClick={onOpenModalCompagnon1}>
                  {selectedCompagnon1 && (
                    <div className="flex items-center relative">
                      <Image
                        src={`/img/utils/cadre_${selectedCompagnon1.rarete.toLowerCase()}.png`}
                        alt={selectedCompagnon1.rarete.toLowerCase()}
                        width={200}
                        height={200}
                        className="absolute"
                      />
                      <Image
                        src={`${COMPAGNON_BASE_URL}/${selectedCompagnon1.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedCompagnon1.nom}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={`bg-contain h-28 w-28 hover:cursor-pointer ${
                    selectedCompagnon2 ? companionSquareVariants : emptyCompanionVariants
                  }`}
                  onClick={onOpenModalCompagnon2}>
                  {selectedCompagnon2 && (
                    <div className="flex items-center relative">
                      <Image
                        src={`/img/utils/cadre_${selectedCompagnon2.rarete.toLowerCase()}.png`}
                        alt={selectedCompagnon2.nom}
                        width={200}
                        height={200}
                        className="absolute"
                      />
                      <Image
                        src={`${COMPAGNON_BASE_URL}/${selectedCompagnon2.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedCompagnon2.nom}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={`bg-contain h-28 w-28 hover:cursor-pointer ${
                    selectedCompagnon3 ? companionSquareVariants : emptyCompanionVariants
                  }`}
                  onClick={onOpenModalCompagnon3}>
                  {selectedCompagnon3 && (
                    <div className="flex items-center relative">
                      <Image
                        src={`/img/utils/cadre_${selectedCompagnon3.rarete.toLowerCase()}.png`}
                        alt={selectedCompagnon3.nom}
                        width={200}
                        height={200}
                        className="absolute"
                      />
                      <Image
                        src={`${COMPAGNON_BASE_URL}/${selectedCompagnon3.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedCompagnon3.nom}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={`bg-contain h-28 w-28 hover:cursor-pointer ${
                    selectedCompagnon4 ? companionSquareVariants : emptyCompanionVariants
                  }`}
                  onClick={onOpenModalCompagnon4}>
                  {selectedCompagnon4 && (
                    <div className="flex items-center relative">
                      <Image
                        src={`/img/utils/cadre_${selectedCompagnon4.rarete.toLowerCase()}.png`}
                        alt={selectedCompagnon4.nom}
                        width={200}
                        height={200}
                        className="absolute"
                      />
                      <Image
                        src={`${COMPAGNON_BASE_URL}/${selectedCompagnon4.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedCompagnon4.nom}
                      />
                    </div>
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
      </div>

      <div onClick={handleClickSaveBuild} className="xl:absolute xl:right-0 xl:bottom-0 py-4  xl:p-8">
        <p className="font-bold text-2xl">Sauvegarder</p>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          theme="dark"
        />
      </div>
      <div className="xl:absolute xl:left-0 xl:bottom-0 p-8">
        <Link href="import-build">
          <p className="font-bold text-2xl">Importer</p>
        </Link>
      </div>
      <div>
        <Modal
          open={!!openModalStringBuild}
          onClose={closeModalStringBuild}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          classNames={{
            overlay: "customOverlay",
            modal: "customModalImport",
            root: "scrollbar-none",
          }}>
          <StringBuildDialog stringBuild={encryptedBuild} />
        </Modal>
        <Modal
          open={openArmeModal}
          onClose={onCloseModalArme}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
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
          closeOnOverlayClick={false}
          showCloseIcon={true}
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
          closeOnOverlayClick={false}
          showCloseIcon={true}
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
          closeOnOverlayClick={false}
          showCloseIcon={true}
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
          closeOnOverlayClick={false}
          showCloseIcon={true}
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
          closeOnOverlayClick={false}
          showCloseIcon={true}
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
          closeOnOverlayClick={false}
          showCloseIcon={true}
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
          closeOnOverlayClick={false}
          showCloseIcon={true}
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
          closeOnOverlayClick={false}
          showCloseIcon={true}
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
          closeOnOverlayClick={false}
          showCloseIcon={true}
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
