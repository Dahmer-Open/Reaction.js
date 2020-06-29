import React from "react";
import Tabs from "../components/tabs/Tabs";
import tabs from "../data/defaultTabs.data";
import Searchbar from "../components/Searchbar";
import defaultEmojies from "../data/defaultEmojies.data.json";
import { useState } from "react";
import EmojiesContainer from "../components/emojies/EmojiesContainer";
import { handlePropsFct } from "../utils/components.utils";

/**
 * Emoji Selector displaying a popover menu allowing per-category browsing and general search.
 *
 * @param {Object} props Props of the selector
 * @param {String=} props.className Aditionnal classnames of the selector
 * @param {Object=} props.style Aditionnal style of the selector
 * @param {Function} props.onEmojiClicked Function called when an emoji is clicked
 */
const SelectorContainer = ({
  className = undefined,
  style = undefined,
  onEmojiClicked,
}) => {
  const hookName = "SelectorContainer";
  const TAB_ACTION = "tab";
  const SEARCH_ACTION = "search";

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [search, setSearch] = useState("");
  // Old search is used to determine if the current search
  // was further detailed (ie: "s", "sp", "spy"),
  // This way, we can search within the previous's search
  // results, minimizing dataset size, making search faster.
  const [oldSearch, setOldSearch] = useState("");
  // Continuous Search Dataset (CSD)
  const [searchResults, setSearchResults] = useState({});
  const [lastAction, setLastAction] = useState(TAB_ACTION);
  const [csd, setCSD] = useState(undefined);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchResults({});
    setLastAction(TAB_ACTION);
  };

  const handleEmojiClick = (emoji) => {
    handlePropsFct(onEmojiClicked, "onEmojiClicked", hookName, [emoji]);
  };

  /**
   * Handles changes to the search.
   *
   * @param {Object} e Event of the input
   */
  const handleSearchChange = (e) => {
    setOldSearch(search);
    setSearch(e.target.value);
    setSearchResults(getSearchResults(e.target.value));
    setLastAction(SEARCH_ACTION);
  };

  /**
   * Handles seach clear.
   */
  const handleSearchClear = () => {
    setOldSearch(search); // set old search value (will break continuity)
    setSearch(""); // Clear search
  };

  /**
   * Whether or not the search is continuous (ie: "s", "sp", "spy").
   */
  const isSearchContinuous = () => {
    return (
      oldSearch.indexOf(search) !== -1 && search.length === oldSearch.length + 1
    );
  };

  /**
   * If currently searching, generate search results by parsing
   * data and filtering non-corresponding results.
   */
  const getSearchResults = (lSearch) => {
    let results = {};
    if (isSearchContinuous()) {
      Object.values(defaultEmojies).map((category) => {
        Object.keys(category.list).map((emojiKey) => {
          let emoji = category.list[emojiKey];
          if (emoji.shortcut.indexOf(lSearch) !== -1) {
            results[emojiKey] = emoji;
          }
        });
      });
    } else {
      Object.values(defaultEmojies).map((category) => {
        Object.keys(category.list).map((emojiKey) => {
          let emoji = category.list[emojiKey];
          if (emoji.shortcut.indexOf(lSearch) !== -1) {
            results[emojiKey] = emoji;
          }
        });
      });
      setCSD(results); // We set the CSD even if not continuous, as it may become continuous.
    }
    return results;
  };

  return (
    <div
      className={
        className ? `selector-container ${className}` : "selector-container"
      }
      style={style && style}
    >
      <Searchbar
        value={search}
        onChange={handleSearchChange}
        onClear={handleSearchClear}
      />
      <Tabs tabs={tabs} activeTab={activeTab} onTabClicked={handleTabChange} />
      <EmojiesContainer
        emojies={
          lastAction.indexOf(SEARCH_ACTION) !== -1
            ? Object.values(searchResults)
            : Object.values(defaultEmojies[activeTab.key].list)
        }
        onClickEmoji={handleEmojiClick}
      />
    </div>
  );
};

export default SelectorContainer;
