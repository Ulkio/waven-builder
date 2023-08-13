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
import { useMediaQuery } from "react-responsive";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StringBuildDialog from "@/components/modals/StringBuildDialog";
import Link from "next/link";
import SortsDialog from "@/components/modals/SortsDialog";
import { Tooltip } from "react-tooltip";
import "../../styles/tooltip.css";
const Build = () => {
  ////////////////////////////////TODO////////////////////////////////
  // Sorts modal
  // Sorts handlers
  // dons, afficher dons a coté des items/sous le build?
  // image optimizisation (skeleton, moins d'images par row...)

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
  //#endregion

  //#region STYLE VARIANTS
  const squareVariants = `bg-black bg-opacity-60  border-4 border-white border-solid h-24 w-24 lg:w-32 lg:h-32 rounded-xl hover:cursor-pointer`;
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
  const [selectedSort1, setSelectedSort1] = useState<Sort | null>(null);
  const handleSelectedSort1Change = (selected: Sort) => {
    setSelectedSort1(selected);
  };
  const [selectedSort2, setSelectedSort2] = useState<Sort | null>(null);
  const handleSelectedSort2Change = (selected: Sort) => {
    setSelectedSort2(selected);
  };
  const [selectedSort3, setSelectedSort3] = useState<Sort | null>(null);
  const handleSelectedSort3Change = (selected: Sort) => {
    setSelectedSort3(selected);
  };
  const [selectedSort4, setSelectedSort4] = useState<Sort | null>(null);
  const handleSelectedSort4Change = (selected: Sort) => {
    setSelectedSort4(selected);
  };

  const [selectedSort5, setSelectedSort5] = useState<Sort | null>(null);
  const handleSelectedSort5Change = (selected: Sort) => {
    setSelectedSort5(selected);
  };

  const [selectedSort6, setSelectedSort6] = useState<Sort | null>(null);
  const handleSelectedSort6Change = (selected: Sort) => {
    setSelectedSort6(selected);
  };

  const [selectedSort7, setSelectedSort7] = useState<Sort | null>(null);
  const handleSelectedSort7Change = (selected: Sort) => {
    setSelectedSort7(selected);
  };

  const [selectedSort8, setSelectedSort8] = useState<Sort | null>(null);
  const handleSelectedSort8Change = (selected: Sort) => {
    setSelectedSort8(selected);
  };

  const [selectedSort9, setSelectedSort9] = useState<Sort | null>(null);
  const handleSelectedSort9Change = (selected: Sort) => {
    setSelectedSort9(selected);
  };

  const [selectedSort10, setSelectedSort10] = useState<Sort | null>(null);
  const handleSelectedSort10Change = (selected: Sort) => {
    setSelectedSort10(selected);
  };

  const [selectedSort11, setSelectedSort11] = useState<Sort | null>(null);
  const handleSelectedSort11Change = (selected: Sort) => {
    setSelectedSort11(selected);
  };

  const [selectedSort12, setSelectedSort12] = useState<Sort | null>(null);
  const handleSelectedSort12Change = (selected: Sort) => {
    setSelectedSort12(selected);
  };
  const [selectedSort13, setSelectedSort13] = useState<Sort | null>(null);
  const handleSelectedSort13Change = (selected: Sort) => {
    setSelectedSort13(selected);
  };
  const [selectedSort14, setSelectedSort14] = useState<Sort | null>(null);
  const handleSelectedSort14Change = (selected: Sort) => {
    setSelectedSort14(selected);
  };
  const [selectedSort15, setSelectedSort15] = useState<Sort | null>(null);
  const handleSelectedSort15Change = (selected: Sort) => {
    setSelectedSort15(selected);
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
  const [openSortModal1, setOpenSort1Modal] = useState(false);
  const [openSortModal2, setOpenSort2Modal] = useState(false);
  const [openSortModal3, setOpenSort3Modal] = useState(false);
  const [openSortModal4, setOpenSort4Modal] = useState(false);
  const [openSortModal5, setOpenSort5Modal] = useState(false);
  const [openSortModal6, setOpenSort6Modal] = useState(false);
  const [openSortModal7, setOpenSort7Modal] = useState(false);
  const [openSortModal8, setOpenSort8Modal] = useState(false);
  const [openSortModal9, setOpenSort9Modal] = useState(false);
  const [openSortModal10, setOpenSort10Modal] = useState(false);
  const [openSortModal11, setOpenSort11Modal] = useState(false);
  const [openSortModal12, setOpenSort12Modal] = useState(false);
  const [openSortModal13, setOpenSort13Modal] = useState(false);
  const [openSortModal14, setOpenSort14Modal] = useState(false);
  const [openSortModal15, setOpenSort15Modal] = useState(false);

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
  const onOpenModalSort1 = () => setOpenSort1Modal(true);
  const onOpenModalSort2 = () => setOpenSort2Modal(true);
  const onOpenModalSort3 = () => setOpenSort3Modal(true);
  const onOpenModalSort4 = () => setOpenSort4Modal(true);
  const onOpenModalSort5 = () => setOpenSort5Modal(true);
  const onOpenModalSort6 = () => setOpenSort6Modal(true);
  const onOpenModalSort7 = () => setOpenSort7Modal(true);
  const onOpenModalSort8 = () => setOpenSort8Modal(true);
  const onOpenModalSort9 = () => setOpenSort9Modal(true);
  const onOpenModalSort10 = () => setOpenSort10Modal(true);
  const onOpenModalSort11 = () => setOpenSort11Modal(true);
  const onOpenModalSort12 = () => setOpenSort12Modal(true);
  const onOpenModalSort13 = () => setOpenSort13Modal(true);
  const onOpenModalSort14 = () => setOpenSort14Modal(true);
  const onOpenModalSort15 = () => setOpenSort15Modal(true);

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
  const onCloseModalSort = () => {
    setOpenSort1Modal(false);
    setOpenSort2Modal(false);
    setOpenSort3Modal(false);
    setOpenSort4Modal(false);
    setOpenSort5Modal(false);
    setOpenSort6Modal(false);
    setOpenSort7Modal(false);
    setOpenSort8Modal(false);
    setOpenSort9Modal(false);
    setOpenSort10Modal(false);
    setOpenSort11Modal(false);
    setOpenSort12Modal(false);
    setOpenSort13Modal(false);
    setOpenSort14Modal(false);
    setOpenSort15Modal(false);
  };
  const onCloseModalArme = () => setOpenArmeModal(false);

  const handleClickAnneau = () => {
    if (isTabletOrMobile) return;
    onCloseModalAnneau();
  };
  const handleClickBrassard = () => {
    if (isTabletOrMobile) return;
    onCloseModalBrassard();
  };
  const handleClickCompagnon = () => {
    if (isTabletOrMobile) return;
    onCloseModalCompagnon();
  };
  const handleClickArme = () => {
    if (isTabletOrMobile) return;
    onCloseModalArme();
  };
  const handleClickSort = () => {
    if (isTabletOrMobile) return;
    onCloseModalSort();
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
    const SortsArray = [
      selectedSort1,
      selectedSort2,
      selectedSort3,
      selectedSort4,
      selectedSort5,
      selectedSort6,
      selectedSort7,
      selectedSort8,
      selectedSort9,
      selectedSort10,
      selectedSort11,
      selectedSort12,
      selectedSort13,
      selectedSort14,
      selectedSort15,
    ] as Sort[];

    setBuild({
      arme: selectedArme,
      anneaux: AnneauxArray,
      brassard: selectedBrassard,
      compagnons: compagnonsArray,
      sorts: SortsArray,
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
              <div className="flex  xl:flex-col gap-2">
                <div className="flex flex-col ">
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
                  <p className="text-center">{selectedAnneau1?.nom}</p>
                </div>
                <div className="flex flex-col ">
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
                  <p className="text-center">{selectedAnneau2?.nom}</p>
                </div>
                <div className="flex flex-col ">
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
                  <p className="text-center">{selectedAnneau3?.nom}</p>
                </div>
                <div className="flex flex-col ">
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
                  <p className="text-center">{selectedAnneau4?.nom}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex xl:flex-col justify-between  xl:basis-1/6">
            <div className="flex xl:flex-col">
              <div className="flex flex-col xl:h-full justify-center  items-center w-full">
                <p className={titleVariants}>Brassard</p>
                <div className="flex flex-col ">
                  <div className={squareVariants} onClick={onOpenModalBrassard}>
                    {selectedBrassard && (
                      <Image
                        src={`${BRASSARD_BASE_URL}/${selectedBrassard.image}.png`}
                        width={200}
                        height={200}
                        alt={`${selectedBrassard.nom}`}
                      />
                    )}
                    <p className="text-center">{selectedBrassard?.nom}</p>
                  </div>
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
                <Image
                  src="/img/hexagon-chose-arm.png"
                  alt="choisis une arme"
                  width={200}
                  height={200}
                  loading="eager"
                  onClick={onOpenModalArmes}
                  className="hover:cursor-pointer hover:-translate-y-4 transition duration-200 ease-in-out"
                />
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
                  <p className="text-center">{selectedCompagnon1?.nom}</p>
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
                  <p className="text-center">{selectedCompagnon2?.nom}</p>
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
                  <p className="text-center">{selectedCompagnon3?.nom}</p>
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
                  <p className="text-center">{selectedCompagnon4?.nom}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 px-4 ">
              <p className={titleVariants}>Sorts</p>
              <div className="flex flex-wrap gap-2 max-w-96">
                <div onClick={onOpenModalSort1} className={selectedSort1 ? `w-16 h-16` : spellSquareVariants}>
                  {selectedSort1 && (
                    <div
                      data-tooltip-id="tooltip-sort-1"
                      data-tooltip-content={`${selectedSort1.nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${selectedSort1.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedSort1.nom}
                      />
                      <Tooltip id="tooltip-sort-1" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort2} className={selectedSort2 ? `w-16 h-16` : spellSquareVariants}>
                  {selectedSort2 && (
                    <div
                      data-tooltip-id="tooltip-sort-2"
                      data-tooltip-content={`${selectedSort2.nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${selectedSort2.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedSort2.nom}
                      />
                      <Tooltip id="tooltip-sort-2" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort3} className={selectedSort3 ? `w-16 h-16` : spellSquareVariants}>
                  {selectedSort3 && (
                    <div
                      data-tooltip-id="tooltip-sort-1"
                      data-tooltip-content={`${selectedSort3.nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${selectedSort3.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedSort3.nom}
                      />
                      <Tooltip id="tooltip-sort-1" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort4} className={selectedSort4 ? `w-16 h-16` : spellSquareVariants}>
                  {selectedSort4 && (
                    <div
                      data-tooltip-id="tooltip-sort-4"
                      data-tooltip-content={`${selectedSort4.nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${selectedSort4.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedSort4.nom}
                      />
                      <Tooltip id="tooltip-sort-4" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort5} className={selectedSort5 ? `w-16 h-16` : spellSquareVariants}>
                  {selectedSort5 && (
                    <div
                      data-tooltip-id="tooltip-sort-5"
                      data-tooltip-content={`${selectedSort5.nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${selectedSort5.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedSort5.nom}
                      />
                      <Tooltip id="tooltip-sort-5" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort6} className={selectedSort6 ? `w-16 h-16` : spellSquareVariants}>
                  {selectedSort6 && (
                    <div
                      data-tooltip-id="tooltip-sort-6"
                      data-tooltip-content={`${selectedSort6.nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${selectedSort6.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedSort6.nom}
                      />
                      <Tooltip id="tooltip-sort-6" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort7} className={selectedSort7 ? `w-16 h-16` : spellSquareVariants}>
                  {selectedSort7 && (
                    <div
                      data-tooltip-id="tooltip-sort-7"
                      data-tooltip-content={`${selectedSort7.nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${selectedSort7.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedSort7.nom}
                      />
                      <Tooltip id="tooltip-sort-7" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort8} className={selectedSort8 ? `w-16 h-16` : spellSquareVariants}>
                  {selectedSort8 && (
                    <div
                      data-tooltip-id="tooltip-sort-8"
                      data-tooltip-content={`${selectedSort8.nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${selectedSort8.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedSort8.nom}
                      />
                      <Tooltip id="tooltip-sort-8" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort9} className={selectedSort9 ? `w-16 h-16` : spellSquareVariants}>
                  {selectedSort9 && (
                    <div
                      data-tooltip-id="tooltip-sort-9"
                      data-tooltip-content={`${selectedSort9.nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${selectedSort9.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedSort9.nom}
                      />
                      <Tooltip id="tooltip-sort-9" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort10} className={selectedSort10 ? `w-16 h-16` : spellSquareVariants}>
                  {selectedSort10 && (
                    <div
                      data-tooltip-id="tooltip-sort-10"
                      data-tooltip-content={`${selectedSort10.nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${selectedSort10.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedSort10.nom}
                      />
                      <Tooltip id="tooltip-sort-10" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort11} className={selectedSort11 ? `w-16 h-16` : spellSquareVariants}>
                  {selectedSort11 && (
                    <div
                      data-tooltip-id="tooltip-sort-11"
                      data-tooltip-content={`${selectedSort11.nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${selectedSort11.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedSort11.nom}
                      />
                      <Tooltip id="tooltip-sort-11" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort12} className={selectedSort12 ? `w-16 h-16` : spellSquareVariants}>
                  {selectedSort12 && (
                    <div
                      data-tooltip-id="tooltip-sort-12"
                      data-tooltip-content={`${selectedSort12.nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${selectedSort12.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedSort12.nom}
                      />
                      <Tooltip id="tooltip-sort-12" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort13} className={selectedSort13 ? `w-16 h-16` : spellSquareVariants}>
                  {selectedSort13 && (
                    <div
                      data-tooltip-id="tooltip-sort-13"
                      data-tooltip-content={`${selectedSort13.nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${selectedSort13.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedSort13.nom}
                      />
                      <Tooltip id="tooltip-sort-13" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort14} className={selectedSort14 ? `w-16 h-16` : spellSquareVariants}>
                  {selectedSort14 && (
                    <div
                      data-tooltip-id="tooltip-sort-14"
                      data-tooltip-content={`${selectedSort14.nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${selectedSort14.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedSort14.nom}
                      />
                      <Tooltip id="tooltip-sort-14" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort15} className={selectedSort15 ? `w-16 h-16` : spellSquareVariants}>
                  {selectedSort15 && (
                    <div
                      data-tooltip-id="tooltip-sort-15"
                      data-tooltip-content={`${selectedSort15.nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${selectedSort15.image}.png`}
                        width={200}
                        height={200}
                        alt={selectedSort15.nom}
                      />
                      <Tooltip id="tooltip-sort-15" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={handleClickSaveBuild}
        className="mt-4 xl:absolute xl:right-0 xl:bottom-0 p-4 border border-white rounded-lg xl:w-fit w-full flex justify-center hover:cursor-pointer">
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
      <div className="mt-4 xl:absolute xl:left-0 xl:bottom-0 p-4 border border-white rounded-lg xl:w-fit w-full flex justify-center">
        <Link href="import-build">
          <p className="font-bold text-2xl ">Importer</p>
        </Link>
      </div>
      <div>
        <Modal
          open={!!openModalStringBuild}
          onClose={closeModalStringBuild}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
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
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
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
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
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
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
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
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
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
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
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
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
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
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
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
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
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
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
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
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
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
        <Modal
          open={openSortModal1}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort1Change} />
        </Modal>
        <Modal
          open={openSortModal2}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort2Change} />
        </Modal>

        <Modal
          open={openSortModal3}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort3Change} />
        </Modal>

        <Modal
          open={openSortModal4}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort4Change} />
        </Modal>

        <Modal
          open={openSortModal5}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort5Change} />
        </Modal>

        <Modal
          open={openSortModal6}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort6Change} />
        </Modal>

        <Modal
          open={openSortModal7}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort7Change} />
        </Modal>

        <Modal
          open={openSortModal8}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort8Change} />
        </Modal>

        <Modal
          open={openSortModal9}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort9Change} />
        </Modal>

        <Modal
          open={openSortModal10}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort10Change} />
        </Modal>

        <Modal
          open={openSortModal11}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort11Change} />
        </Modal>

        <Modal
          open={openSortModal12}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort12Change} />
        </Modal>

        <Modal
          open={openSortModal13}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort13Change} />
        </Modal>

        <Modal
          open={openSortModal14}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort14Change} />
        </Modal>

        <Modal
          open={openSortModal15}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={false}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={20} height={20} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog onClickSort={handleClickSort} onSelectedSortChange={handleSelectedSort15Change} />
        </Modal>
      </div>
    </main>
  );
};

export default Build;
