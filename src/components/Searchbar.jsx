import React from "react";
import { handlePropsFct } from "../utils/components.utils";

/**
 * Displays a searchbar with a search and clear button.
 *
 * @param {Object} props props of the Searchbar
 * @param {String=} props.placeholder Placeholder of the searchbar
 * @param {String} props.value Value of the searchbar
 * @param {Function} props.onChange Function called when the search is updated
 * @param {Function} props.onClear Function called when the clear button is clicked
 */
const Searchbar = ({ placeholder, value, onChange, onClear }) => {
  const hookName = "Searchbar";
  return (
    <div className="reaction-searchbar">
      <span role="img" aria-label="Search icon">
        🔍
      </span>
      <input
        type="text"
        className="large"
        placeholder={placeholder ? placeholder : "Search..."}
        value={value}
        onChange={(e) => handlePropsFct(onChange, "onChange", hookName, [e])}
      />
      <span
        className="reaction-clear-btn"
        onClick={() => handlePropsFct(onClear, "onClear", hookName)}
      >
        x
      </span>
    </div>
  );
};

export default Searchbar;
