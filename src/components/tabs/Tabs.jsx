import React from "react";
import Tab from "./Tab";
import { handlePropsFct } from "../../utils/components.utils";

/**
 * Displays multiple tabs side-by-side handling clicks and active tab.
 *
 * @param {Object} props Props of the Tabs component
 * @param {Array<{
 *                key: String,
 *                title: String
 * }>} props.tabs Array of tabs
 * @param {{
 *        key: String,
 *        name: String
 * }} props.activeTab Active tab (can contain only the key of the active tab)
 * @param {Function} props.onTabClicked Function called when a tab is clicked
 */
const Tabs = ({ tabs, activeTab, onTabClicked }) => {
  return (
    <>
      <div className="reaction-tabs">
        {tabs.map((tab) => {
          return (
            <Tab
              key={tab.key}
              title={tab.title}
              isActive={activeTab.key.indexOf(tab.key) !== -1}
              onClick={() =>
                handlePropsFct(onTabClicked, "onTabClicked", "Tabs", [tab])
              }
            />
          );
        })}
      </div>
      <h1 className="reaction-emojies-container-category">{activeTab.name}</h1>
    </>
  );
};

export default Tabs;
