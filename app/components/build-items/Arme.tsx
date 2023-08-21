import React from "react";
import Image from "next/image";
import { BuildArmeProps } from "@/types";
import Hexagon from "@/components/Hexagon";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
const Arme = ({ item, openModal }: BuildArmeProps) => {
  const ARME_BASE_URL = "/img/armes";
  const PASSIFS_BASE_URL = "/img/passifs";

  return (
    <>
      {item ? (
        <>
          <Image
            src={`${ARME_BASE_URL}/${item?.image}.png`}
            alt="classe"
            width={200}
            height={200}
            onClick={openModal}
            className="hover:cursor-pointer"
          />
          <p className="font-black text-3xl">{item?.nom}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
              <Image src="/img/utils/pv.png" width={30} height={30} alt="pv" />
              <p className="font-bold">{item.patchs[0].pv}</p>
            </div>
            <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
              <Image src="/img/utils/at.png" width={30} height={30} alt="atk" />
              <p className="font-bold">{item.patchs[0].at}</p>
            </div>
            <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
              <Image src="/img/utils/cc.png" width={30} height={30} alt="crit" />
              <p className="font-bold">{item.patchs[0].cc}</p>
            </div>
            <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
              <Image src="/img/utils/pm.png" width={30} height={30} alt="pm" />
              <p className="font-bold">{item.patchs[0].pm}</p>
            </div>
          </div>
          <p className="text-center">{item.patchs[0].effet}</p>
          <div className="flex items-center">
            {item.patchs[0].passifs.map((passif) => {
              return (
                <div
                  className="flex flex-row xl:flex-col items-center  w-full hover:cursor-pointer transition-all duration-200 ease-in-out"
                  key={passif.nom}>
                  <div
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={`${passif.effet}`}
                    data-tooltip-place="bottom"
                    data-tooltip-delay-show={100}
                    data-tooltip-delay-hide={200}
                    className="flex relative  items-center justify-center">
                    <Image
                      src={`${PASSIFS_BASE_URL}/${passif.image}.png`}
                      width={100}
                      height={100}
                      alt="bg_passif"
                      className="absolute opacity-30 object-scale-down"
                    />
                    <Image
                      src="/img/passif_bg.png"
                      width={150}
                      height={150}
                      alt="bg_passif"
                      className="object-scale-down"
                    />
                    <p className=" absolute text-center text-sm px-8 font-bold">{passif.nom}</p>
                  </div>
                  <Tooltip id="my-tooltip" className="tooltip" />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <Image
          src="/img/hexagon-chose-arm.png"
          alt="choisis une arme"
          width={200}
          height={200}
          priority
          onClick={openModal}
          className="hover:cursor-pointer hover:-translate-y-4 transition duration-200 ease-in-out animate-pulse"
        />
      )}
    </>
  );
};

export default Arme;
