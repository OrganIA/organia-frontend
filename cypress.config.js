const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'tsqbdg',
  video: false,
  screenshotOnRunFailure: false,
  trashAssetsBeforeRuns: true,
  e2e: {
    baseUrl: 'http://localhost:8080/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
  },
});
