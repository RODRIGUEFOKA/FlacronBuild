class profileSettingPage{


     //Locators

    weblocators={

       
        profileLogo: '#radix-\\3A rb\\3A',
        name : '.py-1\.5',
        userSetting : '#radix-\:rb\:',
        logout : '.text-red-500',
        home : '.hidden > .border',
        comp : '.hidden > :nth-child(2)' 

       

    }


     //methords

    clickLogout(){

     cy.get(this.weblocators.profileLogo).click({ force: true });

        cy.get(this.weblocators.logout).click({ force: true });

    }

     validateProfileIcon(){

        cy.wait(600)
     cy.get(this.weblocators.profileLogo).should('be.visible');

         }

           validateUserName(){

     cy.get(this.weblocators.name).should('be.visible');

         }

             validateUserSettings(){

     cy.get(this.weblocators.userSetting).should('be.visible');

         }

            validateLogout(){

     cy.get(this.weblocators.logout).should('be.visible');

         }
}
export default profileSettingPage;