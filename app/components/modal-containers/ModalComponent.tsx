import React, { useState } from "react";

import Image from "next/image";
import { Modal } from "react-responsive-modal";

export const ModalComponent = ({ open, onClose, changeHandler, dialogComponent }: any) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      closeOnOverlayClick={true}
      showCloseIcon={true}
      closeIcon={<Image src={"/img/close-icon.png"} alt="close" width={30} height={30} />}
      classNames={{
        overlay: "customOverlay",
        modal: "customModal",
        root: "scrollbar-none",
      }}>
      {dialogComponent}
    </Modal>
  );
};
