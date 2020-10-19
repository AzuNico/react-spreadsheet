import React, { useCallback, useEffect, useState } from "react";

export const Cells = ({ x, y, value }) => {
  const initialState = { selected: false, editing: false };
  const [state, setState] = useState(initialState);

  const handleUnselectAll = useCallback(() => {
    if (state.selected || state.editing) {
      setState({ selected: false, editing: false });
    }
  }, [state.editing, state.selected]);

  useEffect(() => {
    window.document.addEventListener("unselectAll", handleUnselectAll);
  }, [handleUnselectAll, state.editing, state.selected]);

  useEffect(() => {
    return () => {
      window.document.removeEventListener("unselectAll", handleUnselectAll);
    };
  }, [handleUnselectAll, state.editing, state.selected]);

  const emitUnselectAllEvent = () => {
    const unselectAllEvent = new Event("unselectAll");
    window.document.dispatchEvent(unselectAllEvent);
  };

  const handleClick = () => {
    emitUnselectAllEvent();
    setState({ ...state, selected: true });
  };

  const handleBlur = () => {
    setState({ ...state, selected: !state.selected });
  };

  const calculateCss = () => {
    const css = {
      width: "80px",
      padding: "4px",
      margin: "0",
      height: "25px",
      boxSizing: "border-box",
      position: "relative",
      display: "inline-block",
      color: "black",
      border: "1px solid #cacaca",
      textAlign: "left",
      verticalAlign: "top",
      fontSize: "14px",
      lineHeight: "15px",
      overflow: "hidden",
      fontFamily: "Calibri, 'Segoe UI', Thonburi,Arial, Verdana, sans-serif",
    };
    if (x === 0 || y === 0) {
      css.textAlign = "center";
      css.backgroundColor = "#f0f0f0";
      css.fontWeight = "bold";
    }
    if (state.selected) {
      css.border = "1px solid blue";
    }
    return css;
  };

  const css = calculateCss();
  if (x === 0) {
    if (y === 0) {
      return <span style={css} />;
    }
    return <span style={css}>{y}</span>;
  }
  if (y === 0) {
    const alpha = "0ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return <span style={css}>{alpha[x]}</span>;
  }

  return (
    <span onClick={handleClick} style={css}>
      {JSON.stringify(state.selected)}
    </span>
  );
};
