const ImageCard = ({ image, showModal, index }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-xl my-4" onClick={() => showModal(index)}>
      <img src={image.urls.regular} alt="Random" className="w-full h-60" />

      <div className="px-6 py-4">
        <div className="font-bold text-red-600 text-xl mb-2">Photo by {image.user.name}</div>

        <ul>
          <li>
            <strong>Views: </strong>
            {image.views}
          </li>
          <li>
            <strong>Likes: </strong>
            {image.likes}
          </li>
          <li className=" my-4 ml-[-8px]">
            <a href={image.links.download} target="_blank" rel="noreferrer">
              <button className="rounded-full bg-cyan-800 px-4 py-2">download</button>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImageCard;
