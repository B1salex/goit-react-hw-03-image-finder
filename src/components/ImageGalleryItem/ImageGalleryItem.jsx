import PropTypes from 'prop-types';
import { GalleryItem, Img } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import { Component } from "react";

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }; 

  openModal = () => {
    this.setState(({ showModal }) => ({showModal: !showModal}));
   };
  
render() {
  const { webformatURL, tags, largeImageURL } = this.props;
  const { showModal } = this.state;
  return (
    <GalleryItem onClick={this.openModal}  >
      <Img src={webformatURL} alt={tags} />
      {showModal && <Modal onClose={this.openModal} ><img src={largeImageURL} alt={tags} /></Modal>
     }
    </GalleryItem>
  );
}}