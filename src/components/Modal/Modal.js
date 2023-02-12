import  {Component} from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

    componentDidMount(){
      window.addEventListener('keydown', this.handleKeyDown);
    }


    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if(e.code === 'Escape') {
       this.props.onClose();
        }
    }

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  }
        
        
    

    render () {
      const backdropClick = this.handleBackdropClick;
      const {url, alt} = this.props;
        return createPortal (
            <div className="Overlay" onClick={backdropClick}>
                <div className="Modal">
                  <img src={url} alt={alt}/>
                </div>
            </div>,
            modalRoot,
        );
    }}


    

    