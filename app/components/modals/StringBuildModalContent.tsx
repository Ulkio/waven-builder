import React, { useRef } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import Image from "next/image";
import { Build } from "@/types";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
interface StringBuildDialogProps {
  stringBuild: string;
  build: Build;
}

const StringBuildDialog = ({ stringBuild, build }: StringBuildDialogProps) => {
  const ANNEAU_BASE_URL = "/img/anneaux";
  const SORT_BASE_URL = "/img/sorts";
  const BRASSARD_BASE_URL = "/img/brassards";
  const ARME_BASE_URL = "/img/armes";
  const COMPAGNON_BASE_URL = "/img/compagnons";
  const handleClickCopy = () => {
    navigator.clipboard.writeText(stringBuild);
    toast("Copié dans le presse-papier !");
  };

  const onClickBuildDiv = async (e: any) => {
    const buildDiv = document.getElementById("buildDiv");
    const dataUrl = await htmlToImage.toPng(buildDiv!);

    // download image
    const link = document.createElement("a");
    link.download = "html-to-img.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-evenly h-fit gap-4 p-8 xl:px-32">
      <p className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Votre build</p>
      <p className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
        Vous pouvez enregistrer cette image en cliquant dessus !
      </p>
      <div
        id="buildDiv"
        className="border border-white rounded-lg flex xl:flex-row flex-col gap-8 p-4 h-fit hover:cursor-pointer hover:scale-105 duration-200 ease-linear "
        onClick={onClickBuildDiv}>
        <div
          className="h-fit self-center"
          data-tooltip-id={`tooltip-arme`}
          data-tooltip-content={build.arme?.nom}
          data-tooltip-place="bottom">
          <Image
            src={`${ARME_BASE_URL}/${build.arme?.image}.png`}
            alt="arme"
            width={150}
            height={150}
            className=" object-cover"
          />
          <Tooltip id={`tooltip-arme`} className="tooltip z-20 " />
        </div>
        <div className="grid grid-rows-2 grid-cols-2">
          {[...Array(4)].map((_, index) => {
            const anneau = build.anneaux[index];
            return (
              <React.Fragment key={index}>
                {anneau && (
                  <div
                    data-tooltip-id={`tooltip-anneau-${index}`}
                    data-tooltip-content={anneau.nom}
                    data-tooltip-place="bottom"
                    className="flex items-center relative ">
                    <Image
                      src={`/img/utils/bg_${anneau.rarete.toLowerCase()}.png`}
                      alt={anneau.nom}
                      width={100}
                      height={100}
                      className="absolute  object-scale-down"
                    />
                    <Image
                      src={`${ANNEAU_BASE_URL}/${anneau.image}.png`}
                      alt={anneau.nom}
                      width={100}
                      height={100}
                      className=" z-10 object-scale-down"
                    />
                    <Tooltip id={`tooltip-anneau-${index}`} className="tooltip z-20 " />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div
          data-tooltip-id={`tooltip-brassard`}
          data-tooltip-content={build.brassard?.nom}
          data-tooltip-place="bottom"
          className="flex items-start relative h-fit">
          <Image
            src={`/img/utils/bg_${build.brassard?.rarete.toLowerCase()}.png`}
            alt={`bg`}
            width={100}
            height={100}
            className="absolute object-scale-down"
          />
          <Image
            src={`${BRASSARD_BASE_URL}/${build.brassard?.image}.png`}
            width={100}
            height={100}
            className="z-10 object-scale-down"
            alt={`${build.brassard?.nom}`}
          />
          <Tooltip id={`tooltip-brassard`} className="tooltip z-20 " />
        </div>
        <div className="grid grid-rows-2 grid-cols-2">
          {[...Array(4)].map((_, index) => {
            const compagnon = build.compagnons[index];
            return (
              <React.Fragment key={index}>
                {compagnon && (
                  <div
                    data-tooltip-id={`tooltip-compagnon-${index}`}
                    data-tooltip-content={compagnon.nom}
                    data-tooltip-place="bottom"
                    className="flex items-center relative ">
                    <Image
                      src={`/img/utils/cadre_${compagnon.rarete.toLowerCase()}.png`}
                      alt={compagnon.nom}
                      width={100}
                      height={100}
                      className="absolute  object-scale-down"
                    />
                    <Image
                      src={`${COMPAGNON_BASE_URL}/${compagnon.image}.png`}
                      alt={compagnon.nom}
                      width={100}
                      height={100}
                      className=" z-10 object-scale-down"
                    />
                    <Tooltip id={`tooltip-compagnon-${index}`} className="tooltip z-20 " />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className="grid grid-cols-5 grid-rows-3">
          {[...Array(15)].map((_, index) => {
            const sort = build.sorts[index];
            return (
              <React.Fragment key={index}>
                {sort && (
                  <div
                    data-tooltip-id={`tooltip-sort-${index}`}
                    data-tooltip-content={sort.nom}
                    data-tooltip-place="bottom">
                    <Image
                      src={`${SORT_BASE_URL}/${sort.image}.png`}
                      width={60}
                      height={60}
                      alt={sort.nom}
                      className="object-scale-down"
                    />
                    <Tooltip id={`tooltip-sort-${index}`} className="tooltip z-10 " />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Copiez cette suite de caractères pour partager votre build :
      </p>

      <Image
        data-tooltip-id="my-tooltip"
        data-tooltip-content={`Copier le texte`}
        data-tooltip-place="right"
        onClick={handleClickCopy}
        width={32}
        height={32}
        src="/img/copy.png"
        alt="copy"
        className=" rounded-lg invert hover:cursor-pointer self-start"
      />
      <Tooltip id="my-tooltip" />

      <p className="bg-overlaySide overflow-y-auto w-full break-words p-2 rounded-lg border">{stringBuild}</p>
    </div>
  );
};

export default StringBuildDialog;
