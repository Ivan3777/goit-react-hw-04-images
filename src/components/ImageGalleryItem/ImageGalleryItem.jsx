export const ImageGalleryItem = ({
    webformatURL,
    largeImageURL,
    openModal,
  }) => {
    return (
      <li className="ImageGalleryItem">
        <img
          src={webformatURL}
          alt=""
          className="ImageGalleryItem-image"
          onClick={() => openModal(largeImageURL)}
        />
      </li>
    );
  };