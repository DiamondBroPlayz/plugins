/**
 * @name AMOLED
 * @author 4lett
 * @description Enables discord AMOLED
 * @version 0.0.1
 */

module.exports = class MyPlugin {
  constructor(meta) {
    console.log('AMOLED plugin started!');
    BdApi.UI.showToast("AMOLED is enabled! This might conflict with some themes.");
  }

  start() {
    document.body.classList.add("theme-amoled");
  }

  stop() {
    document.body.classList.remove("theme-amoled");
    console.log('AMOLED plugin stopped!');
  }
};
