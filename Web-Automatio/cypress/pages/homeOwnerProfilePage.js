

class yourProfilePage {

    //Locators

    weblocators={

      BudgetRange : '.space-y-3 > :nth-child(1) > .w-full',
      TimeUrgency: '.space-y-3 > :nth-child(2) > .w-full' ,
      PMaterals : ':nth-child(3) > .w-full' ,
      Next : ':nth-child(2) > .flex > .bg-primary',
      pageTitle : '#radix-\\3A r4\\3A',
      backButton : '.flex > .border',
      errorMsgEmpty : '.text-xs.text-red-500.text-center.mt-2',
      loginLink :'button[class="text-blue-600 underline text-xs hover:text-blue-800"]',
    

        budgetDropdown: () => cy.get('.space-y-3 > :nth-child(1) > .w-full'),
        urgencyDropdown: () => cy.get('.space-y-3 > :nth-child(2) > .w-full'),
        timeframeDropdown: () => cy.get(':nth-child(3) > .w-full')
    }

    //Methords
  
     SelectBudgetRange(BRang){
        cy.get(this.weblocators.BudgetRange).select(BRang)
    }


 validateDropdownAndButton(){

     cy.get(this.weblocators.Next).should('be.disabled');
     cy.get(this.weblocators.errorMsgEmpty).should('be.visible')


     // cy.validateDropdownsAndButton([this.weblocators.BudgetRange,this.weblocators.TimeUrgency,this.weblocators.PMaterals],this.weblocators.Next)
 
 }
    validateTitle(){
        cy.get(this.weblocators.pageTitle).should('be.visible')
    }

    validateBackButton(){
        cy.get(this.weblocators.backButton).should('be.visible')
    }

     validateLoginLink(){
        cy.get(this.weblocators.loginLink).should('be.visible')
    }
/*
      SelectTimelineUrgency(TUrg){
        cy.get(this.weblocators.TimeUrgency).select(TUrg)
    }

    
      SelectPreferredMaterials(PMater){
        cy.get(this.weblocators.PMaterals).select(PMater)
    }

*/
       clickNext(){
        cy.get(this.weblocators.Next).click()
    }

// select random values from each dropdown menus
     selectRandomBudget() {
        const options = ["under-5000", "5000-10000", "10000-20000", "20000-50000", "over-50000"];
        const randomOption = options[Math.floor(Math.random() * options.length)];
         this.weblocators.budgetDropdown().select(randomOption)
        console.log("Randomly Selected:", randomOption)
    }


      selectRandomUrgency() {
        const options = ["low", "medium", "high"];
        const randomOption = options[Math.floor(Math.random() * options.length)];
        this.weblocators.urgencyDropdown().select(randomOption);
        console.log("Randomly Selected:", randomOption)
    }

    
selectRandomTimeFrame() {
        const options = ["asphalt", "metal", "tile", "slate","wood"]; // adjust if different in your page
        const randomOption = options[Math.floor(Math.random() * options.length)];
        this.weblocators.timeframeDropdown().select(randomOption);
        console.log("Randomly Selected:", randomOption)
    }



    
}

export default yourProfilePage;