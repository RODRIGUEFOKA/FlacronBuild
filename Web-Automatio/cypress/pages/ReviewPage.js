class reviewPage {

  weblocators = {
    StartSubButton :  '.space-x-2 > .bg-primary',
    pageTitle : '#radix-\\3A r4\\3A',
    dataBox : '.space-y-2',
    backButton : '.space-x-2 > .border',
    loginLink : '[d="m6 6 12 12"]',
    roleField : '.space-y-2 > :nth-child(3) > .font-medium',
    billingField : ':nth-child(4) > .font-medium',
    costField : ':nth-child(5) > .font-medium',
    duplicateEmialError : '.text-red-500'
  }

  clickStartSubButton(){
     cy.get(this.weblocators.StartSubButton).click();
     }

 validatePageTitle(){ 
    cy.get(this.weblocators.pageTitle).should('be.visible');
 }
  validateDataBox(){
     cy.get(this.weblocators.dataBox).should('be.visible'); 
    }
  validateLoginLink(){ 
    cy.get(this.weblocators.loginLink).should('be.visible');
 }
  validateBackButton(){ 
    cy.get(this.weblocators.backButton).should('be.visible');
 }


  // ⭐ NEW METHODS TO VALIDATE NAME & EMAIL
  validateFullName() {
    cy.get('@savedFullName').then(fullname => {
      cy.get(this.weblocators.nameValue).should('contain.text', fullname);
    });
  }

  validateEmail() {
    cy.get('@savedEmail').then(email => {
      cy.get(this.weblocators.emailValue).should('contain.text', email);
    });
  }

 validateDuplicateEmail() {


  cy.get(this.weblocators.duplicateEmialError).should(
            'contain.text', 
            'Firebase: Error (auth/email-already-in-use).'
        );


  }

  
  // ------------------
  // Verify selected plan dynamically
  // ------------------
  verifyPlanDetails() {
    cy.get('@selectedPlan').then(plan => {
      cy.get(this.weblocators.roleField).should('contain.text', plan);
    });
    cy.get('@billingType').then(billing => {
      cy.get(this.weblocators.billingField).should('contain.text', billing.charAt(0).toUpperCase() + billing.slice(1));
    });
    cy.get('@expectedPrice').then(price => {
      cy.get(this.weblocators.costField).should('contain.text', price);
    });
  }

}

export default reviewPage;
