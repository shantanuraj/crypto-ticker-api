/**
 * Common utils
 */

/**
 * Pick util
 */
const pick = prop => obj => prop.split('.').reduce((val, key) => val ? val[key] : obj[key], undefined);

/**
 * Idenitiy util
 */
const iden = v => v;

/**
 * Clone and modify object util
 */
const clone =
  (keyFn = iden, valFn = iden) => obj =>
    Object.entries(obj).reduce((acc, [key, val]) => Object.assign(acc, { [keyFn(key)]: valFn(val) }), {});

module.exports = {
  clone,
  pick,
};
