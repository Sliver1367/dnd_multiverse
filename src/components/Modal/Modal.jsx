import React from "react";
import "./Modal.css";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;