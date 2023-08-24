import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { useMediaQuery } from "react-responsive";
import { BuildArmeProps, Passif, PassifValues } from "@/types";

const ARME_BASE_URL = "/img/armes";
const PASSIFS_BASE_URL = "/img/passifs";

type PassifType = "pv_50" | "pv_25" | "pv_12" | "pv_5" | "at_50" | "at_20" | "at_7" | "at_3";
const passifValuesInitialState: PassifValues = {
  pv_50: 0,
  pv_25: 0,
  pv_12: 0,
  pv_5: 0,
  at_50: 0,
  at_20: 0,
  at_7: 0,
  at_3: 0,
};

const Arme = ({
  item,
  openModal,
  onSelectedPassifChange,
  onLevelChange,
  buildPassifs,
  isImported,
  build,
}: BuildArmeProps) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1280px)" });

  const [passifs, setPassifs] = useState<Passif[]>(buildPassifs);
  const [selectedPassives, setSelectedPassives] = useState<Passif[]>([]);
  const [passifAtk_50, setPassifAtk_50] = useState(0);
  const [passifAtk_20, setPassifAtk_20] = useState(0);
  const [passifAtk_7, setPassifAtk_7] = useState(0);
  const [passifAtk_3, setPassifAtk_3] = useState(0);
  const [passifPv_50, setPassifPv_50] = useState(0);
  const [passifPv_25, setPassifPv_25] = useState(0);
  const [passifPv_12, setPassifPv_12] = useState(0);
  const [passifPv_5, setPassifPv_5] = useState(0);
  const [level, setLevel] = useState(1);
  const [scaledBuildStats, setScaledBuildStats] = useState({
    at: build?.arme?.patchs[0].at || 0,
    pv: build?.arme?.patchs[0].pv || 0,
    cc: 0,
  });
  const [itemsStats, setItemsStats] = useState({
    totalAt: 0,
    totalPv: 0,
  });
  const [totalPvPercentage, setTotalPvPercentage] = useState(100); // Initialize to 100%
  const [totalAtPercentage, setTotalAtPercentage] = useState(100); // Initialize to 100%
  const [passifValues, setPassifValues] = useState<PassifValues>(passifValuesInitialState);

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

  const handleLevelChange = (level: number) => {
    setLevel(level);
    onLevelChange(level);
  };

  useEffect(() => {
    setSelectedPassives(buildPassifs);
    return () => {
      setSelectedPassives([]);
    };
  }, [isImported, buildPassifs]);

  useEffect(() => {
    if (item?.patchs && item.patchs[0]) {
      setScaledBuildStats({
        at: item.patchs[0].at || 0,
        pv: item.patchs[0].pv || 0,
        cc: item.patchs[0].cc || 0,
      });
    }
  }, [item]);

  useEffect(() => {
    const rings = build.anneaux;
    const brassard = build.brassard;
    let totalAttaque = 0;
    let totalPv = 0;

    rings.forEach((ring) => {
      const ringStat1 = ring?.patchs[0].caracteristiques[0];
      if (ringStat1?.effet.toLowerCase().includes("attaque")) {
        totalAttaque += ring?.patchs[0].caracteristiques[0].taux;
      }
      if (ringStat1?.effet.toLowerCase().includes("vie")) {
        totalPv += ring?.patchs[0].caracteristiques[0].taux;
      }
    });
    rings.forEach((ring) => {
      const ringStat2 = ring?.patchs[0].caracteristiques[1];
      if (ringStat2?.effet.toLowerCase().includes("attaque")) {
        totalAttaque += ring?.patchs[0].caracteristiques[1].taux;
      }
      if (ringStat2?.effet.toLowerCase().includes("vie")) {
        totalPv += ring?.patchs[0].caracteristiques[1].taux;
      }
    });

    const brassardStat1 = brassard?.patchs[0].caracteristiques[0];
    if (brassardStat1?.effet.toLowerCase().includes("vie")) {
      totalPv += 1;
    }
    const brassardStat2 = brassard?.patchs[0].caracteristiques[0];
    if (brassardStat2?.effet.toLowerCase().includes("attaque")) {
      totalAttaque += 1;
    }

    const scaledTotalPv = (totalPv * level) / 100;
    const scaledTotalAt = (totalAttaque * level) / 100;
    setItemsStats(() => ({
      totalPv: scaledTotalPv,
      totalAt: scaledTotalAt,
    }));
  }, [build.anneaux, build.brassard, level]);

  //#region increment, decrement passives

  const maxPassifCounts = {
    pv_50: 1,
    pv_25: 3,
    pv_12: 10,
    pv_5: 15,
    at_50: 1,
    at_20: 3,
    at_7: 10,
    at_3: 15,
  };
  const handlePvPercentageChange = (operation: "decrement" | "increment", percentage: number, type: PassifType) => {
    const updatedPvPercentage =
      operation === "decrement" ? totalPvPercentage - percentage : totalPvPercentage + percentage;

    const passifCount = passifValues[type];
    const maxCount = maxPassifCounts[type];

    if ((operation === "decrement" && passifCount > 0) || (operation === "increment" && passifCount < maxCount)) {
      setTotalPvPercentage(updatedPvPercentage);
      setPassifValues((prev) => ({
        ...prev,
        [type]: operation === "decrement" ? prev[type] - 1 : prev[type] + 1,
      }));
    }
  };

  const handleAtPercentageChange = (operation: "decrement" | "increment", percentage: number, type: PassifType) => {
    const updatedAtPercentage =
      operation === "decrement" ? totalAtPercentage - percentage : totalAtPercentage + percentage;

    const passifCount = passifValues[type];
    const maxCount = maxPassifCounts[type];

    if ((operation === "decrement" && passifCount > 0) || (operation === "increment" && passifCount < maxCount)) {
      setTotalAtPercentage(updatedAtPercentage);
      setPassifValues((prev) => ({
        ...prev,
        [type]: operation === "decrement" ? prev[type] - 1 : prev[type] + 1,
      }));
    }
  };

  // useEffect(() => {
  //   const adjustedPvPercentage = totalPvPercentage / 100;
  //   setScaledBuildStats((prev) => ({
  //     ...prev,
  //     pv: build.arme?.patchs[0].pv! * adjustedPvPercentage,
  //   }));
  // }, [totalPvPercentage]);

  // useEffect(() => {
  //   const adjustedAtPercentage = totalAtPercentage / 100;
  //   setScaledBuildStats((prev) => ({
  //     ...prev,
  //     at: build.arme?.patchs[0].at! * adjustedAtPercentage,
  //   }));
  // }, [totalAtPercentage]);

  useEffect(() => {}, [level]);

  const decrementPassifPv_50 = () => {
    if (passifPv_50 === 0) return;
    setPassifPv_50(passifPv_50 - 1);
  };
  const incrementPassifPv_50 = () => {
    if (passifPv_50 === 1) return;
    setPassifPv_50(passifPv_50 + 1);
  };
  const decrementPassifPv_25 = () => {
    if (passifPv_25 === 0) return;
    setPassifPv_25(passifPv_25 - 1);
  };
  const incrementPassifPv_25 = () => {
    if (passifPv_25 === 3) return;
    setPassifPv_25(passifPv_25 + 1);
  };
  const decrementPassifPv_12 = () => {
    if (passifPv_12 === 0) return;
    setPassifPv_12(passifPv_12 - 1);
  };
  const incrementPassifPv_12 = () => {
    if (passifPv_12 === 10) return;
    setPassifPv_12(passifPv_12 + 1);
  };
  const decrementPassifPv_5 = () => {
    if (passifPv_5 === 0) return;
    setPassifPv_5(passifPv_5 - 1);
  };
  const incrementPassifPv_5 = () => {
    if (passifPv_5 === 15) return;
    setPassifPv_5(passifPv_5 + 1);
  };
  const decrementPassifAtk_50 = () => {
    if (passifAtk_50 === 0) return;
    setPassifAtk_50(passifAtk_50 - 1);
  };
  const incrementPassifAtk_50 = () => {
    if (passifAtk_50 === 1) return;
    setPassifAtk_50(passifAtk_50 + 1);
  };
  const decrementPassifAtk_20 = () => {
    if (passifAtk_20 === 0) return;
    setPassifAtk_20(passifAtk_20 - 1);
  };
  const incrementPassifAtk_20 = () => {
    if (passifAtk_20 === 3) return;
    setPassifAtk_20(passifAtk_20 + 1);
  };
  const decrementPassifAtk_7 = () => {
    if (passifAtk_7 === 0) return;
    setPassifAtk_7(passifAtk_7 - 1);
  };
  const incrementPassifAtk_7 = () => {
    if (passifAtk_7 === 10) return;
    setPassifAtk_7(passifAtk_7 + 1);
  };
  const decrementPassifAtk_3 = () => {
    if (passifAtk_3 === 0) return;
    setPassifAtk_3(passifAtk_3 - 1);
  };
  const incrementPassifAtk_3 = () => {
    if (passifAtk_3 === 15) return;
    setPassifAtk_3(passifAtk_3 + 1);
  };

  //#endregion
  return (
    <>
      {item ? (
        <>
          {isTabletOrMobile && (
            <Image
              src={`${ARME_BASE_URL}/${item?.image}.png`}
              alt="classe"
              width={200}
              height={200}
              onClick={openModal}
              className="hover:cursor-pointer"
            />
          )}
          <div className="relative w-full flex items-center justify-evenly">
            <div className="flex flex-col flex-wrap xl:grid xl:grid-cols-2 xl:gap-x-6">
              <div className="relative">
                <div className="flex justify-between items-center">
                  <p
                    onClick={() => {
                      handlePvPercentageChange("decrement", 50, "pv_50");
                      decrementPassifPv_50();
                    }}
                    className="border border-white rounded-lg px-2 hover:cursor-pointer">
                    -
                  </p>
                  <Image width={60} height={60} alt="pv passif" src="/img/passif_bg_pv.png" className="" />
                  <p
                    onClick={() => {
                      handlePvPercentageChange("increment", 50, "pv_50");
                      incrementPassifPv_50();
                    }}
                    className="border border-white rounded-lg px-2 hover:cursor-pointer">
                    +
                  </p>
                  <p className="absolute top-2 left-[3.2rem] text-xs opacity-50 font-bold">{passifPv_50 || 0}</p>
                  <p className="absolute top-[1.50rem] left-[2.75rem] text-sm font-bold">50%</p>
                </div>
              </div>
              <div className="relative">
                <div className="flex justify-between items-center">
                  <p
                    onClick={() => {
                      handlePvPercentageChange("decrement", 25, "pv_25");
                      decrementPassifPv_25();
                    }}
                    className="border border-white rounded-lg px-2 hover:cursor-pointer">
                    -
                  </p>
                  <Image width={60} height={60} alt="pv passif" src="/img/passif_bg_pv.png" className="" />
                  <p
                    onClick={() => {
                      handlePvPercentageChange("increment", 25, "pv_25");
                      incrementPassifPv_25();
                    }}
                    className="border border-white rounded-lg px-2 hover:cursor-pointer">
                    +
                  </p>
                  <p className="absolute top-2 left-[3.2rem] text-xs opacity-50 font-bold">{passifPv_25 || 0}</p>
                  <p className="absolute top-[1.50rem] left-[2.75rem] text-sm font-bold">25%</p>
                </div>
              </div>
              <div className="relative">
                <div className="flex justify-between items-center">
                  <p
                    onClick={() => {
                      handlePvPercentageChange("decrement", 12, "pv_12");
                      decrementPassifPv_12();
                    }}
                    className="border border-white rounded-lg px-2 hover:cursor-pointer">
                    -
                  </p>
                  <Image width={60} height={60} alt="pv passif" src="/img/passif_bg_pv.png" className="" />
                  <p
                    onClick={() => {
                      handlePvPercentageChange("increment", 12, "pv_12");
                      incrementPassifPv_12();
                    }}
                    className="border border-white rounded-lg px-2 hover:cursor-pointer">
                    +
                  </p>
                  <p className="absolute top-2 left-[3.2rem] text-xs opacity-50 font-bold">{passifPv_12 || 0}</p>
                  <p className="absolute top-[1.50rem] left-[2.75rem] text-sm font-bold">12%</p>
                </div>
              </div>
              <div className="relative">
                <div className="flex justify-between items-center">
                  <p
                    onClick={() => {
                      handlePvPercentageChange("decrement", 5, "pv_5");
                      decrementPassifPv_5();
                    }}
                    className="border border-white rounded-lg px-2 hover:cursor-pointer">
                    -
                  </p>
                  <Image width={60} height={60} alt="pv passif" src="/img/passif_bg_pv.png" className="" />
                  <p
                    onClick={() => {
                      handlePvPercentageChange("increment", 5, "pv_5");
                      incrementPassifPv_5();
                    }}
                    className="border border-white rounded-lg px-2 hover:cursor-pointer">
                    +
                  </p>
                  <p className="absolute top-2 left-[3.2rem] text-xs opacity-50 font-bold">{passifPv_5 || 0}</p>
                  <p className="absolute top-[1.50rem] left-[2.75rem] text-sm font-bold">5%</p>
                </div>
              </div>
            </div>
            {!isTabletOrMobile && (
              <Image
                src={`${ARME_BASE_URL}/${item?.image}.png`}
                alt="classe"
                width={200}
                height={200}
                onClick={openModal}
                className="hover:cursor-pointer"
              />
            )}
            <div className="flex flex-col flex-wrap xl:grid xl:grid-cols-2 xl:gap-x-6 ">
              <div className="relative">
                <div className="flex justify-between items-center">
                  <p
                    onClick={() => {
                      handleAtPercentageChange("decrement", 50, "at_50");
                      decrementPassifAtk_50();
                    }}
                    className="border border-white rounded-lg px-2 hover:cursor-pointer">
                    -
                  </p>
                  <Image width={60} height={60} alt="atk passif" src="/img/passif_bg_atk.png" className="" />
                  <p
                    onClick={() => {
                      handleAtPercentageChange("increment", 50, "at_50");
                      incrementPassifAtk_50();
                    }}
                    className="border border-white rounded-lg px-2 hover:cursor-pointer">
                    +
                  </p>
                  <p className="absolute top-2 left-[3.2rem] text-xs opacity-50 font-bold">{passifAtk_50 || 0}</p>
                  <p className="absolute top-[1.50rem] left-[2.75rem] text-sm font-bold">50%</p>
                </div>
              </div>
              <div className="relative">
                <div className="flex justify-between items-center">
                  <p
                    onClick={() => {
                      handleAtPercentageChange("decrement", 20, "at_20");
                      decrementPassifAtk_20();
                    }}
                    className="border border-white rounded-lg px-2 hover:cursor-pointer">
                    -
                  </p>
                  <Image width={60} height={60} alt="atk passif" src="/img/passif_bg_atk.png" className="" />
                  <p
                    onClick={() => {
                      handleAtPercentageChange("increment", 20, "at_20");
                      incrementPassifAtk_20();
                    }}
                    className="border border-white rounded-lg px-2 hover:cursor-pointer">
                    +
                  </p>
                  <p className="absolute top-2 left-[3.2rem] text-xs opacity-50 font-bold">{passifAtk_20 || 0}</p>
                  <p className="absolute top-[1.50rem] left-[2.75rem] text-sm font-bold">20%</p>
                </div>
              </div>
              <div className="relative">
                <div className="flex justify-between items-center">
                  <p
                    onClick={() => {
                      handleAtPercentageChange("decrement", 7, "at_7");
                      decrementPassifAtk_7();
                    }}
                    className="border border-white rounded-lg px-2 hover:cursor-pointer">
                    -
                  </p>
                  <Image width={60} height={60} alt="atk passif" src="/img/passif_bg_atk.png" className="" />
                  <p
                    onClick={() => {
                      handleAtPercentageChange("increment", 7, "at_7");
                      incrementPassifAtk_7();
                    }}
                    className="border border-white rounded-lg px-2 hover:cursor-pointer">
                    +
                  </p>
                  <p className="absolute top-2 left-[3.2rem] text-xs opacity-50 font-bold">{passifAtk_7 || 0}</p>
                  <p className="absolute top-[1.50rem] left-[2.75rem] text-sm font-bold">7%</p>
                </div>
              </div>
              <div className="relative">
                <div className="flex justify-between items-center">
                  <p
                    onClick={() => {
                      handleAtPercentageChange("decrement", 3, "at_3");
                      decrementPassifAtk_3();
                    }}
                    className="border border-white rounded-lg px-2 hover:cursor-pointer">
                    -
                  </p>
                  <Image width={60} height={60} alt="atk passif" src="/img/passif_bg_atk.png" className="" />
                  <p
                    onClick={() => {
                      handleAtPercentageChange("increment", 3, "at_3");
                      incrementPassifAtk_3();
                    }}
                    className="border border-white rounded-lg px-2 hover:cursor-pointer">
                    +
                  </p>
                  <p className="absolute top-2 left-[3.2rem] text-xs opacity-50 font-bold">{passifAtk_3 || 0}</p>
                  <p className="absolute top-[1.50rem] left-[2.75rem] text-sm font-bold">3%</p>
                </div>
              </div>
            </div>
          </div>
          <p className="font-black text-3xl">{item?.nom}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
              <Image src="/img/utils/pv.png" width={30} height={30} alt="pv" />
              <p className="font-bold">
                {Math.floor(scaledBuildStats.pv * (itemsStats.totalPv + totalPvPercentage / 100))}
              </p>
            </div>
            <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
              <Image src="/img/utils/at.png" width={30} height={30} alt="atk" />
              <p className="font-bold">
                {Math.round(scaledBuildStats.at * (itemsStats.totalAt + totalAtPercentage / 100))}
              </p>
            </div>
            <div className="flex items-center bg-attributeSelected rounded-lg px-4 py-2 gap-2">
              <Image src="/img/utils/cc.png" width={30} height={30} alt="crit" />
              <p className="font-bold">{scaledBuildStats.cc}%</p>
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
                      className="absolute opacity-30 object-scale-down h-1/2"
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
                        className="absolute object-scale-down"
                      />
                    )}
                    {selectedPassives.some((selectedPassif) => selectedPassif.nom === passif.nom) && (
                      <Image
                        src="/img/passif_bg_highlight.png"
                        width={150}
                        height={150}
                        alt="passif sélectionné"
                        className="absolute object-scale-down"
                      />
                    )}
                    <p className=" absolute text-center text-sm px-8 font-bold">{passif.nom}</p>
                  </div>
                  <Tooltip id="my-tooltip" className="tooltip " />
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-4 w-full px-16">
            <input
              type="range"
              id="volume"
              name="volume"
              min="1"
              max="50"
              value={level}
              onChange={(e) => handleLevelChange(parseInt(e.target.value))}
              className=" w-1/2"
            />
            <label htmlFor="volume">Niveaux d&apos;objets : {level}</label>
          </div>
        </>
      ) : (
        <Image
          src="/img/hexagon-chose-arm.png"
          alt="choisis une arme"
          width={300}
          height={300}
          priority
          onClick={openModal}
          className="hover:cursor-pointer hover:-translate-y-4 transition duration-200 ease-in-out animate-pulse"
        />
      )}
    </>
  );
};

export default Arme;
