//importing dependencies
import "./Button.css";
import classNames from "classnames";

function Button({
  children,
  primary,
  secondary,
  rounded,
  plain,
  outline,
  ...rest
}) {

  // using classnames library to handle claases
  const style = classNames(rest.className, "btn", {
    primary,
    secondary,
    plain,
    rounded,
    outline,
    "primary primary_color outline": primary && outline,
    "secondary secondary_color outline": secondary && outline,
  });

  return (
    <button className={style} {...rest}>
      {children}
    </button>
  );
}

//using propTypes library to handle props validation
Button.propTypes = {
  checkVariationValue: ({ primary, secondary, plain }) => {
    const count = Number(!!primary) + Number(!!secondary) + Number(!!plain);
    if (count > 1) {
      return new Error(
        "Only one of primary, secondary or plain can be selected"
      );
    }
  },
};

export default Button;
