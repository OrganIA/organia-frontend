const { defineConfig } = require('cypress')

module.exports = defineConfig({
    pluginsFile: "tests/e2e/plugins/index.js",
    video: false,
    // setupNodeEvents can be defined in either
    // the e2e or component configuration
    e2e: {
        setupNodeEvents(on, config) {
            require('@cypress/code-coverage/task')(on, config)
            // include any other plugin code...

            // It's IMPORTANT to return the config object
            // with any changed environment variables
            config.env = {
                ...process.env,
                ...config.env, // Don't overwrite `codeCoverageTasksRegistered` set by `@cypress/code-coverage/task`
            };
            return config
        }
    }
})