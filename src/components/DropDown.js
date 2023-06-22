// importing dependencies
import style from "./DropDown.module.css";
import { GoChevronDown } from "react-icons/go";

function DropDown({ onChange, options }) {

  //handling option change
  const handleOptionClick = (e) => {
    onChange(e.target.value);
  };

  //mapping over options which are passed as props
  const renderedOption = options.map((option) => {
    return (
      <option className={style.option} key={option.value} value={option.value}>
        {option.label}
      </option>
    );
  });

  return (
    <form className={style.drop_down}>
      <select
        className={style.label}
        onClick={handleOptionClick}
        name="order_by"
      >
        {renderedOption}
      </select>
      <GoChevronDown />
    </form>
  );
}

// exporting to navbar
export default DropDown;
