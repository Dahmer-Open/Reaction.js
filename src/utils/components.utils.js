/**
 *
 * Wrapper for props functions validating that they exist
 * and are actual functions before calling them.
 *
 * @param {Function} propFct Function to be tested / called
 * @param {String} fctName Name of the function (for logging purposes)
 * @param {String} compName Name of the component (for logging purposes)
 * @param {Array<Object>=} args Arguments of the function
 * @param {Function=} cb Callback if the function was called
 */
const handlePropsFct = (
  propFct,
  fctName = "UNSPECIFIED_FUNCTION",
  compName = "UNSPECIFIED_COMPONENT",
  args = undefined,
  cb = undefined
) => {
  if (propFct) {
    if (propFct instanceof Function) {
      args && args.length > 0 ? propFct(...args) : propFct();
      if (cb && cb instanceof Function) {
        cb();
      }
    } else {
      let err = `${compName}'s '${fctName}' isn't a function.`;
      console.error(err);
      if (cb) {
        cb(err);
      }
    }
  } else {
    let err = `${compName}'s '${fctName}' isn't set.`;
    console.warn(err);
    if (cb) {
      cb(err);
    }
  }
};

module.exports = {
  handlePropsFct,
};
