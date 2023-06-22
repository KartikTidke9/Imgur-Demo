//importing dependencies
import { useState } from "react";
import style from "./TopicTags.module.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function TopicTags({ topics, onChange }) {
  // console.log(topics[0]);

  //state for handling the expansion of tags panel
  const [isExpanded, setIsExpanded] = useState(false);

  //handling search by topic tags
  const handleTopicSubmit = (term) => {
    onChange(term, 1, "relevent");
  };

  return (
    <div className={style.topic_tags}>
      {/* topic heading  */}
      <div className={style.topic_heading}>{topics[0]?.title}</div>

      {/* expand topic panel feature */}
      <div className={style.topic_features}>
        <div className={style.heading}>EXPLORE TAGS</div>
        <div
          className={style.topic_button}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <div className={style.logo}>
              LESS TAGS
              <AiOutlineMinus />
            </div>
          ) : (
            <div className={style.logo}>
              MORE TAGS
              <AiOutlinePlus />
            </div>
          )}
        </div>
      </div>

      {/* mapping over topics array and produce tiles for topic tags */}
      <div
        className={`${style.topic_tags_container} ${
          isExpanded ? style.expanded : style.contracted
        }`}
      >
        {topics.map((topic) => {
          return (
            <div
              onClick={()=>handleTopicSubmit(topic.title)}
              className={style.tile}
            >
              <div className={style.image_container}>
                <img
                  className={style.image}
                  src={topic.cover_photo.urls.small}
                  alt={topic.cover_photo.alt_description}
                />
              </div>
              <div
                className={style.title_container}
                style={{ backgroundColor: topic.cover_photo.color }}
              >
                <div className={style.title}>{topic.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

//exporting to App
export default TopicTags;
