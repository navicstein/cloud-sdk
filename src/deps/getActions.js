import { save } from "./store";
import log from "./log";

export default function getActions(options) {
  let baseUrl = new URL(options.baseUrl).origin;
  fetch(baseUrl.concat("/__cloud/actions"), {
    method: "PATCH",
  })
    .then(response => {
      if (response.status !== 200) {
        // ¶
        return response.text().then(data => {
          if (response.ok) {
            return data;
          } else {
            return Promise.reject({ status: response.status, data });
          }
        });
      } // </if>
      return response.json();
    })
    .then(machines => {
      // save to localstorage for later use
      return save(machines);
    })
    .catch(e => {
      // panic if error
      return log.panic(e);
    });
} // </getActions>
