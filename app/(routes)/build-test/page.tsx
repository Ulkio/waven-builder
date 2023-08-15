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
import { Anneau, Arme, Brassard, Compagnon, Build, Sort } from "@/types";
import { AES, enc } from "crypto-js";
import { useMediaQuery } from "react-responsive";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StringBuildDialog from "@/components/modals/StringBuildDialog";
import ImportDialog from "@/components/modals/ImportDialog";
import Link from "next/link";
import SortsDialog from "@/components/modals/SortsDialog";
import { Tooltip } from "react-tooltip";
import "../../styles/tooltip.css";
import { motion } from "framer-motion";
import { ModalComponent } from "@/components/modal-containers/ModalComponent";

const Build = () => {
  ////////////////////////////////TODO////////////////////////////////

  //#region CONSTANTS
  const buildKey = "importKey";
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  //#endregion

  //#region STATES
  const [build, setBuild] = useState<Build>({
    compagnons: [],
    anneaux: [],
    brassard: null,
    sorts: [],
    arme: null,
  });
  const [encryptedBuild, setEncryptedBuild] = useState("");
  const [openModalImport, setOpenModalImport] = useState<boolean | null>(false);

  //#endregion

  //#region STYLE VARIANTS
  const squareVariants = `bg-black bg-opacity-60  border-4 border-white border-solid h-24 w-24 lg:w-32 lg:h-32 rounded-xl hover:cursor-pointer `;
  const companionSquareVariants = `h-24 w-24  hover:cursor-pointer`;
  const spellSquareVariants = `bg-black opacity-60 border-2 border-white border-solid h-16 w-16 rounded-lg hover:cursor-pointer`;
  const titleVariants = `uppercase italic font-extrabold text-2xl opacity-80 text-white`;
  const emptyCompanionVariants = `h-24 bg-[url("/img/utils/cadre_commun.png")]`;
  //#endregion

  //#region URLs
  const ARME_BASE_URL = "/img/armes";
  const ANNEAU_BASE_URL = "/img/anneaux";
  const BRASSARD_BASE_URL = "/img/brassards";
  const COMPAGNON_BASE_URL = "/img/compagnons";
  const SORT_BASE_URL = "/img/sorts";
  //#endregion

  //#region HANDLERS
  const handleSelectedArmeChange = (selectedArme: Arme) => {
    setBuild((prev) => ({ ...prev, arme: selectedArme }));
  };
  const handleSelectedBrassardChange = (selectedBrassard: Brassard) => {
    setBuild((prev) => ({ ...prev, brassard: selectedBrassard }));
  };
  const handleSelectedCompagnonChangeGenerator = (index: number) => (selected: Compagnon) => {
    setBuild((prev) => {
      const newCompagnons = [...prev.compagnons];
      newCompagnons[index] = selected;
      return { ...prev, compagnons: newCompagnons };
    });
  };
  const handleSelectedCompagnon1Change = handleSelectedCompagnonChangeGenerator(0);
  const handleSelectedCompagnon2Change = handleSelectedCompagnonChangeGenerator(1);
  const handleSelectedCompagnon3Change = handleSelectedCompagnonChangeGenerator(2);
  const handleSelectedCompagnon4Change = handleSelectedCompagnonChangeGenerator(3);

  const handleSelectedAnneauChangeGenerator = (index: number) => (selected: Anneau) => {
    setBuild((prev) => {
      const newAnneaux = [...prev.anneaux];
      newAnneaux[index] = selected;
      return { ...prev, anneaux: newAnneaux };
    });
  };

  const handleSelectedAnneau1Change = handleSelectedAnneauChangeGenerator(0);
  const handleSelectedAnneau2Change = handleSelectedAnneauChangeGenerator(1);
  const handleSelectedAnneau3Change = handleSelectedAnneauChangeGenerator(2);
  const handleSelectedAnneau4Change = handleSelectedAnneauChangeGenerator(3);

  const handleSelectedSortChangeGenerator = (index: number) => (selected: Sort) => {
    setBuild((prev) => {
      const newSorts = [...prev.sorts];
      newSorts[index] = selected;
      return { ...prev, sorts: newSorts };
    });
  };
  const handleSelectedSort1Change = handleSelectedSortChangeGenerator(0);
  const handleSelectedSort2Change = handleSelectedSortChangeGenerator(1);
  const handleSelectedSort3Change = handleSelectedSortChangeGenerator(2);
  const handleSelectedSort4Change = handleSelectedSortChangeGenerator(3);
  const handleSelectedSort5Change = handleSelectedSortChangeGenerator(4);
  const handleSelectedSort6Change = handleSelectedSortChangeGenerator(5);
  const handleSelectedSort7Change = handleSelectedSortChangeGenerator(6);
  const handleSelectedSort8Change = handleSelectedSortChangeGenerator(7);
  const handleSelectedSort9Change = handleSelectedSortChangeGenerator(8);
  const handleSelectedSort10Change = handleSelectedSortChangeGenerator(9);
  const handleSelectedSort11Change = handleSelectedSortChangeGenerator(10);
  const handleSelectedSort12Change = handleSelectedSortChangeGenerator(11);
  const handleSelectedSort13Change = handleSelectedSortChangeGenerator(12);
  const handleSelectedSort14Change = handleSelectedSortChangeGenerator(13);
  const handleSelectedSort15Change = handleSelectedSortChangeGenerator(14);
  //#endregion

  //#region MODAL
  const onCloseModalArme = () => {
    closeModal("openArmeModal");
  };

  const onCloseModalAnneau = () => {
    closeModal("openAnneau1Modal");
    closeModal("openAnneau2Modal");
    closeModal("openAnneau3Modal");
    closeModal("openAnneau4Modal");
  };

  const onCloseModalBrassard = () => {
    closeModal("openBrassardModal");
  };

  const onCloseModalCompagnon = () => {
    closeModal("openCompagnon1Modal");
    closeModal("openCompagnon2Modal");
    closeModal("openCompagnon3Modal");
    closeModal("openCompagnon4Modal");
  };

  const onCloseModalSort = () => {
    closeModal("openSort1Modal");
    closeModal("openSort2Modal");
    closeModal("openSort3Modal");
    closeModal("openSort4Modal");
    closeModal("openSort5Modal");
    closeModal("openSort6Modal");
    closeModal("openSort7Modal");
    closeModal("openSort8Modal");
    closeModal("openSort9Modal");
    closeModal("openSort10Modal");
    closeModal("openSort11Modal");
    closeModal("openSort12Modal");
    closeModal("openSort13Modal");
    closeModal("openSort14Modal");
    closeModal("openSort15Modal");
  };
  const [openModalStringBuild, setOpenModalStringBuild] = useState<boolean>(false);

  const handleCloseModalClick = (onCloseModal: () => void) => () => {
    if (isTabletOrMobile) return;
    onCloseModal();
  };

  const handleClickAnneau = handleCloseModalClick(onCloseModalAnneau);
  const handleClickBrassard = handleCloseModalClick(onCloseModalBrassard);
  const handleClickCompagnon = handleCloseModalClick(onCloseModalCompagnon);
  const handleClickArme = handleCloseModalClick(onCloseModalArme);
  const handleClickSort = handleCloseModalClick(onCloseModalSort);
  const closeModalStringBuild = () => setOpenModalStringBuild(false);
  const closeModalImport = () => setOpenModalImport(false);

  const modalsConfig = [
    {
      stateName: "openArmeModal",
      onClose: onCloseModalArme,
      dialogComponent: <ArmesDialog onClickArme={handleClickArme} onSelectedArmeChange={handleSelectedArmeChange} />,
    },
    {
      stateName: "openAnneau1Modal",
      onClose: onCloseModalAnneau,
      dialogComponent: (
        <AnneauxDialog onClickAnneau={handleClickAnneau} onSelectedAnneauChange={handleSelectedAnneau1Change} />
      ),
    },
    {
      stateName: "openAnneau2Modal",
      onClose: onCloseModalAnneau,
      dialogComponent: (
        <AnneauxDialog onClickAnneau={handleClickAnneau} onSelectedAnneauChange={handleSelectedAnneau2Change} />
      ),
    },
    {
      stateName: "openAnneau3Modal",
      onClose: onCloseModalAnneau,
      dialogComponent: (
        <AnneauxDialog onClickAnneau={handleClickAnneau} onSelectedAnneauChange={handleSelectedAnneau3Change} />
      ),
    },
    {
      stateName: "openAnneau4Modal",
      onClose: onCloseModalAnneau,
      dialogComponent: (
        <AnneauxDialog onClickAnneau={handleClickAnneau} onSelectedAnneauChange={handleSelectedAnneau4Change} />
      ),
    },
    {
      stateName: "openBrassardModal",
      onClose: onCloseModalBrassard,
      dialogComponent: (
        <BrassardsDialog
          onClickBrassard={handleClickBrassard}
          onSelectedBrassardChange={handleSelectedBrassardChange}
        />
      ),
    },
    {
      stateName: "openCompagnon1Modal",
      onClose: onCloseModalCompagnon,
      dialogComponent: (
        <CompagnonsDialog
          onClickCompagnon={handleClickCompagnon}
          onSelectedCompagnonChange={handleSelectedCompagnon1Change}
        />
      ),
    },
    {
      stateName: "openCompagnon2Modal",
      onClose: onCloseModalCompagnon,
      dialogComponent: (
        <CompagnonsDialog
          onClickCompagnon={handleClickCompagnon}
          onSelectedCompagnonChange={handleSelectedCompagnon2Change}
        />
      ),
    },
    {
      stateName: "openCompagnon3Modal",
      onClose: onCloseModalCompagnon,
      dialogComponent: (
        <CompagnonsDialog
          onClickCompagnon={handleClickCompagnon}
          onSelectedCompagnonChange={handleSelectedCompagnon3Change}
        />
      ),
    },
    {
      stateName: "openCompagnon4Modal",
      onClose: onCloseModalCompagnon,
      dialogComponent: (
        <CompagnonsDialog
          onClickCompagnon={handleClickCompagnon}
          onSelectedCompagnonChange={handleSelectedCompagnon4Change}
        />
      ),
    },
    {
      stateName: "openSort1Modal",
      onClose: onCloseModalSort,
      dialogComponent: <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort1Change} />,
    },
    {
      stateName: "openSort2Modal",
      onClose: onCloseModalSort,
      dialogComponent: <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort2Change} />,
    },
    {
      stateName: "openSort3Modal",
      onClose: onCloseModalSort,
      dialogComponent: <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort3Change} />,
    },
    {
      stateName: "openSort4Modal",
      onClose: onCloseModalSort,
      dialogComponent: <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort4Change} />,
    },
    {
      stateName: "openSort5Modal",
      onClose: onCloseModalSort,
      dialogComponent: <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort5Change} />,
    },
    {
      stateName: "openSort6Modal",
      onClose: onCloseModalSort,
      dialogComponent: <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort6Change} />,
    },
    {
      stateName: "openSort7Modal",
      onClose: onCloseModalSort,
      dialogComponent: <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort7Change} />,
    },
    {
      stateName: "openSort8Modal",
      onClose: onCloseModalSort,
      dialogComponent: <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort8Change} />,
    },
    {
      stateName: "openSort9Modal",
      onClose: onCloseModalSort,
      dialogComponent: <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort9Change} />,
    },
    {
      stateName: "openSort10Modal",
      onClose: onCloseModalSort,
      dialogComponent: <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort10Change} />,
    },
    {
      stateName: "openSort11Modal",
      onClose: onCloseModalSort,
      dialogComponent: <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort11Change} />,
    },
    {
      stateName: "openSort12Modal",
      onClose: onCloseModalSort,
      dialogComponent: <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort12Change} />,
    },
    {
      stateName: "openSort13Modal",
      onClose: onCloseModalSort,
      dialogComponent: <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort13Change} />,
    },
    {
      stateName: "openSort14Modal",
      onClose: onCloseModalSort,
      dialogComponent: <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort14Change} />,
    },
    {
      stateName: "openSort15Modal",
      onClose: onCloseModalSort,
      dialogComponent: <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort15Change} />,
    },
    // Add more entries for other modals
  ];
  const [modalStates, setModalStates] = useState(
    Object.fromEntries(modalsConfig.map((config) => [config.stateName, false]))
  );

  const openModal = (modalState: any) => {
    setModalStates((prevState) => ({
      ...prevState,
      [modalState]: true,
    }));
  };

  const closeModal = (modalState: any) => {
    setModalStates((prevState) => ({
      ...prevState,
      [modalState]: false,
    }));
  };

  //#endregion

  //#region FUNCTIONS
  const handleImportBuild = () => {
    setOpenModalImport(true);
  };
  const handleClickSaveBuild = () => {
    if (!build.arme) {
      toast("Veuillez sélectionner une arme");
    } else if (build.sorts.length === 0) {
      toast("Veuillez sélectionner au moins un sort");
    } else if (build.anneaux.length === 0) {
      toast("Veuillez sélectionner au moins un anneau");
    } else if (build.compagnons.length === 0) {
      toast("Veuillez sélectionner au moins un compagnon");
    } else if (!build.brassard) {
      toast("Veuillez sélectionner un brassard");
    } else {
      setOpenModalStringBuild(true);
      const stringBuild = JSON.stringify(build);
      const encrypted = AES.encrypt(stringBuild, buildKey).toString();
      setEncryptedBuild(encrypted);
    }
  };

  const handleImportButtonClick = (build: string) => {
    const decryptedBytes = AES.decrypt(build, buildKey);
    const decryptedJsonString = decryptedBytes.toString(enc.Utf8);
    const JSONBuild = JSON.parse(decryptedJsonString);
    setBuild(JSONBuild);
    closeModalImport();
  };
  //#endregion

  // USEEFFECTS

  const variants = {
    show: {
      opacity: 0.5,
      x: 0,
      transition: {
        ease: "easeInOut",
        duration: 1,
      },
    },
    hide: {
      opacity: 0,
      x: 500,
      transition: {
        ease: "easeInOut",
        duration: 1,
      },
    },
  };

  return (
    <main className=" flex flex-col items-stretch justify-center p-6 gap-6 ">
      {build.arme && (
        <motion.div
          key={build.arme.nom}
          variants={variants}
          animate={"show"}
          initial="hide"
          className="fixed bottom-0 right-0">
          <Image
            src={`/img/splash/${build.arme.nom
              .toLowerCase()
              .replace(" ", "_")
              .replace("é", "e")
              .replace("ï", "i")}.png`}
            width={400}
            height={400}
            alt="splash"
          />
        </motion.div>
      )}

      <Link href="/">
        <Image
          onClick={closeModalImport}
          width={40}
          height={40}
          src="/img/left-arrow.png"
          alt="long-arrow-left"
          className="fixed top-2 left-4 invert"
        />
      </Link>

      <div className="flex  xl:flex-col xl:px-12 gap-4 justify-between xl:h-full pt-16 xl:pt-24">
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-0">
          <div className="flex   xl:flex-col xl:basis-1/6 xl:px-4">
            <div className="flex  flex-col xl:h-full justify-center  items-center w-full">
              <p className={titleVariants}>Anneaux</p>
              <div className="flex flex-wrap justify-center gap-4 xl:gap-0  xl:flex-col ">
                {/* <div className="flex  flex-col ">
                  <div
                    className={`flex items-center justify-center relative ${!build.anneaux[0] && squareVariants}`}
                    onClick={() => openModal("openAnneau1Modal")}>
                    {!build.anneaux[0] && (
                      <Image
                        src={`/img/utils/generic_ring.png`}
                        width={100}
                        height={100}
                        alt="generic ring"
                        className="object-scale-down opacity-50 "
                      />
                    )}

                    {build.anneaux[0] && (
                      <div className={`flex flex-col  items-center w-32 h-32 relative`}>
                        <Image
                          src={`/img/utils/bg_${build.anneaux[0].rarete.toLowerCase()}.png`}
                          alt={build.anneaux[0].nom}
                          width={150}
                          height={150}
                          className="absolute hover:cursor-pointer"
                        />
                        <Image
                          src={`${ANNEAU_BASE_URL}/${build.anneaux[0].image}.png`}
                          alt={build.anneaux[0].nom}
                          width={150}
                          height={150}
                          className="hover:cursor-pointer z-10"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-center py-2">{build.anneaux[0]?.nom}</p>
                </div> */}
                {[...Array(4)].map((_, index) => {
                  const anneauIndex = index + 1;
                  const anneau = build.anneaux[index];

                  return (
                    <div key={index} className="flex flex-col">
                      <div
                        className={`flex items-center justify-center relative ${
                          !build.anneaux[index] && squareVariants
                        }`}
                        onClick={() => openModal(`openAnneau${anneauIndex}Modal`)}>
                        {!build.anneaux[index] && (
                          <Image
                            src={`/img/utils/generic_ring.png`}
                            width={100}
                            height={100}
                            alt="generic ring"
                            className="object-scale-down opacity-50 "
                          />
                        )}

                        {anneau && (
                          <div
                            key={index}
                            onClick={() => openModal(`openAnneau${anneauIndex}Modal`)}
                            className={`flex flex-col  items-center w-32 h-32 relative`}>
                            <Image
                              src={`/img/utils/bg_${build.anneaux[index].rarete.toLowerCase()}.png`}
                              alt={build.anneaux[index].nom}
                              width={150}
                              height={150}
                              className="absolute hover:cursor-pointer"
                            />
                            <Image
                              src={`${ANNEAU_BASE_URL}/${build.anneaux[index].image}.png`}
                              alt={build.anneaux[index].nom}
                              width={150}
                              height={150}
                              className="hover:cursor-pointer z-10"
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-center">{build.anneaux[index]?.nom}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex xl:flex-col justify-center xl:justify-start gap-12 xl:basis-1/6">
            <div className="flex flex-wrap xl:flex-nowrap gap-4 xl:gap-0 xl:flex-col">
              <div className="flex flex-col xl:h-full justify-center  items-center ">
                <p className={titleVariants}>Brassard</p>
                <div className="flex flex-col ">
                  <div
                    className={`flex items-center justify-center relative ${!build.brassard && squareVariants}`}
                    onClick={() => openModal("openBrassardModal")}>
                    {!build.brassard && (
                      <Image
                        src={`/img/utils/generic_armband.png`}
                        width={100}
                        height={100}
                        alt="generic armband"
                        className="object-scale-down opacity-50"
                      />
                    )}
                    {build.brassard && (
                      <div className={`flex flex-col  items-center w-32 h-32 relative`}>
                        <Image
                          src={`/img/utils/bg_${build.brassard.rarete.toLowerCase()}.png`}
                          alt={build.brassard.nom}
                          width={150}
                          height={150}
                          className="absolute hover:cursor-pointer"
                        />
                        <Image
                          src={`${BRASSARD_BASE_URL}/${build.brassard.image}.png`}
                          alt={build.brassard.nom}
                          width={150}
                          height={150}
                          className="hover:cursor-pointer z-10"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-center py-2">{build.brassard?.nom}</p>
                </div>
              </div>
              <div className="flex flex-col xl:h-full justify-center  items-center">
                <p className={titleVariants}>Broche</p>
                <div className="flex flex-col ">
                  <div className={`flex items-center justify-center relative ${squareVariants}`}></div>
                  <p className="text-center py-2"></p>
                </div>
              </div>
              <div className="flex flex-col xl:h-full justify-center  items-center">
                <p className={titleVariants}>Familier</p>
                <div className="flex flex-col ">
                  <div className={`flex items-center justify-center relative ${squareVariants}`}></div>
                  <p className="text-center py-2"></p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col xl:basis-2/6 px-4 ">
            <div className="flex flex-col xl:h-full  items-center gap-2">
              {build.arme ? (
                <>
                  <Image
                    src={`${ARME_BASE_URL}/${build.arme?.image}.png`}
                    alt="classe"
                    width={200}
                    height={200}
                    onClick={() => openModal("openArmeModal")}
                    className="hover:cursor-pointer"
                  />
                  <p className="font-black text-3xl">{build.arme?.nom}</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
                      <Image src="/img/utils/pv.png" width={30} height={30} alt="pv" />
                      <p className="font-bold">{build.arme.patchs[0].pv}</p>
                    </div>
                    <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
                      <Image src="/img/utils/at.png" width={30} height={30} alt="atk" />
                      <p className="font-bold">{build.arme.patchs[0].at}</p>
                    </div>
                    <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
                      <Image src="/img/utils/cc.png" width={30} height={30} alt="crit" />
                      <p className="font-bold">{build.arme.patchs[0].cc}</p>
                    </div>
                    <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
                      <Image src="/img/utils/pm.png" width={30} height={30} alt="pm" />
                      <p className="font-bold">{build.arme.patchs[0].pm}</p>
                    </div>
                  </div>
                  <p className="text-center">{build.arme.patchs[0].effet}</p>
                  <div className="flex flex-row items-center gap-8 pt-12">
                    <Hexagon content="(wip)" size={100} />
                    <Hexagon content="(wip)" size={100} />
                  </div>
                </>
              ) : (
                <Image
                  src="/img/hexagon-chose-arm.png"
                  alt="choisis une arme"
                  width={200}
                  height={200}
                  priority
                  onClick={() => openModal("openArmeModal")}
                  className="hover:cursor-pointer hover:-translate-y-4 transition duration-200 ease-in-out animate-pulse"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col xl:basis-2/6 px-4  xl:h-full gap-8">
            <div className="flex flex-col gap-2 px-4 items-center xl:items-start">
              <p className={titleVariants}>Compagnons</p>
              <div className="flex flex-row flex-wrap gap-4 justify-center">
                {[...Array(4)].map((_, index) => {
                  const compagnonIndex = index + 1;
                  const compagnon = build.compagnons[index];

                  return (
                    <div
                      key={index}
                      onClick={() => openModal(`openCompagnon${compagnonIndex}Modal`)}
                      className={`bg-contain h-28 w-28 hover:cursor-pointer ${
                        build.compagnons[index] ? companionSquareVariants : emptyCompanionVariants
                      }`}>
                      {compagnon && (
                        <div className="flex items-center relative">
                          <Image
                            src={`/img/utils/cadre_${build.compagnons[index].rarete.toLowerCase()}.png`}
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
                          <Tooltip id={`tooltip-compagnon-${compagnonIndex}`} className="tooltip z-10 " />
                        </div>
                      )}
                      <p className="text-center">{build.compagnons[index]?.nom}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2 px-4 ">
              <p className={titleVariants}>Sorts</p>
              <div className="flex flex-wrap gap-2 max-w-96">
                {[...Array(15)].map((_, index) => {
                  const sortIndex = index + 1;
                  const sort = build.sorts[index];

                  return (
                    <div
                      key={index}
                      onClick={() => openModal(`openSort${sortIndex}Modal`)}
                      className={sort ? "w-16 h-16" : spellSquareVariants}>
                      {sort && (
                        <div
                          data-tooltip-id={`tooltip-sort-${sortIndex}`}
                          data-tooltip-content={sort.nom}
                          data-tooltip-place="bottom"
                          className="flex items-center relative">
                          <Image src={`${SORT_BASE_URL}/${sort.image}.png`} width={200} height={200} alt={sort.nom} />
                          <Tooltip id={`tooltip-sort-${sortIndex}`} className="tooltip z-10 " />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col   xl:flex-row w-full xl:gap-20 xl:self-center justify-center">
        <div onClick={handleClickSaveBuild} className="hover:cursor-pointer">
          <p className="font-bold text-2xl border border-white rounded-lg p-4 w-full xl:w-48 text-center">
            Sauvegarder
          </p>
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
        <div onClick={handleImportBuild} className="hover:cursor-pointer">
          <p className="font-bold text-2xl border border-white rounded-lg p-4  w-full xl:w-48  text-center">Importer</p>
        </div>
      </div>
      <div>
        <Modal
          open={!!openModalStringBuild}
          onClose={closeModalStringBuild}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModalImport",
            root: "scrollbar-none",
          }}>
          <StringBuildDialog stringBuild={encryptedBuild} />
        </Modal>
        <Modal
          open={!!openModalImport}
          onClose={closeModalImport}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModalImport",
            root: "scrollbar-none",
          }}>
          <ImportDialog onClickButton={handleImportButtonClick} />
        </Modal>
        {modalsConfig.map((config, index) => (
          <ModalComponent
            key={index}
            open={modalStates[config.stateName]}
            onClose={() => closeModal(config.stateName)} // Close modal function with onCloseModalSort
            dialogComponent={config.dialogComponent}
          />
        ))}
      </div>
    </main>
  );
};

export default Build;
