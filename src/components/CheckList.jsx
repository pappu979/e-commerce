import React, { useState } from "react";

const CheckList = () => {
  const [firstList, setFirstList] = useState([1, 2, 3, 4, 5]);
  const [secondList, setSecondList] = useState([]);
  const [selectedItemFromFirst, setSelectedItemFromFirst] = useState([]);
  const [selectedItemFromSecond, setSelectedItemFromSecond] = useState([]);

  const handleCheckboxChange = (listName, value, isChecked) => {
    if (listName === "first") {
        setSelectedItemFromFirst((prev) =>
        isChecked ? [...prev, value] : prev.filter((item) => item !== value)
      );
    } else {
        setSelectedItemFromSecond((prev) =>
        isChecked ? [...prev, value] : prev.filter((item) => item !== value)
      );
    }
  };

  const moveSelected = (source, target, selectedItems, setSource, setTarget) => {
    setSource((prev) => prev.filter((item) => !selectedItems.includes(item)));
    setTarget((prev) => [...prev, ...selectedItems]);
    if (source === "first") setSelectedItemFromFirst([]);
    if (source === "second") setSelectedItemFromSecond([]);
  };


  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ flex: 1, padding: "10px" }}>
        <h3>First List</h3>
        {firstList.map((item) => (
          <div key={item}>
            <input
              type="checkbox"
              checked={selectedItemFromFirst.includes(item)}
              onChange={(e) =>
                handleCheckboxChange("first", item, e.target.checked)
              }
            />
            <span>{item}</span>
          </div>
        ))}
        <button
          onClick={() =>
            moveSelected(
              "first",
              "second",
              selectedItemFromFirst,
              setFirstList,
              setSecondList
            )
          }
        >
          Move 
        </button>
      </div>

      <div
        style={{
          width: "4px",
          backgroundColor: "#000",
          maxHeight: "100%",
          margin: "0 10px",
        }}
      ></div>

      <div style={{ flex: 1, padding: "10px" }}>
        <h3>Second List</h3>
        {secondList.map((item) => (
          <div key={item}>
            <input
              type="checkbox"
              checked={selectedItemFromSecond.includes(item)}
              onChange={(e) =>
                handleCheckboxChange("second", item, e.target.checked)
              }
            />
            <span>{item}</span>
          </div>
        ))}
        <button
          onClick={() =>
            moveSelected(
              "second",
              "first",
              selectedItemFromSecond,
              setSecondList,
              setFirstList
            )
          }
        >
           Back
        </button>
      </div>
    </div>
  );
};

export default CheckList;
