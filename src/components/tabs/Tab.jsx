import React from "react";
import { handlePropsFct } from "../../utils/components.utils";

/**
 * Component displaying a single tab to control tabbed content.
 *
 * @param          {Object} props Props of the tab component
 * @param   {Node | String} props.title Title of the tab
 * @param          {String} props.key Key of the tab
 * @param         {Boolean} props.isActive Whether the tab is active or not
 * @param        {Function} props.onClick Function called when the tab is clicked
 */
const Tab = ({ title, key, isActive, onClick }) => {
  return (
    <button
      className={`reaction-tab ${isActive && "active"}`}
      onClick={() => handlePropsFct(onClick, "onClick", "Tab", [key])}
    >
      {title}
    </button>
  );
};

export default Tab;
