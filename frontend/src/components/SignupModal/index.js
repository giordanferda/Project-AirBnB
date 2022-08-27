import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignUpModalForm from "./SignUpModalForm";
import "./SignupModal.css";

function ModalSignUp() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="signup-header">
            <div className="signup-header"></div>
            <div className="signup-form">
              <SignUpModalForm />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ModalSignUp;
