import React from "react";
import Image from "next/image";
import { BuildArmeProps } from "@/types";
import Hexagon from "@/components/Hexagon";

const Arme = ({ item, openModal }: BuildArmeProps) => {
  const ARME_BASE_URL = "/img/armes";

  return (
    <>
      {item ? (
        <>
          <Image
            src={`${ARME_BASE_URL}/${item?.image}.png`}
            alt="classe"
            width={200}
            height={200}
            onClick={() => openModal("openArmeModal")}
            className="hover:cursor-pointer"
          />
          <p className="font-black text-3xl">{item?.nom}</p>
          <div className="flex flex-wrap gap-2">
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
    </>
  );
};

export default Arme;
