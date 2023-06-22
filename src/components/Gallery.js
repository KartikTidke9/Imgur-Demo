//importing dependencies
import ImageCard from "./ImageCard";
import ImageModal from "./ImageModal";
import style from "./Gallery.module.css";
import { useState } from "react";

function Gallery({ images, singleImage, imageDetail }) {
  //using state to check if image modal is closed
  const [isModalClose, SetIsModalClose] = useState(false);

  //toggling the image modal and padding image id to api
  const toggleModel = (image) => {
    SetIsModalClose(!isModalClose);
    singleImage(image.id);
  };

  //mapping over images which is passed as props and passing it as prop to image card component
  const renderedImages = images?.map((image) => {
    return (
      <ImageCard
        modalClose={isModalClose}
        onChange={toggleModel}
        key={image.id}
        image={image}
      />
    );
  });

  return (
    <div className={style.image_container}>
      
      {/* rendering images or image modal based on modal close condition */}
      {!isModalClose ? (
        renderedImages
      ) : (
        <ImageModal
          onChange={toggleModel}
          singleImage={singleImage}
          imageDetail={imageDetail}
        />
      )}
    </div>
  );
}

//exporting to app
export default Gallery;
