import React from "react";

export interface BubbleProps {
   left: number;
   number: number;
   radius: number;
}

export const ANIMATION_DELAY = 500;

export const Bubble: React.FC<BubbleProps> = (props) => {
   return (
      <div
         className="bubble"
         style={{
            transition: `${ANIMATION_DELAY}ms ease-in`,
            transform: `translateX(${props.left}px)`,
            width: `${props.radius}px`,
            height: `${props.radius}px`
         }}
      >
         {props.number}
      </div>
   )
}
