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

const ImportedBuild = () => {
  ////////////////////////////////TODO////////////////////////////////
  // Sorts modal
  // Sorts handlers
  // Sauvegarder
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
  const titleVariants = `uppercase italic font-extrabold text-2xl opacity-80`;
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
  const [selectedArme, setSelectedArme] = useState<Arme | null>(null);
  const [selectedBrassard, setSelectedBrassard] = useState<Brassard | null>(null);

  const numberOfCompagnons = 4;
  const selectableCompagnons = Array.from({ length: numberOfCompagnons }, (_, index) => {
    const [selectedCompagnon, setSelectedCompagnon] = useState<Compagnon | null>(null);
    const handleSelectedCompagnonChange = (selected: Compagnon) => {
      setSelectedCompagnon(selected);
      // Create a copy of the existing anneaux array in the build
      const updatedCompagnons = [...build.compagnons];
      updatedCompagnons[index] = selected;

      // Update the build state with the updated Compagnons
      setBuild((prevBuild) => ({
        ...prevBuild,
        compagnons: updatedCompagnons,
      }));
    };
    return {
      value: selectedCompagnon,
      handler: handleSelectedCompagnonChange,
    };
  });

  const numberOfAnneaux = 4;
  const selectableAnneaux = Array.from({ length: numberOfAnneaux }, (_, index) => {
    const [selectedAnneau, setSelectedAnneau] = useState<Anneau | null>(null);
    const handleSelectedAnneauChange = (selected: Anneau) => {
      setSelectedAnneau(selected);
      // Create a copy of the existing anneaux array in the build
      const updatedAnneaux = [...build.anneaux];
      updatedAnneaux[index] = selected;

      // Update the build state with the updated anneaux
      setBuild((prevBuild) => ({
        ...prevBuild,
        anneaux: updatedAnneaux,
      }));
    };
    return {
      value: selectedAnneau,
      handler: handleSelectedAnneauChange,
    };
  });
  const numberOfSorts = 15;
  const selectableSorts = Array.from({ length: numberOfSorts }, (_, index) => {
    const [selectedSort, setSelectedSort] = useState<Sort | null>(null);
    const handleSelectedSortChange = (selected: Sort) => {
      setSelectedSort(selected);
      // setBuild((prevBuild) => ({[...prevBuild.sorts], ...selected})
    };
    return {
      value: selectedSort,
      handler: handleSelectedSortChange,
    };
  });

  const handleSelectedBrassardChange = (selectedBrassard: Brassard) => {
    setSelectedBrassard(selectedBrassard);
    setBuild((prev) => ({ ...prev, brassard: selectedBrassard }));
  };
  const handleSelectedArmeChange = (selectedArme: Arme) => {
    setSelectedArme(selectedArme);
    setBuild((prev) => ({ ...prev, arme: selectedArme }));
  };

  const handleClickSaveBuild = () => {
    // setOpenModalStringBuild(true);
    const compagnonsArray = [
      selectableCompagnons[0].value!,
      selectableCompagnons[1].value!,
      selectableCompagnons[2].value!,
      selectableCompagnons[3].value!,
    ];
    const AnneauxArray = [
      selectableAnneaux[0].value!,
      selectableAnneaux[1].value!,
      selectableAnneaux[2].value!,
      selectableAnneaux[3].value!,
    ];
    setBuild({
      arme: selectedArme,
      anneaux: AnneauxArray,
      brassard: selectedBrassard,
      compagnons: compagnonsArray,
      sorts: [],
    });
  };

  const handleClickImportBuild = () => {
    const decryptedBytes = AES.decrypt(encryptedBuild, buildKey);
    const decryptedJsonString = decryptedBytes.toString(enc.Utf8);
    const JSONBuild = JSON.parse(decryptedJsonString);
    setBuild(JSONBuild);
    console.log(build);
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
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [openModalImport, setOpenModalImport] = useState<boolean | null>(true);

  const openEquipementModal = (modalType: string) => {
    setOpenModal(modalType);
  };

  const openCompagnonModal = (modalType: string) => {
    setOpenModal(modalType);
  };
  const openArmeModal = (modalType: string) => {
    setOpenModal(modalType);
  };
  const openSortModal = (modalType: string) => {
    setOpenModal(modalType);
  };

  const closeModal = () => {
    setOpenModal(null);
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
    console.log(build);
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
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/long-arrow-left.png"
              alt="long-arrow-left"
              className="z-10"
            />
          </Link>
          <ImportModal onClickButton={handleImportButtonClick} />
        </Modal>
      ) : (
        <>
          <Link href="/">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/long-arrow-left.png"
              alt="long-arrow-left"
              className="absolute top-2 left-20 invert"
            />
          </Link>
          <div className="flex flex-col p-12 gap-4 justify-between h-full pt-32">
            <div className="flex">
              <div className="flex flex-col basis-1/6 px-4">
                <div className="flex flex-col h-full  items-center">
                  <p className={titleVariants}>Anneaux</p>
                  <div className="flex flex-col gap-2 ">
                    {selectableAnneaux.map((equipment, index) => (
                      <div
                        key={index}
                        className={`${squareVariants}`}
                        onClick={() => openEquipementModal(`anneau${index + 1}`)}>
                        {build.anneaux[index] && (
                          <Image
                            src={`${ANNEAU_BASE_URL}/${build.anneaux[index].image}.png`}
                            width={300}
                            height={300}
                            alt={`${build.anneaux[index].nom}`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col basis-1/6 px-4  ">
                <div className="flex flex-col h-full lg:justify-between  items-center  ">
                  <div className="flex flex-col items-center">
                    <p className={titleVariants}>Brassard</p>
                    <div className={squareVariants} onClick={() => openEquipementModal("brassard")}>
                      {build.brassard && (
                        <Image
                          src={`${BRASSARD_BASE_URL}/${build.brassard.image}.png`}
                          width={200}
                          height={200}
                          alt={`${build.brassard.nom}`}
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
                  {build.arme ? (
                    <>
                      <Image
                        src={`${ARME_BASE_URL}/${build.arme.image}.png`}
                        alt="classe"
                        width={200}
                        height={200}
                        onClick={() => openArmeModal("arme")}
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
                    <Hexagon onClick={() => openArmeModal("arme")} content="Choisis une classe" size={200} />
                  )}
                </div>
              </div>
              <div className="flex flex-col basis-2/6 px-4  h-full gap-8">
                <div className="flex flex-col gap-2 px-4">
                  <p className={titleVariants}>Compagnons</p>
                  <div className="flex flex-row gap-4">
                    {selectableCompagnons.map((companion, index) => (
                      <div
                        key={index}
                        className={`h-28 w-28 bg-contain hover:cursor-pointer ${
                          companion.value ? companionSquareVariants : emptyCompanionVariants
                        }`}
                        onClick={() => openCompagnonModal(`compagnon${index + 1}`)}>
                        {build.compagnons[index] && (
                          <div className="flex items-center relative">
                            <Image
                              src={`/img/utils/cadre_${build.compagnons[index].rarete}.png`}
                              alt={build.compagnons[index].nom}
                              width={200}
                              height={200}
                              className="absolute"
                            />
                            <Image
                              src={`${COMPAGNON_BASE_URL}/${build.compagnons[index].image}.png`}
                              width={200}
                              height={200}
                              alt={build.compagnons[index].nom}
                            />
                          </div>
                        )}
                      </div>
                    ))}
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
            <div onClick={handleClickSaveBuild} className="absolute right-0 bottom-0 p-8">
              <p>Sauvegarder</p>
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
          </div>
          <div>
            <Modal
              open={!!openModal}
              onClose={closeModal}
              center
              showCloseIcon={false}
              classNames={{
                overlay: "customOverlay",
                modal: "customModal",
                root: "scrollbar-none",
              }}>
              {openModal === "arme" && (
                <ArmesDialog onClickArme={closeModal} onSelectedArmeChange={handleSelectedArmeChange} />
              )}
              {openModal === "brassard" && (
                <BrassardsDialog onClickBrassard={closeModal} onSelectedBrassardChange={handleSelectedBrassardChange} />
              )}
              {selectableAnneaux.map(
                (anneau, index) =>
                  openModal === `anneau${index + 1}` && (
                    <AnneauxDialog key={index} onClickAnneau={closeModal} onSelectedAnneauChange={anneau.handler} />
                  )
              )}
              {selectableCompagnons.map(
                (compagnon, index) =>
                  openModal === `compagnon${index + 1}` && (
                    <CompagnonsDialog
                      key={index}
                      onClickCompagnon={closeModal}
                      onSelectedCompagnonChange={compagnon.handler}
                    />
                  )
              )}
            </Modal>
          </div>
        </>
      )}
    </main>
  );
};

export default ImportedBuild;
