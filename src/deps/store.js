import util from "./util";

if (!"localStorage" in window) {
  // handle error
}
let key = "cloud";
export function save(what) {
  return localStorage.setItem(key, JSON.stringify(what));
}
export function get(what = key) {
  var didCloudBrainExist = localStorage.getItem(key);
  if (!util.isUndefined(didCloudBrainExist)) {
    return didCloudBrainExist;
  }
  return false;
}
