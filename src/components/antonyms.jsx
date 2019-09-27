import React from "react";

export default function Antonyms(props) {
  return (
    <div className="inlineContainer">
      <span className="inlineHeading"> Antonyms </span>
      {props.antonyms.map((item, index) => {
        return (
          <span
            className="inlineItem"
            key={index}
            onClick={() => props.searchForWord(item)}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}
