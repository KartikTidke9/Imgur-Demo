//importing dependencies
import { useEffect, useState } from "react";
import "./App.css";
import {
  searchImages,
  searchRandomImages,
  getSingleImage,
  getNewTopics,
} from "./api/api";
import NavBar from "./components/NavBar";
import Gallery from "./components/Gallery";
import Button from "./components/Button";
import { BsPlusSquareFill } from "react-icons/bs";
import { BiArrowToTop } from "react-icons/bi";
import TopicTags from "./components/TopicTags";

function App() {
  //state for storing images
  const [images, setImages] = useState([]);
  const [imageDetail, setImageDetail] = useState();

  //state for move to top button visibility
  const [moveToTopBtn, setMoveToTopBtn] = useState(false);

  //state for storing topics
  const [topics, setTopics] = useState([]);

  //handling the search for random images
  const handleRandomImageSubmit = async () => {
    const RandomImageResult = await searchRandomImages();
    setImages(RandomImageResult);
  };

  //calling the random image search onload
  useEffect(() => {
    handleRandomImageSubmit();
    handleTopicTags();
  }, []);

  //handling the visibility of scroll to top button after scrolling certain distance
  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.pageYOffset > 300 ? setMoveToTopBtn(true) : setMoveToTopBtn(false);
    };
    window.addEventListener("scroll", handleScrollButtonVisibility);

    return () =>
      window.removeEventListener("scroll", handleScrollButtonVisibility);
  }, []);

  //handling the scroll to top function
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //handling the search for multiple images and pages
  const handleSubmit = async (term, page, order_by) => {
    const imageResult = await searchImages(term, page, order_by);
    setImages(imageResult);
  };

  //handling the search for a particular image
  const handleSingleImage = async (id) => {
    const imageResult = await getSingleImage(id);
    setImageDetail(imageResult);
  };

  //handling the search for new topics
  const handleTopicTags = async () => {
    const topicResult = await getNewTopics();
    setTopics(topicResult);
  };

  //JSX for main page
  return (
    <>
      <div className="app">
        {/* navbar */}
        <div className="navbar">
          <div className="new_post">
            <Button primary>
              <BsPlusSquareFill />
              New post
            </Button>
          </div>
          <NavBar onSubmit={handleSubmit} />
          <div className="login_btn">
            <Button plain>Sign in</Button>
            <Button primary>Sign up</Button>
          </div>
        </div>

        {/* image gallery */}
        <div>
          <Gallery
            images={images}
            singleImage={handleSingleImage}
            imageDetail={imageDetail}
          />
        </div>
      </div>

      {/* explore topic tags */}
      <div className="topic_tags">
        <TopicTags onChange={handleSubmit} topics={topics} />
      </div>

      {/* move to top button */}
      {moveToTopBtn && (
        <div>
          <BiArrowToTop className="scroll_btn" onClick={handleScrollToTop} />
        </div>
      )}
    </>
  );
}

//exporting to index
export default App;
