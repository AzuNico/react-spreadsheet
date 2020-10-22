import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";

export const Cells = ({ x, y, value }) => {
  const initialState = { selected: false, editing: false };
  const [state, setState] = useState(initialState);

  const [inputValue, handleInputChage] = useForm({ cellValue: "" });

  const { cellValue } = inputValue;

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

  let timer = 0;
  let delay = 200;
  let prevent = false;

  const doClickAction = () => {
    emitUnselectAllEvent();
    setState({ ...state, selected: true });
  };
  const doDoubleClickAction = () => {
    setState({ ...state, editing: true });
  };

  const handleDoubleClick = () => {
    clearTimeout(timer);
    prevent = true;
    doDoubleClickAction();
  };

  const handleClick = () => {
    timer = setTimeout(function () {
      if (!prevent) {
        doClickAction();
      }
      prevent = false;
    }, delay);
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
  if (state.editing) {
    return (
      <input
        name="cellValue"
        value={cellValue}
        autoFocus
        onChange={handleInputChage}
        style={css}
      />
    );
  } else {
    return (
      <span onClick={handleClick} onDoubleClick={handleDoubleClick} style={css}>
        {cellValue}
      </span>
    );
  }
};
