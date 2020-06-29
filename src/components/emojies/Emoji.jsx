import React from "react";
import { handlePropsFct } from "../../utils/components.utils";

/**
 * Displays a button with an emoji or icon.
 *
 * @param {Object} props Props of the emoji component
 * @param {Node | String} props.emoji Emoji of the button
 * @param {String=} props.className Aditionnal classnames
 * @param {Object=} props.style Aditionnal style
 * @param {Function} props.onMouseEnter Function called when the mouse hovers the button
 * @param {Function} props.onMouseLeave Function called when the mouse stops hovering the button
 * @param {Function} props.onClick Function called when the button is clicked
 */
const EmojiButton = ({
  emoji,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const hookName = "Emoji";
  return (
    <div
      onMouseEnter={() =>
        handlePropsFct(onMouseEnter, "onMouseEnter", hookName, [emoji])
      }
      onMouseLeave={() =>
        handlePropsFct(onMouseLeave, "onMouseLeave", hookName, [emoji])
      }
      onClick={() => handlePropsFct(onClick, "onClick", hookName, [emoji])}
      style={style ? style : {}}
      className={className ? `emoji ${className}` : "emoji"}
    >
      {emoji}
    </div>
  );
};

export default EmojiButton;
