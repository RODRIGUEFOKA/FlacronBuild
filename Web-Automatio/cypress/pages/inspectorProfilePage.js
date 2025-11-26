
class inspectorProfilePage {

   weblocators= {

      licenseIDtxtbox : 'input[placeholder="Enter your license or certification number"]',
      experienceDropdown: '.space-y-3 > :nth-child(2) > .w-full' ,
      toolsUseddropdown : ':nth-child(3) > .w-full' ,
      

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

    
  // cypress/pages/contractorProfilePage.js

enterlicenseID(id) {

     cy.get(this.weblocators.licenseIDtxtbox).type(id);  


}

    selectRandomExperienceOption() {

         cy.selectRandomOption(this.weblocators.experienceDropdown)

       

    }

       selectRandomToolsUsedOptions() {

        cy.selectRandomOption(this.weblocators.toolsUseddropdown) //reusable function to select random options from custom command file
     
       }

    

clickNext(){
        cy.get(this.weblocators.Next).click()
    }

}

export default inspectorProfilePage;