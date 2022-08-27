import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="login-x-div">
            <button onClick={() => setShowModal(false)} className="login-x-out">
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
