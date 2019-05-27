## Cloud sdk

cloud-sdk client for use in the browser with `fetch` API

### Usage

copy `cloud-sdk.umd.js` from the `dist` folder and paste in your clients folder (vue or react or etc)

check `dev/index.html` for example

### Calling actions

```js
var users = await cloud("users", { omit: ["photo"] }); // where `omit` is an `inputs:{}`
console.log(users);

await cloud("deleteToken":, { id: 'xxxxxx' })
// something like this
```

check http://localhost:1337/__cloud for a comprehensive list of all your action names

> This is a proof of what i thought cloud-sdk would be please check https://github.com/navicstein/sails-hook-cloud for the global sailsjs hook (not yet released on npm!) [fast finger]

i have plans to release this lib on npm and made available via unpkg after proper verification with the sails team

### upcoming

- Custom Listeners
- Event Listeners (success | error)
- etc
