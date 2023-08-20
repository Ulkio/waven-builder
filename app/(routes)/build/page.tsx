"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Modal } from "react-responsive-modal";
import { AES, enc } from "crypto-js";
import { useMediaQuery } from "react-responsive";
import { ToastContainer, toast } from "react-toastify";
import "react-responsive-modal/styles.css";
import "../../styles/modal.css";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/tooltip.css";
import { Anneau, Arme, Brassard, Compagnon, Build, Sort } from "@/types";
import { ModalComponent } from "@/components/modal-containers/ModalComponent";
import AnneauxModalContent from "@/components/modals/AnneauxModalContent";
import BrassardsModalContent from "@/components/modals/BrassardsModalContent";
import CompagnonsModalContent from "@/components/modals/CompagnonsModalContent";
import ArmesModalContent from "@/components/modals/ArmesModalContent";
import StringBuildModalContent from "@/components/modals/StringBuildModalContent";
import ImportModalContent from "@/components/modals/ImportModalContent";
import SortsModalContent from "@/components/modals/SortsModalContent";
import BrassardItem from "@/components/build-items/Brassard";
import AnneauItem from "@/components/build-items/Anneau";
import CompagnonItem from "@/components/build-items/Compagnon";
import ArmeItem from "@/components/build-items/Arme";
import SortItem from "@/components/build-items/Sort";

