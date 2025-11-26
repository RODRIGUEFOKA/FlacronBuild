import prices from '../fixtures/planPrices.json';

class choosePlanPage {

  weblocators = {
    continueButton: '.justify-between > .bg-primary',
    title : '#radix-\\3A r4\\3A',
    monthly : '.p-2 > .bg-white',
    yearly : '.px-4.py-2.rounded-full.cursor-pointer.text-sm.text-gray-600',
    homeOwner: '.space-y-6 > .grid > :nth-child(1)',
    Contractor: '.space-y-6 > .grid > :nth-child(2)',
    inspector: '.space-y-6 > .grid > :nth-child(3)',
    InsuranceAdjuster: 'div[class="space-y-6"] div:nth-child(4)',
    costFee : 'div[class="relative p-4 rounded-xl border-2 transition-all cursor-pointer border-blue-500 bg-blue-50"] div[class="text-lg font-bold"]',
    backButton : 'button[class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"]',
    popular : 'span[class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full"]'
  }

  // ------------------
  // Validation methods
  // ------------------
  validateTitle()
  { 
    cy.get(this.weblocators.title).click();
   }
  validateHomeOwnerCard(){ 
    cy.get(this.weblocators.homeOwner).should('be.visible');
   }
  validateContractorCard(){
     cy.get(this.weblocators.Contractor).should('be.visible');
     }
  validateInspectorCard(){ 
    cy.get(this.weblocators.inspector).should('be.visible');
   }
  validateInsuranceAdjusterCard(){
     cy.get(this.weblocators.InsuranceAdjuster).should('be.visible');
     }
  validateBackButton(){
     cy.get(this.weblocators.backButton).should('be.visible'); 
    }
  validateMonthlyTag(){ 
    cy.get(this.weblocators.monthly).should('be.visible');
   }
  validatePopularText(){ 
    cy.get(this.weblocators.popular).should('be.visible');
   }

  // ------------------
  // Select billing
  // ------------------
  selectBilling(type){
    if(type === 'monthly'){
      cy.get(this.weblocators.monthly).click();
    } else {
      cy.get(this.weblocators.yearly).click();
    }
    cy.wrap(type).as('billingType'); // Save billing type
  }

  // ------------------
  // Select plan
  // ------------------
  selectPlan(planName){
    
    const plan = planName.toLowerCase();
    let cardLocator;

    switch(plan){
      case 'homeowner': cardLocator = this.weblocators.homeOwner; break;
      case 'contractor': cardLocator = this.weblocators.Contractor; break;
      case 'inspector': cardLocator = this.weblocators.inspector; break;
      case 'insurance adjuster': cardLocator = this.weblocators.InsuranceAdjuster; break;
      default: throw new Error('Unknown plan: ${planName}');
    }

    cy.get(cardLocator).click();
    cy.wrap(planName).as('selectedPlan'); // Save selected plan

    // Save price based on billing
    cy.get('@billingType').then((billing) => {
      cy.wrap(prices[plan][billing]).as('expectedPrice');
    });
  }

  // ------------------
  clickContinueButton(){ 
    cy.get(this.weblocators.continueButton).click();
   }

}

export default choosePlanPage;
