// import React, { Component } from "react";
import { useState, useEffect } from 'react';
import { Searchbar } from './SearchBar/SearchBar';
import { fetchImages } from '../services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { AppDiv } from './App.styled';
import { Loader } from './Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  
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
        setError(error.massage);
      } finally {
        setIsLoading(false);
      }
    };

    findImages();

  }, [page, query]);

  // зміна квері в стейті при сабміті
  const getQuery = (inputQuery) => {
    if (inputQuery !== query) {
      setQuery(inputQuery);
      setPage(1);
      setImages([]);
    } 
  }
  
  // додаткове завантаження
  const LoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

    return (
      <AppDiv>

        {error && <h1> Ups, Error :( Try again! ) </h1>}
        
        <Searchbar onSubmit={getQuery} />

        {images && <ImageGallery images={images} />}

        {isLoading && <Loader />}

        {images.length % 12 === 0 && images.length !== 0  ? (
          <Button onNextFetch={LoadMore} />
        ) : '' }

      </AppDiv>
    );
 
}
