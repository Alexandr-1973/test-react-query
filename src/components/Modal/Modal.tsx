import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import NoteForm from "../NoteForm/NoteForm";
import { useEffect } from "react";
import type { ModalProps } from "../../types/modal";



export default function Modal({ onClose }: ModalProps) {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const onBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onBackdropClick}
    >
      <div className={css.modal}>
        <NoteForm onClose={onClose}/>
      </div>
    </div>,
    document.body
  );
}
