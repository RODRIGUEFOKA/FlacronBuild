
class insuranceProfilePage {

   weblocators= {

      companyNameTxtBox : '.space-y-3 > :nth-child(1) > .flex',
      adjusterIDTxtBox : '.space-y-3 > :nth-child(2) > .flex',
      claimTypesHandledDropdown: ':nth-child(3) > .w-full' ,
      JurisdictionTxtBox : '.space-y-3 > :nth-child(4) > .flex' ,
      

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

enterCompanyName(CName) {

     cy.get(this.weblocators.companyNameTxtBox).type(CName);  


}

    enterAdjusterID(AId) {

        cy.get(this.weblocators.adjusterIDTxtBox).type(AId);  

            

    }

       selectRandomClaimTypesHandledOptions() {

        cy.selectRandomOption(this.weblocators.claimTypesHandledDropdown) //reusable function to select random options from custom command file
     
       }

       enterJurisdictionLocation(Location){

        cy.get(this.weblocators.JurisdictionTxtBox).type(Location)
              
      //  cy.get(this.weblocators.JurisdictionTxtBox).type("11, Block 11 Gulshan-e-Iqbal, Karachi, 75300, Pakistan")
       }
    

clickNext(){
        cy.get(this.weblocators.Next).click()
    }

}

export default insuranceProfilePage;