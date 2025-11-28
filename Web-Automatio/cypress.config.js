const { defineConfig } = require("cypress");

const { defineConfig } = require("cypress");
const terminalReport = require('cypress-terminal-report/src/installLogs');


module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter',
  video: true,
  
  reporterOptions: {
    overwrite: false, 
    html: true,
    json: true, // Generate JSON report
    reportFilename: '[name]',  // Use ONLY [timestamp]
    reportPageTitle: 'Test Report',
    reportDir: 'cypress/custom-reports',
    embeddedScreenshots: true,
    inlineAssets: true,

    
  },
    projectId: "2hxc8g",

  e2e: {

     chromeWebSecurity: false,
  
    experimentalStudio:true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
       require('cypress-mochawesome-reporter/plugin')(on);
       terminalReport(on, config);
       return config;
   
    },
       
    },
  

  env:{

    URL:'https://flacronbuild.com/'

  },
});
