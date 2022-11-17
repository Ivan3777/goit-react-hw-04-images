import { useState, useEffect } from 'react';
import { fetchImages } from 'services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './LoadMore/LoadMore';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [totalHits, setTotslHits] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetchImages(query, page)
      .then(data => {
        setImages(prevState => ({
          images:
            page === 1 ? [...data.hits] : [...prevState.images, ...data.hits],
          totalHits:
            page === 1
              ? data.totalHits - data.hits.length
              : data.totalHits - [...prevState.images, ...data.hits].length,
        }));
      })
      .finally(() => {
        setIsLoading(false );
      });
  }, [query, page]);

  const handleSubmit = query => {
    setQuery({ query, page: 1 });
  };

  const handleLoadMore = () => {
    setPage(state => ({ page: state.page + 1 }));
  };

  const toggleModal = modalImage => {
    if (!modalImage) {
      setModalImage({ modalImage: '', showModal: false });
      return;
    }
    setModalImage({ modalImage, showModal: true });
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} openModal={toggleModal} />
      {!!totalHits && <LoadMore onLoadMore={handleLoadMore} />}
      {showModal && <Modal modalImage={modalImage} closeModal={toggleModal} />}
    </>
  );
};


// useEffect(() => {
//   if (!name) {
//     return;
//   }

//   setLoading(true);
//   fetchPictures(name, page)
//     .then(({ data }) => {
//       setPictures(prevPictures => [...prevPictures, ...data.hits]);
//       setTotalImages(data.totalHits);
//       if (data.totalHits === 0) {
//         toast.error(No images with name "${name}", {
//           theme: 'colored',
//         });
//       }
//     })
//     .catch(error => {
//       toast.error(${error}, {
//         theme: 'colored',
//       });
//     })
//     .finally(() => setLoading(false));
// }, [name, page]);