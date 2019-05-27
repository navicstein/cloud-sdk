// Import dependencies
import util from "./deps/util";
import log from "./deps/log";
import { get } from "./deps/store";
import getActions from "./deps/getActions";

// then main `brain` instance of our actions
var brain = new Map();

// global var to hold the baseUrl
var BASE_URL = undefined; // ¶
/**
 * @description main `cloud` entrance function
 * @param {*} action
 * @param {*} argins
 * @returns {Action | Object}
 */
const cloud = function(action, argins) {
  // let actionName = action;
  // check if our action is `undefined`
  if (util.isUndefined(action)) {
    return log.warn(
      "`cloud('example') where `example` is the name of an action.`"
    );
  } // ⌿⨐

  // check if our action is actionanble
  if (!util.isString(action) || util.isArray(action) || util.isObject(action)) {
    return log.panic(`'${action}' is not a valid action name`);
  }
  // check if the action exist on our `brain`
  if (!brain.has(action)) {
    // ⥁
    // suggest an action that looks like the `failed` action the user is trying to reach
    let looksLikeFailedAction;
    for (let key of brain.keys()) {
      key.match(action) ? (looksLikeFailedAction = key) : false;
    }
    // panic when our action is not found
    log.panic(
      `\`${action}\` does not exist in your actions defintion, please check \`${BASE_URL}/__cloud\` for the correct action.`
    );
    if (!util.isUndefined(looksLikeFailedAction)) {
      log.warn(`Do you mean ${looksLikeFailedAction}?`);
    }
    return;
  } // </if> ⥀
  // else ?
  // our action is already available..
  // so get the action from our `brain map`
  action = brain.get(action); // ⠷⠶⠽

  /**
   * @todo fetch the action from the url using `socket` and `listen` for changes
   */

  // handling get request with parameters is different ...
  var baseUrl = BASE_URL.concat(action.url);
  // ... here we will prepend the `baseUrl` to allow parameters instead
  //
  if (/get/i.test(action.verb) && !util.isUndefined(argins)) {
    baseUrl += "/".concat(util.serializeArgins(argins));
  }
  return (
    fetch(baseUrl, {
      method: action.verb,
      // serialize the body against `get` requests
      body: action.verb == "GET" ? null : JSON.stringify(argins),
    }) //
      // success serialization
      .then(response => {
        return response.json().then(data => {
          if (response.ok) {
            return data;
          } else {
            // reject `Promise` then if not ok
            return Promise.reject({ status: response.status, data });
          }
        });
      })
      // Success
      .then(data => {
        // return the resolved promise
        return Promise.resolve(data);
      })
      .catch(e => {
        // return the rejected promise is any?
        return Promise.reject(e.data);
      })
  ); //❔
}; // </const cloud>

/**
 * @param {action}
 */
cloud.actions = action => {
  return brain; // ∞
};

/**
 * @description Setup the cloud configurations
 * @param {options}
 * @type {Object}
 * @returns {undefined}
 */
cloud.setup = function(options) {
  options = options || {};
  BASE_URL = new URL(options.baseUrl).origin;
  // check if our base url is set
  if (util.isUndefined(options.baseUrl)) {
    log.panic("Could not `.setup` cloudsdk because `baseUrl` is not defined");
  }
  if (!util.isString(options.baseUrl)) {
    log.panic(`'${options.baseUrl}' is not a valid baseUrl`);
  }

  // helper function to make a machine action
  function makeMachine(machines) {
    if (util.isUndefined(machines)) {
      return;
    }
    for (let action in machines) {
      brain.set(action, machines[action]);
    }
  } // </makeMachine>

  // for the first time we want to save our actions for quicker access
  if (!get()) {
    // get the actions from server if no action is in the locastorage
    getActions(options);
  } else {
    // else just get it from the storage
    let machines = JSON.parse(get());
    makeMachine(machines);
    getActions(options);
  } // </fi>
};

// TODO
// make sure that `GET` requests dont have argins
export default cloud;
