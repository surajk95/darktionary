import React from "react";

export default function Synonyms(props) {
  return (
    <div className="inlineContainer">
      <span className="inlineHeading"> Synonyms </span>
      {props.synonyms.map((item, index) => {
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
