
class contractorProfilePage {

   weblocators= {

      businessName : '.space-y-3 > :nth-child(1) > .flex',
      crewSizeDropdown: '.space-y-3 > :nth-child(2) > .w-full' ,
      LicenseNumber : '.space-y-3 > :nth-child(3) > .flex' ,
      jobTypesOfferedDropdown : ':nth-child(4) > .w-full',

      Next : ':nth-child(2) > .flex > .bg-primary',
      pageTitle : '#radix-\\3A r4\\3A',
      backButton : '.flex > .border',
      errorMsgEmpty : '.text-xs.text-red-500.text-center.mt-2',
      loginLink :'button[class="text-blue-600 underline text-xs hover:text-blue-800"]',
    
   }


    //methords

    // select random values from each dropdown menus
  
    
 validateDropdownAndButton(){

     cy.get(this.weblocators.Next).should('be.disabled');
     cy.get(this.weblocators.errorMsgEmpty).should('be.visible')


     // cy.validateDropdownsAndButton([this.weblocators.BudgetRange,this.weblocators.TimeUrgency,this.weblocators.PMaterals],this.weblocators.Next)
 
 }

  validateTitle(){

       cy.get(this.weblocators.pageTitle).should('be.visible')
    }

    validateBackBtn(){
        cy.get(this.weblocators.backButton).should('be.visible')
    }

    validateLoginLink(){
        cy.get(this.weblocators.loginLink).should('be.visible')
    }

    // select random values from each dropdown menus
     enterBusinessName(BName) {

        cy.get(this.weblocators.businessName).type(BName)

    }
  // cypress/pages/contractorProfilePage.js

randomSelectCrewSize() {
    const options = ["1-2", "3-5","6-10","10+"];
    const randomOption = options[Math.floor(Math.random() * options.length)];
    
    // FIX: Use cy.get() on the locator string before applying .select()
    cy.get(this.weblocators.crewSizeDropdown).select(randomOption); // <--- CORRECTED LINE 63
    
    cy.log('Crew Size Selected: ${randomOption}'); // Changed console.log to cy.log
}

    enterLicenseNumber(LNum) {

        cy.get(this.weblocators.LicenseNumber).type(LNum);  

    }

       randomJobTypesOfferedDropdown() {

        cy.selectRandomOption(this.weblocators.jobTypesOfferedDropdown) //reusable function to select random options from custom command file
     
        /*
     const options = ["residential", "commercial","both","specialized"];
     
    const randomOption = options[Math.floor(Math.random() * options.length)];
    
    // FIX: Use cy.get() on the locator string before applying .select()
    cy.get(this.weblocators.jobTypesOfferedDropdown).select(randomOption); // <--- CORRECTED LINE 63
    
    cy.log('Job Type Selected: ${randomOption}'); // Changed console.log to cy.log
    */
}

    

clickNext(){
        cy.get(this.weblocators.Next).click()
    }

}

export default contractorProfilePage;