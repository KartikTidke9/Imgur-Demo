//importing dependencies
import style from "./ImageModal.module.css";
import Button from "./Button";
import { SiImgur } from "react-icons/si";
import {
  BiUpvote,
  BiDownvote,
  BiHeart,
  BiDownload,
  BiArrowBack,
} from "react-icons/bi";

import ImageTags from "./ImageTags";
import TopicPanel from "./TopicPanel";
import { getEditorialPage } from "../api/api";
import { useCallback, useEffect, useState } from "react";

function ImageModal({ onChange, imageDetail, singleImage }) {
  //using state for new topics loaded from api
  const [editorialFeed, setEditorialFeed] = useState([]);
  //state for storing sorting order
  const [orderSearch, setOrderSearch] = useState("latest");

  //converting first letter of the context to uppercase
  const description = imageDetail?.alt_description
    .toLowerCase()
    .split(" ")
    .map((word) => word[0].toUpperCase().concat(word.slice(1)))
    .join(" ");

  //cleaning the default image creation date
  const createdAt = imageDetail?.created_at
    .replace(/T/g, `➖`)
    .replace(/Z/g, ".");
  const updatedAt = imageDetail?.updated_at
    .replace(/T/g, `➖`)
    .replace(/Z/g, ".");

  //mapping over imagedetail.tags passing its values to tags component
  const renderedTags = imageDetail?.tags.map((tag) => {
    return <ImageTags key={tag.title} tag={tag} />;
  });

  //handling the search for editorial feed photos
  const handleEditorialPhotos = useCallback(async () => {
    const imageResult = await getEditorialPage(orderSearch);
    setEditorialFeed(imageResult);
  }, [orderSearch]);

  useEffect(() => {
    handleEditorialPhotos();
  }, [handleEditorialPhotos]);

  //handling order search
  const handleOrderSearch = (e) => {
    const orderTerm = e.target.textContent.toLowerCase();
    setOrderSearch(orderTerm);
  };

  //mapping over editorial feed and passing the values as a props to topicPanel component
  const renderedEditorialPhotos = editorialFeed.map((photo) => {
    return <TopicPanel onChange={singleImage} key={photo.id} photo={photo} />;
  });

  return (
    <div className={`${style.main_modal_display} ${style.modal_open}`}>

      {/* image modal display */}
      <div className={style.modal_display}>

        {/* image details such as likes, views */}
        <div className={style.features_container}>
          <div className={style.features}>
            <BiUpvote className={style.features_logo} />
            {imageDetail?.likes || 0}
            <BiDownvote className={style.features_logo} />
            {0}
            <BiHeart className={style.features_logo} />
          </div>
          <div className={style.views}>
            views:<div>{imageDetail?.views || 0}</div>
          </div>
        </div>

        {/* image description, image, tags */}
        <div className={style.image_details}>
          <div className={style.title}>
            {description || "No Context"}
            <div className={style.owner_details}>
              <div className={style.logo}>
                {(
                  <img
                    className={style.profile_image}
                    src={imageDetail?.user?.profile_image?.medium}
                    alt="profile_image"
                  />
                ) || <SiImgur className={style.profile_image} />}
              </div>
              <div className={style.bio}>
                {imageDetail?.user?.username ||
                  imageDetail?.user?.name ||
                  "Anonymous"}
                <div className={style.time_location}>
                  <div>{createdAt || updatedAt || "no date/time provided"}</div>
                  <div>
                    {imageDetail?.location?.name ||
                      imageDetail?.user?.location?.name ||
                      "no location provided"}
                    .
                  </div>
                </div>
              </div>
              <div className={style.download}>
                <BiDownload />
                <span className={style.span}>
                  Downloads: {(imageDetail?.downloads / 1000).toFixed(2)}k
                </span>
              </div>
            </div>
          </div>
          <div className={style.image_container}>
            <a
              href={imageDetail?.urls.full}
              download
              rel="noreferrer"
              target="_blank"
            >
              <img
                className={style.image}
                src={imageDetail?.urls.full}
                alt={imageDetail?.alt_description}
              />
            </a>
          </div>

          {/* tags */}
          <div className={style.tags_container}>
            {renderedTags || "No Tags"}
          </div>
        </div>

        {/* more topics panel */}
        <div className={style.topic_panel}>
          <h4 className={style.panel_heading}>More Topics</h4>

          {/* editorial feed photos */}
          <div className={style.panels}>{renderedEditorialPhotos}</div>
          <div className={style.orders}>
            <span onClick={handleOrderSearch} className={style.option}>
              Latest
            </span>
            <span onClick={handleOrderSearch} className={style.option}>
              Popular
            </span>
            <span onClick={handleOrderSearch} className={style.option}>
              Oldest
            </span>
          </div>
        </div>
      </div>

      {/* image model closing buttons */}
      <Button onClick={onChange} secondary>
        Close
      </Button>
      <div className={style.back_btn}>
        <Button onClick={onChange} secondary>
          <BiArrowBack />
          Back
        </Button>
      </div>
    </div>
  );
}

//exporting to Gallery
export default ImageModal;
