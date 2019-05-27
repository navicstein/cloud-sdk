import util from "./util";
export default {
  panic(value) {
    console.error(
      `%c Cloud %c  error  %c \n\n ${value}`,
      "background:blue ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
      `background: red; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff`,
      "background:transparent"
    );
  },
  warn(value) {
    console.warn(
      `%c Cloud %c  warn  %c ${value}`,
      "background:blue ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
      `background: #ff9800; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff`,
      "background:#ffeb3b5c;padding: 3px;color: #FF5722"
    );
  },
  verbose(value) {
    // check if setup is verbose
    if (!util.isStandardBrowserEnv()) {
      return console.log(value);
    }
  },
};
