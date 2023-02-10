import PropTypes from "prop-types";
import { Component } from "react";
import { Backdrop, ModalBox } from './Modal.styled';
import { createPortal } from "react-dom";

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.cleanEventListener);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.cleanEventListener);
  }

  cleanEventListener = evt => {
    if (evt.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget !== evt.target) {
      this.props.onClose();
    }
  };
  
  render() {
    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <ModalBox>
          {this.props.children}
        </ModalBox>
      </Backdrop>,
      modalRoot
    );
  }
}