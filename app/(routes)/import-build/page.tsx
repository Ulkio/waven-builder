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
import ImportModal from "@/components/modals/ImportDialog";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import StringBuildDialog from "@/components/modals/StringBuildDialog";

const ImportedBuild = () => {
  ////////////////////////////////TODO////////////////////////////////
  // Sorts modal
  // Sorts handlers
  const buildKey = "importKey";

  //#region STATES
  const [build, setBuild] = useState<Build>({
    compagnons: [],
    anneaux: [],
    brassard: null,
    sorts: [],
    arme: null,
  });
  const [stringBuild, setStringBuild] = useState("");
  const [encryptedBuild, setEncryptedBuild] = useState("");
  //#endregion
  //#region STYLE VARIANTS
  const squareVariants = `bg-black bg-opacity-60  border-4 border-white border-solid h-24 w-24 lg:w-32 lg:h-32 rounded-xl hover:cursor-pointer`;
  const companionSquareVariants = `h-24 w-24  hover:cursor-pointer`;
  const spellSquareVariants = `bg-black opacity-60 border-2 border-white border-solid h-16 w-16 rounded-lg hover:cursor-pointer`;
  const titleVariants = `uppercase italic font-extrabold text-2xl opacity-80 text-white`;
  const emptyCompanionVariants = `bg-[url("/img/utils/cadre_commun.png")]`;
  //#endregion

  //#region URLs
  const ARME_BASE_URL = "/img/armes";
  const ANNEAU_BASE_URL = "/img/anneaux";
  const BRASSARD_BASE_URL = "/img/brassards";
  const COMPAGNON_BASE_URL = "/img/compagnons";
  const SORT_BASE_URL = "/img/sorts";
  //#endregion

  //#region SELECTABLES
  //#region SELECTABLES
  const [selectedArme, setSelectedArme] = useState<Arme | null>(null);
  const handleSelectedArmeChange = (selectedArme: Arme) => {
    setSelectedArme(selectedArme);
    setBuild((prev) => ({ ...prev, arme: selectedArme }));
  };
  const [selectedBrassard, setSelectedBrassard] = useState<Brassard | null>(null);
  const handleSelectedBrassardChange = (selectedBrassard: Brassard) => {
    setSelectedBrassard(selectedBrassard);
    setBuild((prev) => ({ ...prev, brassard: selectedBrassard }));
  };
  const [selectedCompagnon1, setSelectedCompagnon1] = useState<Compagnon | null>(null);
  const handleSelectedCompagnon1Change = (selected: Compagnon) => {
    setSelectedCompagnon1(selected);
    setBuild((prev) => ({
      ...prev,
      compagnons: [selected, prev.compagnons[1], prev.compagnons[2], prev.compagnons[3]],
    }));
  };

  const [selectedCompagnon2, setSelectedCompagnon2] = useState<Compagnon | null>(null);
  const handleSelectedCompagnon2Change = (selected: Compagnon) => {
    setSelectedCompagnon2(selected);
    setBuild((prev) => ({
      ...prev,
      compagnons: [prev.compagnons[0], selected, prev.compagnons[2], prev.compagnons[3]],
    }));
  };

  const [selectedCompagnon3, setSelectedCompagnon3] = useState<Compagnon | null>(null);
  const handleSelectedCompagnon3Change = (selected: Compagnon) => {
    setSelectedCompagnon3(selected);
    setBuild((prev) => ({
      ...prev,
      compagnons: [prev.compagnons[0], prev.compagnons[1], selected, prev.compagnons[3]],
    }));
  };

  const [selectedCompagnon4, setSelectedCompagnon4] = useState<Compagnon | null>(null);
  const handleSelectedCompagnon4Change = (selected: Compagnon) => {
    setSelectedCompagnon4(selected);
    setBuild((prev) => ({
      ...prev,
      compagnons: [prev.compagnons[0], prev.compagnons[1], prev.compagnons[2], selected],
    }));
  };
  const [selectedAnneau1, setSelectedAnneau1] = useState<Anneau | null>(null);
  const handleSelectedAnneau1Change = (selected: Anneau) => {
    setSelectedAnneau1(selected);
    setBuild((prev) => ({
      ...prev,
      anneaux: [selected, prev.anneaux[1], prev.anneaux[2], prev.anneaux[3]],
    }));
  };
  const [selectedAnneau2, setSelectedAnneau2] = useState<Anneau | null>(null);
  const handleSelectedAnneau2Change = (selected: Anneau) => {
    setSelectedAnneau2(selected);
    setBuild((prev) => ({
      ...prev,
      anneaux: [prev.anneaux[0], selected, prev.anneaux[2], prev.anneaux[3]],
    }));
  };

  const [selectedAnneau3, setSelectedAnneau3] = useState<Anneau | null>(null);
  const handleSelectedAnneau3Change = (selected: Anneau) => {
    setSelectedAnneau3(selected);
    setBuild((prev) => ({
      ...prev,
      anneaux: [prev.anneaux[0], prev.anneaux[1], selected, prev.anneaux[3]],
    }));
  };

  const [selectedAnneau4, setSelectedAnneau4] = useState<Anneau | null>(null);
  const handleSelectedAnneau4Change = (selected: Anneau) => {
    setSelectedAnneau4(selected);
    setBuild((prev) => ({
      ...prev,
      anneaux: [prev.anneaux[0], prev.anneaux[1], prev.anneaux[2], selected],
    }));
  };

  //#endregion

  const handleClickSaveBuild = () => {
    setOpenModalStringBuild(true);
    const compagnonsArray = [
      build.compagnons[0],
      build.compagnons[1],
      build.compagnons[2],
      build.compagnons[3],
    ] as Compagnon[];
    const AnneauxArray = [build.anneaux[0], build.anneaux[1], build.anneaux[2], build.anneaux[3]] as Anneau[];
    setBuild({
      arme: build.arme,
      anneaux: AnneauxArray,
      brassard: build.brassard,
      compagnons: compagnonsArray,
      sorts: [],
    });
  };

  const handleImportButtonClick = (build: string) => {
    const decryptedBytes = AES.decrypt(build, buildKey);
    const decryptedJsonString = decryptedBytes.toString(enc.Utf8);
    const JSONBuild = JSON.parse(decryptedJsonString);
    console.log(JSONBuild);
    setBuild(JSONBuild);
    closeModalImport();
  };
  //#endregion

  //#region MODAL
  const [openModalImport, setOpenModalImport] = useState<boolean | null>(true);

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
  const closeModalStringBuild = () => {
    setOpenModalStringBuild(false);
  };
  const closeModalImport = () => {
    setOpenModalImport(false);
  };

  //#endregion

  //#region FUNCTIONS
  // const handleSelectedAnneau1Change = (selectedAnneau: Anneau) => {
  //   setSelectedAnneau1(selectedAnneau);
  // };
  // const handleSelectedAnneau2Change = (selectedAnneau: Anneau) => {
  //   setSelectedAnneau2(selectedAnneau);
  // };
  // const handleSelectedAnneau3Change = (selectedAnneau: Anneau) => {
  //   setSelectedAnneau3(selectedAnneau);
  // };
  // const handleSelectedAnneau4Change = (selectedAnneau: Anneau) => {
  //   setSelectedAnneau4(selectedAnneau);
  // };

  // const handleSelectedCompagnonChange = (selectedCompagnon: Compagnon) => {
  //   setSelectedCompagnon(selectedCompagnon);
  // };

  // const handleSelectedSortChange = (selectedSort: Sort) => {
  //   // setSelectedSort(selectedSort);
  // };

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
      {!build.arme ? (
        <Modal
          open={!!openModalImport}
          onClose={closeModalImport}
          center
          closeOnOverlayClick={false}
          showCloseIcon={false}
          classNames={{
            overlay: "customOverlay",
            modal: "customModalImport",
            root: "scrollbar-none",
          }}>
          <Link href="/" className="absolute top-2 left-4 invert z-10">
            <Image width={50} height={50} src="/img/left-arrow.png" alt="long-arrow-left" className="z-10" />
          </Link>
          <ImportModal onClickButton={handleImportButtonClick} />
        </Modal>
      ) : (
        <>
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
                      {build.anneaux[0] && (
                        <Image
                          src={`${ANNEAU_BASE_URL}/${build.anneaux[0].image}.png`}
                          width={200}
                          height={200}
                          alt={`${build.anneaux[0].nom}`}
                        />
                      )}
                    </div>
                    <div className={squareVariants} onClick={onOpenModalAnneau2}>
                      {build.anneaux[1] && (
                        <Image
                          src={`${ANNEAU_BASE_URL}/${build.anneaux[1].image}.png`}
                          width={200}
                          height={200}
                          alt={`${build.anneaux[1].nom}`}
                        />
                      )}
                    </div>
                    <div className={squareVariants} onClick={onOpenModalAnneau3}>
                      {build.anneaux[2] && (
                        <Image
                          src={`${ANNEAU_BASE_URL}/${build.anneaux[2].image}.png`}
                          width={200}
                          height={200}
                          alt={`${build.anneaux[2].nom}`}
                        />
                      )}
                    </div>
                    <div className={squareVariants} onClick={onOpenModalAnneau4}>
                      {build.anneaux[3] && (
                        <Image
                          src={`${ANNEAU_BASE_URL}/${build.anneaux[3].image}.png`}
                          width={200}
                          height={200}
                          alt={`${build.anneaux[3].nom}`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex xl:flex-col justify-between  xl:basis-1/6">
                <div className="flex xl:flex-col">
                  <div className="flex flex-col xl:h-full justify-center  items-center w-full">
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
                <div className="flex xl:flex-col">
                  <div className="flex flex-col xl:h-full justify-center  items-center w-full">
                    <p className={titleVariants}>Bientôt</p>
                    <div className={squareVariants}></div>
                  </div>
                </div>
                <div className="flex xl:flex-col ">
                  <div className="flex flex-col xl:h-full justify-center  items-center w-full">
                    <p className={titleVariants}>Bientôt</p>
                    <div className={squareVariants}></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col xl:basis-2/6 px-4 ">
                <div className="flex flex-col xl:h-full w-auto items-center gap-2">
                  {build.arme ? (
                    <>
                      <Image
                        src={`${ARME_BASE_URL}/${build.arme.image}.png`}
                        alt="classe"
                        width={200}
                        height={200}
                        onClick={onOpenModalArmes}
                        className="hover:cursor-pointer"
                      />
                      <p className="font-black text-3xl">{build.arme?.nom}</p>
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
                          <Image src="/img/utils/pv.png" width={30} height={30} alt="pv" />
                          <p>{build.arme.patchs[0].pv}</p>
                        </div>
                        <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
                          <Image src="/img/utils/at.png" width={30} height={30} alt="pv" />
                          <p>{build.arme.patchs[0].at}</p>
                        </div>
                        <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
                          <Image src="/img/utils/cc.png" width={30} height={30} alt="pv" />
                          <p>{build.arme.patchs[0].cc}</p>
                        </div>
                        <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
                          <Image src="/img/utils/pm.png" width={30} height={30} alt="pv" />
                          <p>{build.arme.patchs[0].pm}</p>
                        </div>
                      </div>
                      <p className="text-center">{build.arme?.patchs[0].effet}</p>
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
                        build.compagnons[0] ? companionSquareVariants : emptyCompanionVariants
                      }`}
                      onClick={onOpenModalCompagnon1}>
                      {build.compagnons[0] && (
                        <div className="flex items-center relative">
                          <Image
                            src={`/img/utils/cadre_${build.compagnons[0].rarete.toLowerCase()}.png`}
                            alt={build.compagnons[0].nom}
                            width={200}
                            height={200}
                            className="absolute"
                          />
                          <Image
                            src={`${COMPAGNON_BASE_URL}/${build.compagnons[0].image}.png`}
                            width={200}
                            height={200}
                            alt={build.compagnons[0].nom}
                          />
                        </div>
                      )}
                    </div>
                    <div
                      className={`bg-contain h-28 w-28 hover:cursor-pointer ${
                        build.compagnons[1] ? companionSquareVariants : emptyCompanionVariants
                      }`}
                      onClick={onOpenModalCompagnon2}>
                      {build.compagnons[1] && (
                        <div className="flex items-center relative">
                          <Image
                            src={`/img/utils/cadre_${build.compagnons[1].rarete.toLowerCase()}.png`}
                            alt={build.compagnons[1].nom}
                            width={200}
                            height={200}
                            className="absolute"
                          />
                          <Image
                            src={`${COMPAGNON_BASE_URL}/${build.compagnons[1].image}.png`}
                            width={200}
                            height={200}
                            alt={build.compagnons[1].nom}
                          />
                        </div>
                      )}
                    </div>
                    <div
                      className={`bg-contain h-28 w-28 hover:cursor-pointer ${
                        build.compagnons[2] ? companionSquareVariants : emptyCompanionVariants
                      }`}
                      onClick={onOpenModalCompagnon3}>
                      {build.compagnons[2] && (
                        <div className="flex items-center relative">
                          <Image
                            src={`/img/utils/cadre_${build.compagnons[2].rarete.toLowerCase()}.png`}
                            alt={build.compagnons[2].nom}
                            width={200}
                            height={200}
                            className="absolute"
                          />
                          <Image
                            src={`${COMPAGNON_BASE_URL}/${build.compagnons[2].image}.png`}
                            width={200}
                            height={200}
                            alt={build.compagnons[2].nom}
                          />
                        </div>
                      )}
                    </div>
                    <div
                      className={`bg-contain h-28 w-28 hover:cursor-pointer ${
                        build.compagnons[3] ? companionSquareVariants : emptyCompanionVariants
                      }`}
                      onClick={onOpenModalCompagnon4}>
                      {build.compagnons[3] && (
                        <div className="flex items-center relative">
                          <Image
                            src={`/img/utils/cadre_${build.compagnons[3].rarete.toLowerCase()}.png`}
                            alt={build.compagnons[3].nom}
                            width={200}
                            height={200}
                            className="absolute"
                          />
                          <Image
                            src={`${COMPAGNON_BASE_URL}/${build.compagnons[3].image}.png`}
                            width={200}
                            height={200}
                            alt={build.compagnons[3].nom}
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
          <div
            onClick={handleClickSaveBuild}
            className="mt-4 xl:absolute xl:right-0 xl:bottom-0 p-4 border border-white rounded-lg xl:w-fit w-full flex justify-center">
            <p className="font-bold text-2xl ">Sauvegarder</p>
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
          <div>
            <Modal
              open={!!openModalStringBuild}
              onClose={closeModalStringBuild}
              center
              showCloseIcon={false}
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
        </>
      )}
    </main>
  );
};

export default ImportedBuild;
