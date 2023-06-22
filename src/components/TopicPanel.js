//importing dependencies
import style from "./TopicPanel.module.css";

function TopicPanel({ photo, onChange }) {
  return (
    <div
      onClick={() => onChange(photo.id)}
      title="Click for more info"
      className={style.topic_panel}
    >
      <div className={style.image_container}>
        <img
          className={style.image}
          src={photo.urls.small}
          alt={photo.alt_description}
        />
      </div>
      <div className={style.photo_description}>{photo.alt_description}</div>
    </div>
  );
}

//exporting to ImageModel
export default TopicPanel;