const Build = () => {
  //#region CONSTANTS
  const params = useSearchParams();
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
  const [openModalAlert, setOpenModalAlert] = useState<boolean | null>(false);

  //#endregion

  //#region STYLE VARIANTS
  const squareVariants = `bg-black bg-opacity-60  border-4 border-white border-solid h-20 w-20 lg:w-32 lg:h-32 rounded-xl hover:cursor-pointer `;
  const companionSquareVariants = `h-24 w-24  hover:cursor-pointer`;
  const spellSquareVariants = `bg-black opacity-60 border-2 border-white border-solid h-16 w-16 rounded-lg hover:cursor-pointer`;
  const titleVariants = `uppercase italic font-extrabold text-2xl opacity-80 text-white text-sm xl:text-lg`;
  const emptyCompanionVariants = `h-24 bg-[url("/img/utils/cadre_commun.png")]`;
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
  const [openModalStringBuild, setOpenModalStringBuild] = useState<boolean>(false);

  const handleModalToggle = (modalState: string) => {
    if (isTabletOrMobile) return;
    if (modalStates[modalState]) {
      closeModal(modalState);
    } else {
      openModal(modalState);
    }
  };

  const closeModalStringBuild = () => setOpenModalStringBuild(false);
  const closeModalImport = () => setOpenModalImport(false);
  const closeModalAlert = () => setOpenModalAlert(false);

  const modalsConfig = [
    {
      stateName: "openArmeModal",
      dialogComponent: (
        <ArmesModalContent
          onClickArme={() => handleModalToggle(`openArmeModal`)}
          onSelectedArmeChange={handleSelectedArmeChange}
        />
      ),
    },
    {
      stateName: "openAnneau1Modal",
      dialogComponent: (
        <AnneauxModalContent
          onClickAnneau={() => handleModalToggle(`openAnneau1Modal`)}
          onSelectedAnneauChange={handleSelectedAnneau1Change}
        />
      ),
    },
    {
      stateName: "openAnneau2Modal",
      dialogComponent: (
        <AnneauxModalContent
          onClickAnneau={() => handleModalToggle(`openAnneau2Modal`)}
          onSelectedAnneauChange={handleSelectedAnneau2Change}
        />
      ),
    },
    {
      stateName: "openAnneau3Modal",
      dialogComponent: (
        <AnneauxModalContent
          onClickAnneau={() => handleModalToggle(`openAnneau3Modal`)}
          onSelectedAnneauChange={handleSelectedAnneau3Change}
        />
      ),
    },
    {
      stateName: "openAnneau4Modal",
      dialogComponent: (
        <AnneauxModalContent
          onClickAnneau={() => handleModalToggle(`openAnneau4Modal`)}
          onSelectedAnneauChange={handleSelectedAnneau4Change}
        />
      ),
    },
    {
      stateName: "openBrassardModal",
      dialogComponent: (
        <BrassardsModalContent
          onClickBrassard={() => handleModalToggle(`openBrassardModal`)}
          onSelectedBrassardChange={handleSelectedBrassardChange}
        />
      ),
    },
    {
      stateName: "openCompagnon1Modal",
      dialogComponent: (
        <CompagnonsModalContent
          onClickCompagnon={() => handleModalToggle(`openCompagnon1Modal`)}
          onSelectedCompagnonChange={handleSelectedCompagnon1Change}
        />
      ),
    },
    {
      stateName: "openCompagnon2Modal",
      dialogComponent: (
        <CompagnonsModalContent
          onClickCompagnon={() => handleModalToggle(`openCompagnon2Modal`)}
          onSelectedCompagnonChange={handleSelectedCompagnon2Change}
        />
      ),
    },
    {
      stateName: "openCompagnon3Modal",
      dialogComponent: (
        <CompagnonsModalContent
          onClickCompagnon={() => handleModalToggle(`openCompagnon3Modal`)}
          onSelectedCompagnonChange={handleSelectedCompagnon3Change}
        />
      ),
    },
    {
      stateName: "openCompagnon4Modal",
      dialogComponent: (
        <CompagnonsModalContent
          onClickCompagnon={() => handleModalToggle(`openCompagnon4Modal`)}
          onSelectedCompagnonChange={handleSelectedCompagnon4Change}
        />
      ),
    },
    {
      stateName: "openSort1Modal",
      dialogComponent: (
        <SortsModalContent
          onClickSort={() => handleModalToggle(`openSort1Modal`)}
          onSelectedSortChange={handleSelectedSort1Change}
          dieu={build.arme?.dieu}
          arme={build.arme?.nom}
        />
      ),
    },
    {
      stateName: "openSort2Modal",
      dialogComponent: (
        <SortsModalContent
          dieu={build.arme?.dieu}
          arme={build.arme?.nom}
          onClickSort={() => handleModalToggle(`openSort2Modal`)}
          onSelectedSortChange={handleSelectedSort2Change}
        />
      ),
    },
    {
      stateName: "openSort3Modal",
      dialogComponent: (
        <SortsModalContent
          dieu={build.arme?.dieu}
          arme={build.arme?.nom}
          onClickSort={() => handleModalToggle(`openSort3Modal`)}
          onSelectedSortChange={handleSelectedSort3Change}
        />
      ),
    },
    {
      stateName: "openSort4Modal",
      dialogComponent: (
        <SortsModalContent
          dieu={build.arme?.dieu}
          arme={build.arme?.nom}
          onClickSort={() => handleModalToggle(`openSort4Modal`)}
          onSelectedSortChange={handleSelectedSort4Change}
        />
      ),
    },
    {
      stateName: "openSort5Modal",
      dialogComponent: (
        <SortsModalContent
          dieu={build.arme?.dieu}
          arme={build.arme?.nom}
          onClickSort={() => handleModalToggle(`openSort5Modal`)}
          onSelectedSortChange={handleSelectedSort5Change}
        />
      ),
    },
    {
      stateName: "openSort6Modal",
      dialogComponent: (
        <SortsModalContent
          dieu={build.arme?.dieu}
          arme={build.arme?.nom}
          onClickSort={() => handleModalToggle(`openSort6Modal`)}
          onSelectedSortChange={handleSelectedSort6Change}
        />
      ),
    },
    {
      stateName: "openSort7Modal",
      dialogComponent: (
        <SortsModalContent
          dieu={build.arme?.dieu}
          arme={build.arme?.nom}
          onClickSort={() => handleModalToggle(`openSort7Modal`)}
          onSelectedSortChange={handleSelectedSort7Change}
        />
      ),
    },
    {
      stateName: "openSort8Modal",
      dialogComponent: (
        <SortsModalContent
          dieu={build.arme?.dieu}
          arme={build.arme?.nom}
          onClickSort={() => handleModalToggle(`openSort8Modal`)}
          onSelectedSortChange={handleSelectedSort8Change}
        />
      ),
    },
    {
      stateName: "openSort9Modal",
      dialogComponent: (
        <SortsModalContent
          dieu={build.arme?.dieu}
          arme={build.arme?.nom}
          onClickSort={() => handleModalToggle(`openSort9Modal`)}
          onSelectedSortChange={handleSelectedSort9Change}
        />
      ),
    },
    {
      stateName: "openSort10Modal",
      dialogComponent: (
        <SortsModalContent
          dieu={build.arme?.dieu}
          arme={build.arme?.nom}
          onClickSort={() => handleModalToggle(`openSort10Modal`)}
          onSelectedSortChange={handleSelectedSort10Change}
        />
      ),
    },
    {
      stateName: "openSort11Modal",
      dialogComponent: (
        <SortsModalContent
          dieu={build.arme?.dieu}
          arme={build.arme?.nom}
          onClickSort={() => handleModalToggle(`openSort11Modal`)}
          onSelectedSortChange={handleSelectedSort11Change}
        />
      ),
    },
    {
      stateName: "openSort12Modal",
      dialogComponent: (
        <SortsModalContent
          dieu={build.arme?.dieu}
          arme={build.arme?.nom}
          onClickSort={() => handleModalToggle(`openSort12Modal`)}
          onSelectedSortChange={handleSelectedSort12Change}
        />
      ),
    },
    {
      stateName: "openSort13Modal",
      dialogComponent: (
        <SortsModalContent
          dieu={build.arme?.dieu}
          arme={build.arme?.nom}
          onClickSort={() => handleModalToggle(`openSort13Modal`)}
          onSelectedSortChange={handleSelectedSort13Change}
        />
      ),
    },
    {
      stateName: "openSort14Modal",
      dialogComponent: (
        <SortsModalContent
          dieu={build.arme?.dieu}
          arme={build.arme?.nom}
          onClickSort={() => handleModalToggle(`openSort14Modal`)}
          onSelectedSortChange={handleSelectedSort14Change}
        />
      ),
    },
    {
      stateName: "openSort15Modal",
      dialogComponent: (
        <SortsModalContent
          dieu={build.arme?.dieu}
          arme={build.arme?.nom}
          onClickSort={() => handleModalToggle(`openSort15Modal`)}
          onSelectedSortChange={handleSelectedSort15Change}
        />
      ),
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
    <main className=" flex flex-col items-stretch justify-between h-screen xl:p-6 gap-6 ">
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
      {build.arme && !isTabletOrMobile && (
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

      <div className="flex  xl:flex-col xl:px-12 gap-4 justify-between xl:h-full pt-16 xl:pt-24">
        <div className="flex flex-col xl:flex-row w-full gap-8 xl:gap-0">
          <div className="flex   xl:flex-col xl:basis-1/6 xl:px-4">
            <div className="flex  flex-col justify-center  items-center w-full">
              <p className={titleVariants}>Anneaux</p>
              <div className="flex flex-wrap justify-center gap-4 xl:gap-0  xl:flex-col ">
                {[...Array(4)].map((_, index) => {
                  const anneau = build.anneaux[index];
                  return (
                    <AnneauItem
                      key={index}
                      item={anneau}
                      openModal={() => openModal(`openAnneau${index + 1}Modal`)}
                      squareVariants={squareVariants}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex xl:flex-col justify-center xl:justify-start gap-12 xl:basis-1/6">
            <div className="flex flex-wrap xl:flex-nowrap gap-2 xl:gap-0 xl:flex-col">
              <div className="flex flex-col  justify-center  items-center ">
                <p className={titleVariants}>Brassard</p>
                <BrassardItem
                  item={build.brassard!}
                  openModal={() => openModal("openBrassardModal")}
                  squareVariants={squareVariants}
                />
              </div>
              <div className="flex flex-col  justify-center  items-center">
                <p className={titleVariants}>Broche</p>
                <div className="flex flex-col" onClick={() => toast("À venir !")}>
                  <div className={`flex items-center justify-center relative ${squareVariants}`}></div>
                  <p className="text-center py-2"></p>
                </div>
              </div>
              <div className="flex flex-col  justify-center  items-center">
                <p className={titleVariants}>Familier</p>
                <div className="flex flex-col" onClick={() => toast("À venir !")}>
                  <div className={`flex items-center justify-center relative ${squareVariants}`}></div>
                  <p className="text-center py-2"></p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col xl:basis-2/6 xl:px-4 ">
            <div className="flex flex-col   items-center gap-2">
              <ArmeItem item={build.arme!} openModal={() => openModal("openArmeModal")} />
            </div>
          </div>
          <div className="flex flex-col xl:basis-2/6 xl:px-4   gap-16">
            <div className="flex flex-col gap-2 xl:px-4 items-center xl:items-start">
              <p className={titleVariants}>Compagnons</p>
              <div className="flex flex-row flex-wrap gap-4 justify-center">
                {[...Array(4)].map((_, index) => {
                  const compagnon = build.compagnons[index];
                  return (
                    <CompagnonItem
                      key={index}
                      index={index}
                      companionSquareVariants={companionSquareVariants}
                      emptyCompanionVariants={emptyCompanionVariants}
                      item={compagnon}
                      openModal={() => openModal(`openCompagnon${index + 1}Modal`)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2 xl:px-4 xl:items-start items-center ">
              <p className={titleVariants}>Sorts</p>
              {!build.arme ? (
                <p className="text-md italic opacity-50">Sélectionnez une arme !</p>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 max-w-96 justify-center xl:justify-start">
                    {[...Array(15)].map((_, index) => {
                      const sort = build.sorts[index];
                      return (
                        <SortItem
                          key={index}
                          index={index}
                          item={sort}
                          openModal={() => openModal(`openSort${index + 1}Modal`)}
                          spellSquareVariants={spellSquareVariants}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col   xl:flex-row w-full  gap-4 xl:gap-20 xl:self-center justify-center items-center">
        <div onClick={handleClickSaveBuild} className="hover:cursor-pointer">
          <p className="font-bold text-2xl border border-white rounded-lg p-4 w-48 text-center">Sauvegarder</p>
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
          <p className="font-bold text-2xl border border-white rounded-lg p-4  w-48  text-center">Importer</p>
        </div>
      </div>

      {/* Modals */}
      <div>
        <Modal
          open={!!openModalStringBuild}
          onClose={closeModalStringBuild}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={50} height={50} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModalImport",
            root: "scrollbar-none",
          }}>
          <StringBuildModalContent stringBuild={encryptedBuild} build={build} />
        </Modal>
        <Modal
          open={!!openModalImport}
          onClose={closeModalImport}
          center
          closeOnOverlayClick={true}
          showCloseIcon={true}
          closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={50} height={50} />}
          classNames={{
            overlay: "customOverlay",
            modal: "customModalImport",
            root: "scrollbar-none",
          }}>
          <ImportModalContent onClickButton={handleImportButtonClick} />
        </Modal>
        <Modal
          open={!!openModalAlert}
          onClose={closeModalAlert}
          center
          closeOnOverlayClick={true}
          showCloseIcon={false}
          classNames={{
            overlay: "customOverlay",
            modal: "customModalAlert",
            root: "scrollbar-none",
          }}>
          <div className="flex flex-col justify-evenly items-center h-full ">
            <p className="text-center text-lg px-16">
              Les données sont celles de la démo. Une mise à jour arrive prochainement.
            </p>
            <button onClick={closeModalAlert} className="border-2 border-white rounded-lg p-2 w-24 text-lg font-bold">
              OK
            </button>
          </div>
        </Modal>
        {modalsConfig.map((config, index) => (
          <ModalComponent
            key={index}
            open={modalStates[config.stateName]}
            onClose={() => closeModal(config.stateName)}
            dialogComponent={config.dialogComponent}
          />
        ))}
      </div>
    </main>
  );
};

export default Build;
