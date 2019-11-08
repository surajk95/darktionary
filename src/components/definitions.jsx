import React from "react";

export default function Definitions(props) {
  return (
    <>
      <span className="definitionHeading">
          Definition 
      </span>
      {props.meanings.map((item, index) => {
        return (
          <div key={index}>
              <span
                key={index}
                className={props.isPartofSpeech(item.speech_part)}
              >
                {item.speech_part}
              </span>
              <span className="wordDefinition">
                {item.definition}
              </span>
          </div>
        );
      })}
    </>
  );
}
