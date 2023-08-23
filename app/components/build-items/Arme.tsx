import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BuildArmeProps, Passif } from "@/types";
import Hexagon from "@/components/Hexagon";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { useMediaQuery } from "react-responsive";

const Arme = ({ item, openModal, onSelectedPassifChange, buildPassifs, isImported }: BuildArmeProps) => {
  const ARME_BASE_URL = "/img/armes";
  const PASSIFS_BASE_URL = "/img/passifs";
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1280px)" });

  const [passifs, setPassifs] = useState<Passif[]>(buildPassifs);
  const [selectedPassives, setSelectedPassives] = useState<Passif[]>([]);

  const handleClickPassif = (passif: Passif) => {
    if (selectedPassives.length <= 2) {
      if (selectedPassives.some((p) => p.nom === passif.nom)) {
        setSelectedPassives((prev) => prev.filter((selected) => selected.nom != passif.nom));
        return;
      }
    }
    if (selectedPassives.length === 2) return;
    if (passifs.includes(passif)) {
      setPassifs((prev) => prev.filter((selectedPassif) => selectedPassif.nom != passif.nom));
    } else {
      if (passifs.length < 2) {
        setPassifs((prev) => [...passifs, passif]);
        onSelectedPassifChange(passif);
      }
    }
  };

  useEffect(() => {
    setSelectedPassives(buildPassifs);
    return () => {
      setSelectedPassives([]);
    };
  }, [isImported]);

  useEffect(() => {
    console.log(selectedPassives);
  }, [selectedPassives]);

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
                  className={`flex flex-row xl:flex-col items-center w-full hover:cursor-pointer transition-all duration-200 ease-in-out`}
                  key={passif.nom}
                  onClick={() => handleClickPassif(passif)}>
                  <div
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={`${passif.effet}`}
                    data-tooltip-place="bottom"
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
                    {passifs.includes(passif) && (
                      <Image
                        src="/img/passif_bg_highlight.png"
                        width={150}
                        height={150}
                        alt="passif sélectionné"
                        className="absolute"
                      />
                    )}
                    {selectedPassives.some((selectedPassif) => selectedPassif.nom === passif.nom) && (
                      <Image
                        src="/img/passif_bg_highlight.png"
                        width={150}
                        height={150}
                        alt="passif sélectionné"
                        className="absolute"
                      />
                    )}
                    <p className=" absolute text-center text-sm px-8 font-bold">{passif.nom}</p>
                  </div>
                  <Tooltip id="my-tooltip" className="tooltip w-1/2 xl:w-auto" />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <Image
          src="/img/hexagon-chose-arm.png"
          alt="choisis une arme"
          width={isTabletOrMobile ? 200 : 300}
          height={isTabletOrMobile ? 200 : 300}
          priority
          onClick={openModal}
          className="hover:cursor-pointer hover:-translate-y-4 transition duration-200 ease-in-out animate-pulse"
        />
      )}
    </>
  );
};

export default Arme;
