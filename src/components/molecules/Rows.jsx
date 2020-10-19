import React from "react";
import { Cells } from "../atoms/Cells";

export const Rows = (props) => {
  const cells = [];
  const y = props.y;
  for (let x = 0; x < props.x; x++) {
    cells.push(<Cells value={JSON.stringify({x,y})} key={`${x}-${y}`} x={x} y={y} />);
  }

  return <div>{cells}</div>;
};
