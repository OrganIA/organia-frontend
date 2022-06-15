/* eslint-disable no-undef */
describe('Login Test Failure', () => {
  it('Tries to login should fail', () => {
    cy.visit('http://organia.francecentral.cloudapp.azure.com/')

    cy.get('.cypress-to-register').click()

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('jexistePasWsh@cypress.com')
      .should('have.value', 'jexistePasWsh@cypress.com')

    cy.get('.cypress-password')
      .type('caca')
      .should('have.value', 'caca')

    cy.get('.cypress-login').click()

<<<<<<< HEAD:cypress/integration/tests/login_failure_test.js
    cy.url().should('eq', 'http://organia.savatier.fr/login')
    cy.wait(1000)
    cy.get('c-toast-container c-toast-container--bottom v--default-css').find('div').find('div').contains("Erreur lors de la connexion").invoke('text')
    .then((text)=>{
      const toastText = text;
      expect(toastText).to.equal("Erreur lors de la connexion : User not Found");
    })
=======
    cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/login')
>>>>>>> 22e0b8767b168254befff4662128ce6d8d34a5b8:tests/e2e/specs/login_failure_test.js

    cy.getCookie("token").should('be.null')
  })
})