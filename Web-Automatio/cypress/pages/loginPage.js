class loginPage {

    
      //Locators

    weblocators={

       
        SignUpLink: '.mt-2 > .text-blue-600'
       

    }

      //methords

  

     clickSignUpLink(){

        cy.get(this.weblocators.SignUpLink).click()
    }
}

export default loginPage;

