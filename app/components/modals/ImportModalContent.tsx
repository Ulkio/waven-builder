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
    <div className="flex h-full flex-col items-center justify-evenly gap-8 px-8  py-8 xl:px-32">
      <label htmlFor="message" className="mb-2 block text-sm font-medium  ">
        Entrez un build
      </label>
      <textarea
        value={stringBuild}
        onChange={(e) => setStringBuild(e.target.value)}
        id="message"
        rows={16}
        className="block w-full resize-none rounded-lg border  border-gray-300 bg-overlaySide p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-overlaySide dark:placeholder-gray-400  dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder={`Collez la suite de caractères du build que vous souhaitez importer.\nExemple : U2FsdGVkX199cB0X5oSK1mhaDXf3vLwW63QL2X6PPpTlEoQcXTcUakV24eEzx9iw9i5TCTujAyEyE0 (...)`}
      />
      <button
        onClick={handleImportClick}
        className="rounded-md border-2 border-white p-2"
      >
        Importer
      </button>
    </div>
  );
};

export default ImportDialog;
