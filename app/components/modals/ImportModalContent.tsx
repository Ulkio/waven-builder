"use client";
import React, { useState } from "react";

interface ImportDialogProps {
  onClickButton: (build: string) => void;
}

const ImportDialog = ({ onClickButton }: ImportDialogProps) => {
  const [stringBuild, setStringBuild] = useState("");

  const handleImportClick = () => {
    onClickButton(stringBuild);
  };

  return (
    <div className="flex flex-col items-center justify-evenly h-full gap-8 py-8  px-8 xl:px-32">
      <label htmlFor="message" className="block mb-2 text-sm font-medium  ">
        Entrez un build
      </label>
      <textarea
        value={stringBuild}
        onChange={(e) => setStringBuild(e.target.value)}
        id="message"
        rows={16}
        className="resize-none block p-2.5 w-full text-sm  bg-overlaySide rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-overlaySide dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={`Collez la suite de caractères du build que vous souhaitez importer.\nExemple : U2FsdGVkX199cB0X5oSK1mhaDXf3vLwW63QL2X6PPpTlEoQcXTcUakV24eEzx9iw9i5TCTujAyEyE0 (...)`}
      />
      <button onClick={handleImportClick} className="border-2 border-white rounded-md p-2">
        Importer
      </button>
    </div>
  );
};

export default ImportDialog;
