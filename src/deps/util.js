export default {
  // canonicalize the hostname, so that 'oogle.com' won't match 'google.com'
  formateBaseUrl(hostname) {
    return hostname.replace(/^\.*/, "").toLowerCase();
  },
  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Array, otherwise false
   */
  isArray(val) {
    return toString.call(val) === "[object Array]";
  },

  /**
   * Determine if a value is a FormData
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  isFormData(val) {
    return typeof FormData !== "undefined" && val instanceof FormData;
  },

  /**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */
  isString(val) {
    return typeof val === "string";
  },
  /**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */
  isNumber(val) {
    return typeof val === "number";
  },
  /**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  isUndefined(val) {
    return typeof val === "undefined";
  },
  /**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
  isObject(val) {
    return val !== null && typeof val === "object";
  },

  /**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  isFunction(val) {
    return toString.call(val) === "[object Function]";
  },

  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  isURLSearchParams(val) {
    return (
      typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams
    );
  },

  /**
   *  Returns the srialized argins to be used in get requests
   * @param {*} argins
   * @returns {string}
   */
  serializeArgins(argins) {
    var result = [];
    for (let arg in argins) {
      result.push(`${arg}=${argins[arg]}`);
    }
    result = result.join("&");
    result = encodeURI(result);
    return "?".concat(result);
  },
  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */
  trim(str) {
    return str.replace(/^\s*/, "").replace(/\s*$/, "");
  },

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   */
  isStandardBrowserEnv() {
    if (
      typeof navigator !== "undefined" &&
      navigator.product === "ReactNative"
    ) {
      return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
  },
};
