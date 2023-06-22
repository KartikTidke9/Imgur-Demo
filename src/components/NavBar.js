//importing dependencies
import { useState } from "react";
import DropDown from "./DropDown";

import {
  RiFindReplaceLine,
  RiArrowDropRightFill,
  RiArrowDropLeftFill,
} from "react-icons/ri";

import style from "./NavBar.module.css";
import Button from "./Button";

function NavBar({ onSubmit }) {
  const [term, setTerm] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [order, setOrder] = useState("relevent");

  //handling a form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(term, pageNum, order);
  };

  //handling the order sorting
  const handleOrder = (option) => {
    setOrder(option);
    onSubmit(term, pageNum, order);
  };

  //updating page to next
  const handleNextClick = () => {
    setPageNum(pageNum + 1);
    onSubmit(term, pageNum, order);
  };

  //updating page to previous
  const handlePrevClick = () => {
    setPageNum(pageNum - 1);
    onSubmit(term, pageNum, order);
  };

  //handle a input change and updating search term
  const handleChange = (e) => setTerm(e.target.value);

  //options for dropdown component
  const options = [
    { label: "RELEVENT", value: "relevent" },
    { label: "LATEST", value: "latest" },
    { label: "RANDOM", value: "random" },
  ];

  //JSX for search bar
  return (
    <div className={style.navbar}>

      {/* searchbar */}
      <div className={style.searchbar}>
        <form className={style.form} onSubmit={handleSubmit}>
          <input
            className={style.input}
            type="text"
            placeholder="Images, Gifs, videos"
            onChange={handleChange}
          />
          <RiFindReplaceLine
            onClick={handleSubmit}
            className={style.icon_btn}
          />
        </form>
      </div>

      {/* page change buttons */}
      <div className={style.next_prev_btn}>
        <Button plain onClick={handlePrevClick}>
          <RiArrowDropLeftFill className={style.prev} /> Prev
        </Button>
        <Button plain onClick={handleNextClick}>
          Next
          <RiArrowDropRightFill className={style.next} />
        </Button>
      </div>

      {/* dropdown component */}
      <div className={style.drop_down}>
        <DropDown options={options} onChange={handleOrder} />
      </div>
    </div>
  );
}

//exporting to App
export default NavBar;
