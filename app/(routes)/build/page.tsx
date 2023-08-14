"use client";
import Hexagon from "@/components/Hexagon";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
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
import ImportDialog from "@/components/modals/ImportDialog";
import Link from "next/link";
import SortsDialog from "@/components/modals/SortsDialog";
import { Tooltip } from "react-tooltip";
import "../../styles/tooltip.css";
import { motion } from "framer-motion";

const Build = () => {
  ////////////////////////////////TODO////////////////////////////////

  //#region CONSTANTS
  const params = useSearchParams();
  const importType = params.get("import");
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

  //#region SELECTABLES
  const handleSelectedArmeChange = (selectedArme: Arme) => {
    setBuild((prev) => ({ ...prev, arme: selectedArme }));
  };
  const handleSelectedBrassardChange = (selectedBrassard: Brassard) => {
    setBuild((prev) => ({ ...prev, brassard: selectedBrassard }));
  };
  const handleSelectedCompagnon1Change = (selected: Compagnon) => {
    setBuild((prev) => ({
      ...prev,
      compagnons: [selected, prev.compagnons[1], prev.compagnons[2], prev.compagnons[3]],
    }));
  };

  const handleSelectedCompagnon2Change = (selected: Compagnon) => {
    setBuild((prev) => ({
      ...prev,
      compagnons: [prev.compagnons[0], selected, prev.compagnons[2], prev.compagnons[3]],
    }));
  };

  const handleSelectedCompagnon3Change = (selected: Compagnon) => {
    setBuild((prev) => ({
      ...prev,
      compagnons: [prev.compagnons[0], prev.compagnons[1], selected, prev.compagnons[3]],
    }));
  };

  const handleSelectedCompagnon4Change = (selected: Compagnon) => {
    setBuild((prev) => ({
      ...prev,
      compagnons: [prev.compagnons[0], prev.compagnons[1], prev.compagnons[2], selected],
    }));
  };
  const handleSelectedAnneau1Change = (selected: Anneau) => {
    setBuild((prev) => ({
      ...prev,
      anneaux: [selected, prev.anneaux[1], prev.anneaux[2], prev.anneaux[3]],
    }));
  };
  const handleSelectedAnneau2Change = (selected: Anneau) => {
    setBuild((prev) => ({
      ...prev,
      anneaux: [prev.anneaux[0], selected, prev.anneaux[2], prev.anneaux[3]],
    }));
  };

  const handleSelectedAnneau3Change = (selected: Anneau) => {
    setBuild((prev) => ({
      ...prev,
      anneaux: [prev.anneaux[0], prev.anneaux[1], selected, prev.anneaux[3]],
    }));
  };

  const handleSelectedAnneau4Change = (selected: Anneau) => {
    setBuild((prev) => ({
      ...prev,
      anneaux: [prev.anneaux[0], prev.anneaux[1], prev.anneaux[2], selected],
    }));
  };
  const handleSelectedSort1Change = (selected: Sort) => {
    setBuild((prev) => ({
      ...prev,
      sorts: [
        selected,
        prev.sorts[1],
        prev.sorts[2],
        prev.sorts[3],
        prev.sorts[4],
        prev.sorts[5],
        prev.sorts[6],
        prev.sorts[7],
        prev.sorts[8],
        prev.sorts[9],
        prev.sorts[10],
        prev.sorts[11],
        prev.sorts[12],
        prev.sorts[13],
        prev.sorts[14],
      ],
    }));
  };
  const handleSelectedSort2Change = (selected: Sort) => {
    setBuild((prev) => ({
      ...prev,
      sorts: [
        prev.sorts[0],
        selected,
        prev.sorts[2],
        prev.sorts[3],
        prev.sorts[4],
        prev.sorts[5],
        prev.sorts[6],
        prev.sorts[7],
        prev.sorts[8],
        prev.sorts[9],
        prev.sorts[10],
        prev.sorts[11],
        prev.sorts[12],
        prev.sorts[13],
        prev.sorts[14],
      ],
    }));
  };
  const handleSelectedSort3Change = (selected: Sort) => {
    setBuild((prev) => ({
      ...prev,
      sorts: [
        prev.sorts[0],
        prev.sorts[1],
        selected,
        prev.sorts[3],
        prev.sorts[4],
        prev.sorts[5],
        prev.sorts[6],
        prev.sorts[7],
        prev.sorts[8],
        prev.sorts[9],
        prev.sorts[10],
        prev.sorts[11],
        prev.sorts[12],
        prev.sorts[13],
        prev.sorts[14],
      ],
    }));
  };
  const handleSelectedSort4Change = (selected: Sort) => {
    setBuild((prev) => ({
      ...prev,
      sorts: [
        prev.sorts[0],
        prev.sorts[1],
        prev.sorts[2],
        selected,
        prev.sorts[4],
        prev.sorts[5],
        prev.sorts[6],
        prev.sorts[7],
        prev.sorts[8],
        prev.sorts[9],
        prev.sorts[10],
        prev.sorts[11],
        prev.sorts[12],
        prev.sorts[13],
        prev.sorts[14],
      ],
    }));
  };
  const handleSelectedSort5Change = (selected: Sort) => {
    setBuild((prev) => ({
      ...prev,
      sorts: [
        prev.sorts[0],
        prev.sorts[1],
        prev.sorts[2],
        prev.sorts[3],
        selected,
        prev.sorts[5],
        prev.sorts[6],
        prev.sorts[7],
        prev.sorts[8],
        prev.sorts[9],
        prev.sorts[10],
        prev.sorts[11],
        prev.sorts[12],
        prev.sorts[13],
        prev.sorts[14],
      ],
    }));
  };
  const handleSelectedSort6Change = (selected: Sort) => {
    setBuild((prev) => ({
      ...prev,
      sorts: [
        prev.sorts[0],
        prev.sorts[1],
        prev.sorts[2],
        prev.sorts[3],
        prev.sorts[4],
        selected,
        prev.sorts[6],
        prev.sorts[7],
        prev.sorts[8],
        prev.sorts[9],
        prev.sorts[10],
        prev.sorts[11],
        prev.sorts[12],
        prev.sorts[13],
        prev.sorts[14],
      ],
    }));
  };
  const handleSelectedSort7Change = (selected: Sort) => {
    setBuild((prev) => ({
      ...prev,
      sorts: [
        prev.sorts[0],
        prev.sorts[1],
        prev.sorts[2],
        prev.sorts[3],
        prev.sorts[4],
        prev.sorts[5],
        selected,
        prev.sorts[7],
        prev.sorts[8],
        prev.sorts[9],
        prev.sorts[10],
        prev.sorts[11],
        prev.sorts[12],
        prev.sorts[13],
        prev.sorts[14],
      ],
    }));
  };
  const handleSelectedSort8Change = (selected: Sort) => {
    setBuild((prev) => ({
      ...prev,
      sorts: [
        prev.sorts[0],
        prev.sorts[1],
        prev.sorts[2],
        prev.sorts[3],
        prev.sorts[4],
        prev.sorts[5],
        prev.sorts[6],
        selected,
        prev.sorts[8],
        prev.sorts[9],
        prev.sorts[10],
        prev.sorts[11],
        prev.sorts[12],
        prev.sorts[13],
        prev.sorts[14],
      ],
    }));
  };
  const handleSelectedSort9Change = (selected: Sort) => {
    setBuild((prev) => ({
      ...prev,
      sorts: [
        prev.sorts[0],
        prev.sorts[1],
        prev.sorts[2],
        prev.sorts[3],
        prev.sorts[4],
        prev.sorts[5],
        prev.sorts[6],
        prev.sorts[7],
        selected,
        prev.sorts[9],
        prev.sorts[10],
        prev.sorts[11],
        prev.sorts[12],
        prev.sorts[13],
        prev.sorts[14],
      ],
    }));
  };
  const handleSelectedSort10Change = (selected: Sort) => {
    setBuild((prev) => ({
      ...prev,
      sorts: [
        prev.sorts[0],
        prev.sorts[1],
        prev.sorts[2],
        prev.sorts[3],
        prev.sorts[4],
        prev.sorts[5],
        prev.sorts[6],
        prev.sorts[7],
        prev.sorts[8],
        selected,
        prev.sorts[10],
        prev.sorts[11],
        prev.sorts[12],
        prev.sorts[13],
        prev.sorts[14],
      ],
    }));
  };
  const handleSelectedSort11Change = (selected: Sort) => {
    setBuild((prev) => ({
      ...prev,
      sorts: [
        prev.sorts[0],
        prev.sorts[1],
        prev.sorts[2],
        prev.sorts[3],
        prev.sorts[4],
        prev.sorts[5],
        prev.sorts[6],
        prev.sorts[7],
        prev.sorts[8],
        prev.sorts[9],
        selected,
        prev.sorts[11],
        prev.sorts[12],
        prev.sorts[13],
        prev.sorts[14],
      ],
    }));
  };
  const handleSelectedSort12Change = (selected: Sort) => {
    setBuild((prev) => ({
      ...prev,
      sorts: [
        prev.sorts[0],
        prev.sorts[1],
        prev.sorts[2],
        prev.sorts[3],
        prev.sorts[4],
        prev.sorts[5],
        prev.sorts[6],
        prev.sorts[7],
        prev.sorts[8],
        prev.sorts[9],
        prev.sorts[10],
        selected,
        prev.sorts[12],
        prev.sorts[13],
        prev.sorts[14],
      ],
    }));
  };
  const handleSelectedSort13Change = (selected: Sort) => {
    setBuild((prev) => ({
      ...prev,
      sorts: [
        prev.sorts[0],
        prev.sorts[1],
        prev.sorts[2],
        prev.sorts[3],
        prev.sorts[4],
        prev.sorts[5],
        prev.sorts[6],
        prev.sorts[7],
        prev.sorts[8],
        prev.sorts[9],
        prev.sorts[10],
        prev.sorts[11],
        selected,
        prev.sorts[13],
        prev.sorts[14],
      ],
    }));
  };

  const handleSelectedSort14Change = (selected: Sort) => {
    setBuild((prev) => ({
      ...prev,
      sorts: [
        prev.sorts[0],
        prev.sorts[1],
        prev.sorts[2],
        prev.sorts[3],
        prev.sorts[4],
        prev.sorts[5],
        prev.sorts[6],
        prev.sorts[7],
        prev.sorts[8],
        prev.sorts[9],
        prev.sorts[10],
        prev.sorts[11],
        prev.sorts[12],
        selected,
        prev.sorts[14],
      ],
    }));
  };
  const handleSelectedSort15Change = (selected: Sort) => {
    setBuild((prev) => ({
      ...prev,
      sorts: [
        prev.sorts[0],
        prev.sorts[1],
        prev.sorts[2],
        prev.sorts[3],
        prev.sorts[4],
        prev.sorts[5],
        prev.sorts[6],
        prev.sorts[7],
        prev.sorts[8],
        prev.sorts[9],
        prev.sorts[10],
        prev.sorts[11],
        prev.sorts[12],
        prev.sorts[13],
        selected,
      ],
    }));
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
  const closeModalImport = () => {
    setOpenModalImport(false);
  };
  //#endregion

  //#region FUNCTIONS
  const handleImportBuild = () => {
    setOpenModalImport(true);
  };
  const handleClickSaveBuild = () => {
    const AnneauxArray = [build.anneaux[0], build.anneaux[1], build.anneaux[2], build.anneaux[3]] as Anneau[];
    const compagnonsArray = [
      build.compagnons[0],
      build.compagnons[1],
      build.compagnons[2],
      build.compagnons[3],
    ] as Compagnon[];
    const SortsArray = [
      build.sorts[0],
      build.sorts[1],
      build.sorts[2],
      build.sorts[3],
      build.sorts[4],
      build.sorts[5],
      build.sorts[6],
      build.sorts[7],
      build.sorts[8],
      build.sorts[9],
      build.sorts[10],
      build.sorts[12],
      build.sorts[13],
      build.sorts[14],
    ] as Sort[];
    setBuild({
      arme: build.arme,
      brassard: build.brassard,
      anneaux: AnneauxArray,
      compagnons: compagnonsArray,
      sorts: SortsArray,
    });

    if (build.arme) {
      setOpenModalStringBuild(true);
      const stringBuild = JSON.stringify(build);
      const encrypted = AES.encrypt(stringBuild, buildKey).toString();
      setEncryptedBuild(encrypted);
    } else {
      toast("Veuillez sélectionner une arme");
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
  useEffect(() => {
    if (!params.get("import")) return;
    setOpenModalImport(!openModalImport);
    return () => {
      setOpenModalImport(!openModalImport);
    };
  }, [params]);
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
                <div className="flex  flex-col ">
                  <div
                    className={`flex items-center justify-center relative ${!build.anneaux[0] && squareVariants}`}
                    onClick={onOpenModalAnneau1}>
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
                </div>
                <div className="flex flex-col ">
                  <div
                    className={`flex items-center justify-center relative ${!build.anneaux[1] && squareVariants}`}
                    onClick={onOpenModalAnneau2}>
                    {!build.anneaux[1] && (
                      <Image
                        src={`/img/utils/generic_ring.png`}
                        width={100}
                        height={100}
                        alt="generic ring"
                        className="object-scale-down opacity-50 "
                      />
                    )}

                    {build.anneaux[1] && (
                      <div className={`flex flex-col  items-center w-32 h-32 relative`}>
                        <Image
                          src={`/img/utils/bg_${build.anneaux[1].rarete.toLowerCase()}.png`}
                          alt={build.anneaux[1].nom}
                          width={150}
                          height={150}
                          className="absolute hover:cursor-pointer"
                        />
                        <Image
                          src={`${ANNEAU_BASE_URL}/${build.anneaux[1].image}.png`}
                          alt={build.anneaux[1].nom}
                          width={150}
                          height={150}
                          className="hover:cursor-pointer z-10"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-center py-2">{build.anneaux[1]?.nom}</p>
                </div>
                <div className="flex flex-col ">
                  <div
                    className={`flex items-center justify-center relative ${!build.anneaux[2] && squareVariants}`}
                    onClick={onOpenModalAnneau3}>
                    {!build.anneaux[2] && (
                      <Image
                        src={`/img/utils/generic_ring.png`}
                        width={100}
                        height={100}
                        alt="generic ring"
                        className="object-scale-down opacity-50 "
                      />
                    )}
                    {build.anneaux[2] && (
                      <div className={`flex flex-col  items-center w-32 h-32 relative`}>
                        <Image
                          src={`/img/utils/bg_${build.anneaux[2].rarete.toLowerCase()}.png`}
                          alt={build.anneaux[2].nom}
                          width={150}
                          height={150}
                          className="absolute hover:cursor-pointer"
                        />
                        <Image
                          src={`${ANNEAU_BASE_URL}/${build.anneaux[2].image}.png`}
                          alt={build.anneaux[2].nom}
                          width={150}
                          height={150}
                          className="hover:cursor-pointer z-10"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-center py-2">{build.anneaux[2]?.nom}</p>
                </div>
                <div className="flex flex-col ">
                  <div
                    className={`flex items-center justify-center relative ${!build.anneaux[3] && squareVariants}`}
                    onClick={onOpenModalAnneau4}>
                    {!build.anneaux[3] && (
                      <Image
                        src={`/img/utils/generic_ring.png`}
                        width={100}
                        height={100}
                        alt="generic ring"
                        className="object-scale-down opacity-50"
                      />
                    )}
                    {build.anneaux[3] && (
                      <div className={`flex flex-col  items-center w-32 h-32 relative`}>
                        <Image
                          src={`/img/utils/bg_${build.anneaux[3].rarete.toLowerCase()}.png`}
                          alt={build.anneaux[3].nom}
                          width={150}
                          height={150}
                          className="absolute hover:cursor-pointer"
                        />
                        <Image
                          src={`${ANNEAU_BASE_URL}/${build.anneaux[3].image}.png`}
                          alt={build.anneaux[3].nom}
                          width={150}
                          height={150}
                          className="hover:cursor-pointer z-10"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-center py-2">{build.anneaux[3]?.nom}</p>
                </div>
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
                    onClick={onOpenModalBrassard}>
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
                    onClick={onOpenModalArmes}
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
                  onClick={onOpenModalArmes}
                  className="hover:cursor-pointer hover:-translate-y-4 transition duration-200 ease-in-out animate-pulse"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col xl:basis-2/6 px-4  xl:h-full gap-8">
            <div className="flex flex-col gap-2 px-4 items-center xl:items-start">
              <p className={titleVariants}>Compagnons</p>
              <div className="flex flex-row flex-wrap gap-4 justify-center">
                <div
                  className={`bg-contain h-28 w-28 hover:cursor-pointer ${
                    build.compagnons[0] ? companionSquareVariants : emptyCompanionVariants
                  }`}
                  onClick={onOpenModalCompagnon1}>
                  {build.compagnons[0] && (
                    <div className="flex items-center relative">
                      <Image
                        src={`/img/utils/cadre_${build.compagnons[0].rarete.toLowerCase()}.png`}
                        alt={build.compagnons[0].rarete.toLowerCase()}
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
                  <p className="text-center">{build.compagnons[0]?.nom}</p>
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
                  <p className="text-center">{build.compagnons[1]?.nom}</p>
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
                  <p className="text-center">{build.compagnons[2]?.nom}</p>
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
                  <p className="text-center">{build.compagnons[3]?.nom}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 px-4 ">
              <p className={titleVariants}>Sorts</p>
              <div className="flex flex-wrap gap-2 max-w-96">
                <div onClick={onOpenModalSort1} className={build.sorts[0] ? `w-16 h-16` : spellSquareVariants}>
                  {build.sorts[0] && (
                    <div
                      data-tooltip-id="tooltip-sort-1"
                      data-tooltip-content={`${build.sorts[0].nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${build.sorts[0].image}.png`}
                        width={200}
                        height={200}
                        alt={build.sorts[0].nom}
                      />
                      <Tooltip id="tooltip-sort-1" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort2} className={build.sorts[1] ? `w-16 h-16` : spellSquareVariants}>
                  {build.sorts[1] && (
                    <div
                      data-tooltip-id="tooltip-sort-2"
                      data-tooltip-content={`${build.sorts[1].nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${build.sorts[1].image}.png`}
                        width={200}
                        height={200}
                        alt={build.sorts[1].nom}
                      />
                      <Tooltip id="tooltip-sort-2" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort3} className={build.sorts[2] ? `w-16 h-16` : spellSquareVariants}>
                  {build.sorts[2] && (
                    <div
                      data-tooltip-id="tooltip-sort-3"
                      data-tooltip-content={`${build.sorts[2].nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${build.sorts[2].image}.png`}
                        width={200}
                        height={200}
                        alt={build.sorts[2].nom}
                      />
                      <Tooltip id="tooltip-sort-3" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort4} className={build.sorts[3] ? `w-16 h-16` : spellSquareVariants}>
                  {build.sorts[3] && (
                    <div
                      data-tooltip-id="tooltip-sort-4"
                      data-tooltip-content={`${build.sorts[3].nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${build.sorts[3].image}.png`}
                        width={200}
                        height={200}
                        alt={build.sorts[3].nom}
                      />
                      <Tooltip id="tooltip-sort-4" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort5} className={build.sorts[4] ? `w-16 h-16` : spellSquareVariants}>
                  {build.sorts[4] && (
                    <div
                      data-tooltip-id="tooltip-sort-5"
                      data-tooltip-content={`${build.sorts[4].nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${build.sorts[4].image}.png`}
                        width={200}
                        height={200}
                        alt={build.sorts[4].nom}
                      />
                      <Tooltip id="tooltip-sort-5" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort6} className={build.sorts[5] ? `w-16 h-16` : spellSquareVariants}>
                  {build.sorts[5] && (
                    <div
                      data-tooltip-id="tooltip-sort-6"
                      data-tooltip-content={`${build.sorts[5].nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${build.sorts[5].image}.png`}
                        width={200}
                        height={200}
                        alt={build.sorts[5].nom}
                      />
                      <Tooltip id="tooltip-sort-6" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort7} className={build.sorts[6] ? `w-16 h-16` : spellSquareVariants}>
                  {build.sorts[6] && (
                    <div
                      data-tooltip-id="tooltip-sort-7"
                      data-tooltip-content={`${build.sorts[6].nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${build.sorts[6].image}.png`}
                        width={200}
                        height={200}
                        alt={build.sorts[6].nom}
                      />
                      <Tooltip id="tooltip-sort-7" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort8} className={build.sorts[7] ? `w-16 h-16` : spellSquareVariants}>
                  {build.sorts[7] && (
                    <div
                      data-tooltip-id="tooltip-sort-8"
                      data-tooltip-content={`${build.sorts[7].nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${build.sorts[7].image}.png`}
                        width={200}
                        height={200}
                        alt={build.sorts[7].nom}
                      />
                      <Tooltip id="tooltip-sort-8" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort9} className={build.sorts[8] ? `w-16 h-16` : spellSquareVariants}>
                  {build.sorts[8] && (
                    <div
                      data-tooltip-id="tooltip-sort-9"
                      data-tooltip-content={`${build.sorts[8].nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${build.sorts[8].image}.png`}
                        width={200}
                        height={200}
                        alt={build.sorts[8].nom}
                      />
                      <Tooltip id="tooltip-sort-9" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort10} className={build.sorts[9] ? `w-16 h-16` : spellSquareVariants}>
                  {build.sorts[9] && (
                    <div
                      data-tooltip-id="tooltip-sort-10"
                      data-tooltip-content={`${build.sorts[9].nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${build.sorts[9].image}.png`}
                        width={200}
                        height={200}
                        alt={build.sorts[9].nom}
                      />
                      <Tooltip id="tooltip-sort-10" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort11} className={build.sorts[10] ? `w-16 h-16` : spellSquareVariants}>
                  {build.sorts[10] && (
                    <div
                      data-tooltip-id="tooltip-sort-11"
                      data-tooltip-content={`${build.sorts[10].nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${build.sorts[10].image}.png`}
                        width={200}
                        height={200}
                        alt={build.sorts[10].nom}
                      />
                      <Tooltip id="tooltip-sort-11" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort12} className={build.sorts[11] ? `w-16 h-16` : spellSquareVariants}>
                  {build.sorts[11] && (
                    <div
                      data-tooltip-id="tooltip-sort-12"
                      data-tooltip-content={`${build.sorts[11].nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${build.sorts[11].image}.png`}
                        width={200}
                        height={200}
                        alt={build.sorts[11].nom}
                      />
                      <Tooltip id="tooltip-sort-12" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort13} className={build.sorts[12] ? `w-16 h-16` : spellSquareVariants}>
                  {build.sorts[12] && (
                    <div
                      data-tooltip-id="tooltip-sort-13"
                      data-tooltip-content={`${build.sorts[12].nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${build.sorts[12].image}.png`}
                        width={200}
                        height={200}
                        alt={build.sorts[12].nom}
                      />
                      <Tooltip id="tooltip-sort-13" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort14} className={build.sorts[13] ? `w-16 h-16` : spellSquareVariants}>
                  {build.sorts[13] && (
                    <div
                      data-tooltip-id="tooltip-sort-14"
                      data-tooltip-content={`${build.sorts[13].nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${build.sorts[13].image}.png`}
                        width={200}
                        height={200}
                        alt={build.sorts[13].nom}
                      />
                      <Tooltip id="tooltip-sort-14" className="tooltip z-10 " />
                    </div>
                  )}
                </div>
                <div onClick={onOpenModalSort15} className={build.sorts[14] ? `w-16 h-16` : spellSquareVariants}>
                  {build.sorts[14] && (
                    <div
                      data-tooltip-id="tooltip-sort-15"
                      data-tooltip-content={`${build.sorts[14].nom}`}
                      data-tooltip-place="bottom"
                      className="flex items-center relative">
                      <Image
                        src={`${SORT_BASE_URL}/${build.sorts[14].image}.png`}
                        width={200}
                        height={200}
                        alt={build.sorts[14].nom}
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
        <Modal
          open={openArmeModal}
          onClose={onCloseModalArme}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
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
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
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
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
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
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
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
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
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
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
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
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
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
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
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
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
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
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
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
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog
            dieu={build.arme?.dieu}
            arme={build.arme?.nom}
            onClickSort={handleClickSort}
            onSelectedSortChange={handleSelectedSort1Change}
          />
        </Modal>
        <Modal
          open={openSortModal2}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog
            dieu={build.arme?.dieu}
            arme={build.arme?.nom}
            onClickSort={handleClickSort}
            onSelectedSortChange={handleSelectedSort2Change}
          />
        </Modal>

        <Modal
          open={openSortModal3}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog
            dieu={build.arme?.dieu}
            arme={build.arme?.nom}
            onClickSort={handleClickSort}
            onSelectedSortChange={handleSelectedSort3Change}
          />
        </Modal>

        <Modal
          open={openSortModal4}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog
            dieu={build.arme?.dieu}
            arme={build.arme?.nom}
            onClickSort={handleClickSort}
            onSelectedSortChange={handleSelectedSort4Change}
          />
        </Modal>

        <Modal
          open={openSortModal5}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog
            dieu={build.arme?.dieu}
            arme={build.arme?.nom}
            onClickSort={handleClickSort}
            onSelectedSortChange={handleSelectedSort5Change}
          />
        </Modal>

        <Modal
          open={openSortModal6}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog
            dieu={build.arme?.dieu}
            arme={build.arme?.nom}
            onClickSort={handleClickSort}
            onSelectedSortChange={handleSelectedSort6Change}
          />
        </Modal>

        <Modal
          open={openSortModal7}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog
            dieu={build.arme?.dieu}
            arme={build.arme?.nom}
            onClickSort={handleClickSort}
            onSelectedSortChange={handleSelectedSort7Change}
          />
        </Modal>

        <Modal
          open={openSortModal8}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog
            dieu={build.arme?.dieu}
            arme={build.arme?.nom}
            onClickSort={handleClickSort}
            onSelectedSortChange={handleSelectedSort8Change}
          />
        </Modal>

        <Modal
          open={openSortModal9}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog
            dieu={build.arme?.dieu}
            arme={build.arme?.nom}
            onClickSort={handleClickSort}
            onSelectedSortChange={handleSelectedSort9Change}
          />
        </Modal>

        <Modal
          open={openSortModal10}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog
            dieu={build.arme?.dieu}
            arme={build.arme?.nom}
            onClickSort={handleClickSort}
            onSelectedSortChange={handleSelectedSort10Change}
          />
        </Modal>

        <Modal
          open={openSortModal11}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog
            dieu={build.arme?.dieu}
            arme={build.arme?.nom}
            onClickSort={handleClickSort}
            onSelectedSortChange={handleSelectedSort11Change}
          />
        </Modal>

        <Modal
          open={openSortModal12}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog
            dieu={build.arme?.dieu}
            arme={build.arme?.nom}
            onClickSort={handleClickSort}
            onSelectedSortChange={handleSelectedSort12Change}
          />
        </Modal>

        <Modal
          open={openSortModal13}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog
            dieu={build.arme?.dieu}
            arme={build.arme?.nom}
            onClickSort={handleClickSort}
            onSelectedSortChange={handleSelectedSort13Change}
          />
        </Modal>

        <Modal
          open={openSortModal14}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog
            dieu={build.arme?.dieu}
            arme={build.arme?.nom}
            onClickSort={handleClickSort}
            onSelectedSortChange={handleSelectedSort14Change}
          />
        </Modal>

        <Modal
          open={openSortModal15}
          onClose={onCloseModalSort}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            root: "scrollbar-none",
          }}>
          <SortsDialog
            dieu={build.arme?.dieu}
            arme={build.arme?.nom}
            onClickSort={handleClickSort}
            onSelectedSortChange={handleSelectedSort15Change}
          />
        </Modal>
      </div>
    </main>
  );
};

export default Build;
