// import React, { Component } from "react";
import React, { useState, useEffect } from 'react';
import { Searchbar } from './SearchBar/SearchBar';
import { fetchImages } from '../services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { AppDiv } from './App.styled';
import { Loader } from './Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesOnPage, setImagesOnPage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);
  // const [showModal, setShowModal] = useState(false);

Notify.init({
      width: '320px',
      position: 'center-top',
      distance: '70px',
      clickToClose: true,
      cssAnimationStyle: 'from-top',
      cssAnimationDuration: 800,
});
  
  useEffect(() => {
    // console.log(page);
    // console.log(query);
    if (!query) {
      return;
    }

    const findImages = async () => {
      try {
        setIsLoading(true);
        const photos = await fetchImages(query, page);
        photos.hits.length === 0
          ? Notify.failure(
              'Sorry, no images found :( Try something else!'
            )
          : setImages(images => [...images, ...photos.hits]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    findImages();

  }, [page, query]);

  // componentDidUpdate(_, prevState) {
  //   const { query, page } = this.state;

  //   Notify.init({
  //     width: '320px',
  //     position: 'center-top',
  //     distance: '70px',
  //     clickToClose: true,
  //     cssAnimationStyle: 'from-top',
  //     cssAnimationDuration: 800,
  //   });

  //   // перший запит 
  //   if (prevState.query !== query) {
  //   // лоадинг - тру
  //     this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
  //   // запуск фетч 
  //     fetchImages(query)
  //       .then(({ hits, totalHits }) => {
  //         if (hits.length === 0) {
  //           return  Notify.failure('Sorry, no images found :( Try something else!');
  //         }
  //         // створення масиву зображень
  //         const imagesArray = hits.map(hit => ({
  //           // приймаються властивості кожного зображення 
  //           id: hit.id,
  //           description: hit.tags,
  //           smallImage: hit.webformatURL,
  //           largeImage: hit.largeImageURL,
  //         }));
  //         // console.log(imagesArray);
  //         // запис змін в стейт
  //         return this.setState({
  //           page: 1,
  //           images: imagesArray,
  //           imagesOnPage: imagesArray.length,
  //           totalImages: totalHits,
  //         });
  //       })
  //       .catch(error => this.setState({ error }))
  //       .finally(() =>
  //         // лоадінг - фолс
  //         this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
  //       );
  //   }

  //   // якщо підгрузити сторінки 2 і більше 
  //   if (prevState.page !== page && page !== 1) {
  //     // лоадінг - тру
  //     this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

  //     fetchImages(query, page)
  //       .then(({ hits }) => {
  //         const imagesArray = hits.map(hit => ({
  //           id: hit.id,
  //           description: hit.tags,
  //           smallImage: hit.webformatURL,
  //           largeImage: hit.largeImageURL,
  //         }));
  //         // зміна стейту
  //         return this.setState(({ images, imagesOnPage }) => {
  //           return {
  //             // додаються нові зображення до вже існуючих
  //             images: [...images, ...imagesArray],
  //             imagesOnPage: imagesOnPage + imagesArray.length,
  //           };
  //         });
  //       })
  //       .catch(error => this.setState({ error }))
  //       .finally(() =>
  //         // лоадінг - фолс
  //         this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
  //       );
  //   }
  // }

  // зміна квері в стейті при сабміті
  const getQuery = (inputQuery) => {
    if (inputQuery !== query) {
      setQuery(inputQuery);
      setPage(1);
      setImages([]);
    } 
  }
  // const getQuery = (e) => {
  //     setQuery(e.target.elements.query.value);
  //     setPage(1);
  //     setImages([]);
  // }

  // додаткове завантаження
  const LoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  //  кнопка модалки
  // const toggleModal = () => {
  //   setShowModal(!setShowModal);
  // };

   // відкриття модалки і відображення поточного зображення 
  // const openModal = e => {
  //   if (e.target.nodeName === 'IMG') {
  //     // console.log(e.target.nodeName);
  //     setShowModal(!setShowModal);
  //     setCurrentImageUrl(e.target.dataset.large);
  //     setCurrentImageDescription(e.target.alt);
  //   }
  // };

    return (
      <AppDiv>
        <Searchbar onSubmit={getQuery} />

        {images && <ImageGallery images={images} />}

        {isLoading && <Loader />}

        {imagesOnPage >= 12 && imagesOnPage < totalImages && images.length !== 0  ? (
          <Button onNextFetch={LoadMore} />
        ) : '' }

         {/* {showModal && (
          <Modal
            currentImageUrl={currentImageUrl}
            currentImageDescription={currentImageDescription}
            onClose={toggleModal}
          />
        )} */}

      </AppDiv>
    );
 
}
