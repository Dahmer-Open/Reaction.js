/**
 * Transform a string to title case (every word capitalized).
 *
 * @param {String} str String to be transformed to title case
 */
const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

module.exports = { toTitleCase };
