import React, { ReactNode, useState } from "react";

import Image from "next/image";
import { Modal } from "react-responsive-modal";

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  dialogComponent: ReactNode;
}

export const ModalComponent = ({
  open,
  onClose,
  dialogComponent,
}: ModalComponentProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      closeOnOverlayClick={true}
      showCloseIcon={true}
      closeIcon={
        <Image
          src={"/img/close-icon.png"}
          alt="close"
          width={30}
          height={30}
          className="z-20"
        />
      }
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
        root: "scrollbar-none",
      }}
    >
      {dialogComponent}
    </Modal>
  );
};
