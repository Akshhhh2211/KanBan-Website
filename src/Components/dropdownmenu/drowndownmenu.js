import React, { useState } from "react";

function DropdownMenu({ onGroupingChange, onOrderingChange }) {
  const [displayValue, setDisplayValue] = useState("");
  const [groupingValue, setGroupingValue] = useState("");
  const [orderingValue, setOrderingValue] = useState("");

  const handleDisplayChange = (event) => {
    setDisplayValue(event.target.value);

    // Reset grouping and ordering values when switching between grouping and ordering
    if (event.target.value === "grouping") {
      setGroupingValue(""); // Reset grouping value
      setOrderingValue(""); // Reset ordering value
      onGroupingChange(""); // Notify the parent component about the grouping change
    } else if (event.target.value === "ordering") {
      setOrderingValue(""); // Reset ordering value
      onOrderingChange(""); // Notify the parent component about the ordering change
    }
  };

  const handleGroupingChange = (event) => {
    setGroupingValue(event.target.value);
    onGroupingChange(event.target.value); // Notify the parent component about the grouping change
  };

  const handleOrderingChange = (event) => {
    setOrderingValue(event.target.value);
    onOrderingChange(event.target.value); // Notify the parent component about the ordering change
  };

  return (
    <div>
      <select value={displayValue} onChange={handleDisplayChange}>
        <option value="">Display...</option>
        <option value="grouping">Grouping</option>
        <option value="ordering">Ordering</option>
      </select>
      {displayValue === "Display" &&  (
        <div>
            <label>Display...</label>
            <select value={groupingValue}></select>
        </div>
      )}
      {displayValue === "grouping" && (
        <div>
          <label>Grouping: </label>
          <select value={groupingValue} onChange={handleGroupingChange}>
            <option value="">Select...</option>
            <option value="user">Status</option>
            <option value="priority">User</option>
            <option value="status">Priority</option>
          </select>
        </div>
      )}
      {displayValue === "ordering" && (
        <div>
          <label>Ordering: </label>
          <select value={orderingValue} onChange={handleOrderingChange}>
            <option value="">Select...</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;