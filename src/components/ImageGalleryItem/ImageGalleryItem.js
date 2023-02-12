import React from "react";

const ImageGalleryItem = ({
    webformatURL,
    searchName,
    onClick,
    largeURL,

}) => {
    return (
    <img
    src={webformatURL}
    alt={searchName}
    className='ImageGalleryItem-image'
    onClick={onClick}
    data-src={largeURL}
    />
    );
  };

  export default ImageGalleryItem;