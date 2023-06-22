//importing dependencies
import Button from "./Button";

function ImageTags({ tag }) {
  // rendering tags as from a button Component
  return <Button plain>{tag.title}</Button>;
}

//exporting to ImgageModal
export default ImageTags;
