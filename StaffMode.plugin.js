/**
 * @name StaffExpirements
 * @author 4lett
 * @description Enables Discord staff experiments.
 * @version 0.0.1
 */

module.exports = class MyPlugin {
  constructor(meta) {
    console.log('Staff Experiments started!');
  }

  start() {
    let wpRequire;
    window.webpackChunkdiscord_app.push([
      [Math.random()],
      {},
      (req) => {
        wpRequire = req;
      },
    ]);

    const mod = Object.values(wpRequire.c).find((x) => x?.exports?.Z?.isDeveloper !== undefined);
    const usermod = Object.values(wpRequire.c).find((x) => x?.exports?.default?.getUsers);
    const nodes = Object.values(mod.exports.Z._dispatcher._actionHandlers._dependencyGraph.nodes);

    try {
      const experimentStore = nodes.find((x) => x.name === "ExperimentStore");
      experimentStore.actionHandler["OVERLAY_INITIALIZE"]({ user: { flags: 1 } });
    } catch (e) {
      console.error("Error initializing experiment: ", e);
    }

    const oldGetUser = usermod.exports.default.__proto__.getCurrentUser;
    usermod.exports.default.__proto__.getCurrentUser = () => ({ isStaff: () => true });

    try {
      const developerExperimentStore = nodes.find((x) => x.name === "DeveloperExperimentStore");
      developerExperimentStore.actionHandler["CONNECTION_OPEN"]();
    } catch (e) {
      console.error("Error opening connection for developer experiment: ", e);
    }

    usermod.exports.default.__proto__.getCurrentUser = oldGetUser;
  }

  stop() {
    // Nothing to do
  }
};
