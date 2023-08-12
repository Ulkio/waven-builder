import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";

interface StringBuildDialogProps {
  stringBuild: string;
}

const StringBuildDialog = ({ stringBuild }: StringBuildDialogProps) => {
  const handleClickCopy = () => {
    navigator.clipboard.writeText(stringBuild);
    toast("Copié dans le presse-papier !");
  };

  return (
    <div className="flex flex-col items-center justify-evenly h-full gap-4 py-8 px-32">
      <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Copiez cette suite de caractères pour partager votre build :
      </p>

      <img
        data-tooltip-id="my-tooltip"
        data-tooltip-content={`Copier le texte`}
        data-tooltip-place="right"
        onClick={handleClickCopy}
        width="32"
        height="32"
        src="https://img.icons8.com/windows/32/copy.png"
        alt="copy"
        className=" rounded-lg invert hover:cursor-pointer self-start"
      />
      <Tooltip id="my-tooltip" />

      <p className="bg-overlaySide overflow-y-auto w-full break-words p-2 rounded-lg border">{stringBuild}</p>
    </div>
  );
};

export default StringBuildDialog;
