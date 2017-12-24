/**
 * Pick util
 */
const pick = prop => obj => prop.split('.').reduce((val, key) => val ? val[key] : obj[key], null);

module.exports = pick;
