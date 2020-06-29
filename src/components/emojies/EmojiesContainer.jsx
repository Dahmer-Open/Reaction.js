import React, { useState } from "react";
import EmojiButton from "./Emoji";
import { handlePropsFct } from "../../utils/components.utils";

/**
 * Displays a list of emojies in a clean grid while handling any
 * relevant events such as emoji hovers and clicks.
 *
 * @param {Object} props Props of the EmojiesContainer component
 * @param {Array<{
 *                codes: String,
 *                char: String,
 *                name: String,
 *                shortcut: String
 * }>} props.emojies Emojies list to be displayed
 * @param {Function=} props.onMouseEnterEmoji Function called when an emoji is hovered
 * @param {Function=} props.onMouseLeaveEmoji Function called when an emiji stops being hovered
 * @param {Function} props.onClickEmoji Function called when an emoji is clicked
 */
const EmojiesContainer = ({
  emojies,
  onMouseEnterEmoji,
  onMouseLeaveEmoji,
  onClickEmoji,
}) => {
  const hookName = "EmojiesContainer";

  const [hoveredEmoji, setHoveredEmoji] = useState(undefined);

  const onMouseEnter = (emoji) => {
    if (onMouseEnterEmoji) {
      onMouseEnterEmoji(emoji);
    }
    setHoveredEmoji(emoji);
  };
  const onMouseLeave = (emoji) => {
    if (onMouseLeaveEmoji) {
      onMouseLeaveEmoji(emoji);
    }
    setHoveredEmoji(undefined);
  };
  const onClick = (emoji) => {
    handlePropsFct(onClickEmoji, "onClickEmoji", hookName, [emoji]);
  };

  const renderTabEmojies = () => {
    if (emojies.length > 0) {
      return (
        <div className="reaction-emojies-container">
          {emojies.map((emoji) => {
            return (
              <EmojiButton
                emoji={emoji.char}
                onMouseEnter={() => onMouseEnter(emoji)}
                onMouseLeave={() => onMouseLeave(emoji)}
                onClick={() => onClick(emoji)}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="reaction-emojies-container not-found">
          <div className="centered">
            <div className="notice-emoji">😐</div>No Emojies found.
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {renderTabEmojies()}
      {hoveredEmoji ? (
        <div className="reaction-emoji-info">
          <span className="emoji">{hoveredEmoji.char}</span>
          <div>
            <div className="reaction-emoji-info-name">{hoveredEmoji.name}</div>
            <div className="reaction-emoji-info-shortcut">
              {hoveredEmoji.shortcut}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="reaction-emoji-info text-muted">
            <span className="emoji">⬆</span>
            <div>
              <div className="reaction-emoji-info-name">Select your Emoji</div>
              <div className="reaction-emoji-info-shortcut">
                Share your colors!
              </div>
            </div>
          </div>
          <div className="reaction-settings">
            {/*TODO: Add settings (skin color)*/}
            {/* <span className="emoji" role="img" aria-label="settings">⚙️</span> */}
          </div>
        </div>
      )}
    </>
  );
};

export default EmojiesContainer;
