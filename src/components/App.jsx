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
    const [totalHits, setTotalHits] = useState(0);

    useEffect(() => {
      if (!query) {
        return;
      }
        setIsLoading(true);
        fetchImages(query, page)
        .then(data => {
            setImages(prevImages => (page === 1 ? [...data.hits] : [...prevImages, ...data.hits]));
            setTotalHits(prevHits => (page === 1 ? prevHits - data.hits.length : prevHits - [...data.hits].length));
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, [query, page]);

    const handleSubmit = (query) => {
        setQuery(query);
        setPage(1);
    };

    const handleLoadMore = () => {
        setPage(prevPage => (prevPage + 1));
    };

    const toggleModal = modalImage => {
        if(!modalImage) {
            setModalImage('');
            setShowModal(false);
            return;
        }
        setModalImage(modalImage);
        setShowModal(true);
    }

    return (
        <>
          <Searchbar onSubmit={handleSubmit} />
          {isLoading && <Loader />}
          <ImageGallery images={images} openModal={toggleModal} />
          {!!totalHits && <LoadMore onLoadMore={handleLoadMore} />}
          {showModal && <Modal closeModal={toggleModal}  modalImage={modalImage}/>}
        </>
      );
}