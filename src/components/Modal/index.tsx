import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import styled, { css } from "styled-components";
import { usePaymentDispatch } from "../../context";
const duration = 300;


export const ModalBackground = styled.div`
  background: rgba(0, 0, 0, 0.84);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  align-items: flex-end;

  &.modal-transition-enter {
    transform: translateY(100%);
  }
  &.modal-transition-enter-active {
    transition: transform ${duration}ms;
    transform: translateY(0);
  }
  &.modal-transition-exit {
    transform: translateY(0);
  }
  &.modal-transition-exit-active {
    transition: transform ${duration}ms;
    transform: translateY(100%);
  }
`;

const ModalWrapper = styled.div`
  z-index: 999999;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: ${({theme}) => theme.colors.background};
  border-radius: 1.5rem 1.5rem 0% 0%;
`;

const ModalHeader = styled.div`
  display: flex;
  overflow: hidden;
  height: ${({theme}) => theme.height.modalHeader};
`;

const ModalTitle = styled.div`
  ${({theme}) => css`
    width: 100%;
    margin: 0;
    font-weight: bold;
    color: ${theme.colors.white};
    font-size: ${theme.fonts.size.lg};
    display: flex;
    align-items: center;
    padding: ${theme.paddings.base} 0 0 ${theme.paddings.base}
  `}
`;

const ModalBody = styled.div`
  overflow-y: scroll;
  flex:1;
  max-height: calc(100vh - ${({theme}) => theme.height.modalHeader});
`;

const IconContainer = styled.div`
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .close-button {
    width: 2rem;
    height: 2rem;
    border-radius: 2rem;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// console.log(modalRoot);

const Modal: React.FC<{ title: string, open: boolean, onExited?: any }> = ({ children, title, open, onExited }) => {

  const dispatch = usePaymentDispatch();
  const closeModal = () => dispatch({ type: 'UI/OPEN_MODAL', open: false, modalType: undefined });

  const modalMarkup = (
    <CSSTransition
      in={open}
      className="modal-transition"
      classNames="modal-transition"
      unmountOnExit
      timeout={duration}
      onExited={onExited}
    >
      <ModalBackground>
        <ModalWrapper>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <IconContainer onClick={closeModal}>
              <div className="close-button">X</div></IconContainer>
          </ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
        </ModalWrapper>
      </ModalBackground>
    </CSSTransition>
  );
  return createPortal(modalMarkup, document.body);
};

export default Modal;