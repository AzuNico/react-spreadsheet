import React from "react";
import { Rows } from "../molecules/Rows";

export const Table = (props) => {
  const rows = [];
  for (let y = 0; y < props.y; y++) {
    rows.push(<Rows key={y} y={y} x={props.x + 1} />);
  }

  return <div>{rows}</div>;
};
