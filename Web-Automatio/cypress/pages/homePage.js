class homePage{

      //Locators

    weblocators={

       
        clickGetStartButton: '.group > .relative',
       

    }

      //methords

    openURL(){
 
     
         cy.visit(Cypress.env('URL'))
    }

    clickGetStartButton(){

        
       cy.get(this.weblocators.clickGetStartButton).click();

    }
    
    varifyHomePage(){

       cy.get(this.weblocators.clickGetStartButton).should('be.visible');

    }
}

export default homePage;