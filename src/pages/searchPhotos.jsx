import React, { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
import ImageCard from '../components/ImageCard';
import ImageModal from '../components/imageModal';
import '../style/model.css';

const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_API,
});
const SearchPhotos = () => {
  const [query, setQuery] = useState('');
  const [pics, setPics] = useState([]);
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  const [ImageCount, SetCount] = useState(15);
  const [initialData, setInitialData] = useState([]);

  const showModal = (index) => {
    setIndex(index);
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const fetchFirst = async () => {
    unsplash.photos.list({ perPage: 30 }).then((json) => {
      setInitialData(json.response.results);
    });
  };

  useEffect(() => {
    fetchFirst();
  }, []);

  useEffect(() => {
    (async () => {
      if (query === '') {
        setPics(initialData);
        return;
      }
      await unsplash.search.getPhotos({ query: query, perPage: ImageCount }).then((json) => {
        setPics(json.response.results);
      });
    })();
  }, [query, ImageCount, initialData]);

  return (
    <div className="searchPhotos">
      <ImageModal show={show} handleClose={hideModal}>
        {pics[index] && (
          <div className="ModalContent">
            <img
              src={pics[index].urls.regular}
              alt={pics[index].alt_description}
              className="rounded-xl mr-[30px] max-w-[90vh] h-[50vh]"
            />
            <div className="text-left min-w-[25rem] leading-[30px]">
              <h4>ID : {pics[index].id}</h4>
              <p>Description : {pics[index].description}</p>
              <p>Likes Count : {pics[index].likes}</p>
              <p>UserName : {pics[index].user.username}</p>
              <p>Name : {pics[index].user.name}</p>
              <p>Twitter UserName : {pics[index].user.twitter_username}</p>
              <p>Instagram UserName : {pics[index].user.instagram_username}</p>
              <p>Location : {pics[index].user.location}</p>
            </div>
          </div>
        )}
      </ImageModal>

      <div className="mx-16 my-8">
        <label className="relative block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">📷</span>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search image name like 'Animal'..."
            type="text"
            name="query"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              SetCount(10);
            }}
          />
        </label>
      </div>
      <div className="flex flex-wrap justify-evenly card-list w-full mb-8">
        {pics.map((pic, index) => (
          <ImageCard image={pic} showModal={showModal} index={index} />
        ))}
      </div>

      <div className="flex justify-center">
        {query !== '' && (
          <button
            className="flex bg-gray-500 px-4 py-2 rounded-full m-8"
            onClick={() => SetCount((prevState) => prevState + 10)}
          >
            Load More
          </button>
        )}
        {query !== '' && (
          <button
            className="flex px-4 py-2 rounded-full m-8 bg-gray-500 "
            flex
            onClick={() => SetCount((prevState) => prevState - 10)}
          >
            Load Less
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchPhotos;
