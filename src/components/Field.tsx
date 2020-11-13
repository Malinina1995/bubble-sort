import React from "react";
import {Bubble, BubbleProps} from "./Bubble";

export interface BubbleFieldProps {
   bubbles: BubbleProps[];
   height: number;
   bubbleMargins: number;
}

export const Field: React.FC<BubbleFieldProps> = (props) => {
   const width = props.bubbles
      .map(b => b.radius)
      .reduce((acc, cur) => {
         return acc + cur
      }, 0) + (props.bubbles.length - 1) * props.bubbleMargins;

   return (
      <div
         className="bubble-field mb-30"
         style={{
            width: `${width}px`,
            height: `${props.height}px`
         }}
      >
         {
            props.bubbles.map(b => {
               return <Bubble
                  key={b.number}
                  left={b.left}
                  number={b.number}
                  radius={b.radius}
               />
            })
         }
      </div>
   );
};
