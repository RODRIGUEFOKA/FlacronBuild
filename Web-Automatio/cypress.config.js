const { defineConfig } = require("cypress");

module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter',
  video: true,
  
  reporterOptions: {
    overwrite: false, // Set to false to generate unique reports
    // ... other options
  },
    projectId: "2hxc8g",

  e2e: {

     chromeWebSecurity: false,
  
    experimentalStudio:true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
       require('cypress-mochawesome-reporter/plugin')(on);
    
       
    },
  },

  env:{

    URL:'https://flacronbuild.com/'

  },
});
