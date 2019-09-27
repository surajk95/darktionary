import React from "react";

export default function Definitions(props) {
  return (
    <>
      <span className="definitionHeading">
          Definition 
      </span>
      {Object.values(props.meanings).map((item, index) => {
        return (
          <div key={index}>
            {item.length > 0 &&
              item.map((deeperItem, deeperIndex) => {
                return (
                  typeof deeperItem === "string" && (
                    <span
                      key={deeperIndex}
                      className={props.isPartofSpeech(deeperItem)}
                    >
                      {deeperItem}
                    </span>
                  )
                );
              })}
          </div>
        );
      })}
    </>
  );
}
