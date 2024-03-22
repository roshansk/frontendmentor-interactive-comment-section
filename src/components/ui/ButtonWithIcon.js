import React from "react";

function ButtonWithIcon(props) {
  const {
    icon = "images/icon-plus.svg",
    label = "Button",
    btnClass = "",
    iconFirst = true,
    action = () => console.log("click"),
    isVisible = true,
  } = props;

  const iconImage = <img className="w-100 mx-1 my-auto" src={icon}></img>;
  let defaultBtnClass = `flex flex-row justify-center items-center p-1 m-1 ${btnClass} ${
    isVisible ? "" : "hidden"
  }`;

  return (
    <button className={defaultBtnClass} onClick={action}>
      {iconFirst ? iconImage : null}
      {label}
      {!iconFirst ? iconImage : null}
    </button>
  );
}

export default ButtonWithIcon;
