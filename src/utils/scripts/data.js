const emojies = require("../../data/_allEmojies.data");
const fs = require("fs");
const { toTitleCase } = require("../text.utils");

/**
 * Function generating our defaultEmojies.data.json file.
 * It expects an input in the same format as
 * https://github.com/amio/emoji.json/blob/master/emoji.json
 * (as its our source of data) and simplifies, uniformizes
 * and prettifies emojies data while sorting them following
 * Slack's chat categories.
 */
const adaptEmojiesData = () => {
  let newMap = {};
  emojies.forEach((emoji) => {
    // Ignore components
    if (emoji.category.indexOf("Component") === -1) {
      let verboseCategory = emoji.category.split(" (")[0];
      let trueCategory = verboseCategory
        .replace("&", "and")
        .split(" ")
        .join("_")
        .toLocaleLowerCase();
      let verboseName = toTitleCase(emoji.name);
      let trueName = emoji.name
        .split(" ")
        .join("_")
        .split("-")
        .join("_")
        .split("“")
        .join("")
        .split("”")
        .join("");
      let updatedEmoji = {
        codes: emoji.codes,
        char: emoji.char,
        name: emoji.name,
      };
      if (trueCategory.indexOf("people_and_body") !== -1) {
        trueCategory = "smileys_and_emotion"; // Merge with Smileys & Emotion
      }
      if (newMap[trueCategory] === undefined) {
        if (trueCategory.indexOf("People") === -1) {
          newMap[trueCategory] = {};
          newMap[trueCategory].name = verboseCategory;
          newMap[trueCategory].list = {};
        }
      }
      if (
        emoji.name.indexOf(":") === -1 ||
        trueCategory.indexOf("flags") !== -1
      ) {
        if (
          // Removes bad emojies
          emoji.char.indexOf("☺") === -1 &&
          emoji.char.indexOf("☹") === -1 &&
          emoji.char.indexOf("🏵") === -1 &&
          emoji.char.indexOf("🕊") === -1 &&
          emoji.char.indexOf("🧑‍⚕") === -1 &&
          emoji.char.indexOf("🧑‍🎓") === -1 &&
          emoji.char.indexOf("🧑‍🏫") === -1 &&
          emoji.char.indexOf("🧑‍⚖") === -1 &&
          emoji.char.indexOf("🧑‍🌾") === -1 &&
          emoji.char.indexOf("🧑‍🍳") === -1 &&
          emoji.char.indexOf("🧑‍🔧") === -1 &&
          emoji.char.indexOf("🧑‍🏭") === -1 &&
          emoji.char.indexOf("🧑‍💼") === -1 &&
          emoji.char.indexOf("🧑‍🔬") === -1 &&
          emoji.char.indexOf("🧑‍💻") === -1 &&
          emoji.char.indexOf("🧑‍🎤") === -1 &&
          emoji.char.indexOf("🧑‍🎨") === -1 &&
          emoji.char.indexOf("🧑‍✈") === -1 &&
          emoji.char.indexOf("🧑‍🚀") === -1 &&
          emoji.char.indexOf("🧑‍🚒") === -1 &&
          emoji.char.indexOf("🧑‍🦯") === -1 &&
          emoji.char.indexOf("🧑‍🦼") === -1 &&
          emoji.char.indexOf("🧑‍🦽") === -1
        ) {
          if (trueCategory.indexOf("flags") !== -1) {
            trueName = trueName.replace(":_", "_");
          }
          updatedEmoji.shortcut = `:${trueName}:`;
          updatedEmoji.name = verboseName;
          newMap[trueCategory].list[trueName] = updatedEmoji;
        }
      } else {
        trueName = trueName.split(":")[0];
        if (newMap[trueCategory].list[trueName] !== undefined) {
          // updatedEmoji = { ...newMap[trueCategory].list[trueName] };
          // if (updatedEmoji.colored === undefined) {
          //   updatedEmoji.colored = {};
          // }
          // updatedEmoji.colored[emoji.name.split(" ").join("_").split(":_")[1]] = {
          //   ...updatedEmoji,
          //   colored: undefined,
          // };
          // updatedEmoji.shortcut = `:${trueName}:`;
          // updatedEmoji.name = verboseName;
          // newMap[trueCategory].list[trueName] = updatedEmoji;
        } else {
          if (updatedEmoji.char.length === 1) {
            updatedEmoji.shortcut = `:${trueName}:`;
            updatedEmoji.name = verboseName;
            newMap[trueCategory].list[trueName] = updatedEmoji;
          }
        }
      }
    }
  });
  fs.writeFileSync(
    "./src/data/defaultEmojies.data.json",
    JSON.stringify(newMap, null, "\t"),
    {
      encoding: "utf8",
      flag: "w+",
    }
  );
};

module.exports = { adaptEmojiesData };
