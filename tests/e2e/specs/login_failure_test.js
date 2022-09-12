/* eslint-disable no-undef */
describe('Login Test Failure', () => {
  it('Tries to login should fail', () => {
    cy.visit('http://localhost:8081/login')

    cy.get('.cypress-to-register').click()
    cy.url().should('eq', 'http://localhost:8081/register')

    cy.get('.cypress-to-login').click()
    cy.url().should('eq', 'http://localhost:8081/login')

    cy.get('.cypress-email')
      .type('jexistePasWsh@cypress.com')
      .should('have.value', 'jexistePasWsh@cypress.com')

    cy.get('.cypress-password')
      .type('caca')
      .should('have.value', 'caca')

    cy.get('.cypress-login').click()

    cy.url().should('eq', 'http://localhost:8081/login')

    // .then((text)=>{
    //   const toastText = text;
    //   expect(toastText).to.equal("Erreur lors de la connexion : User not Found");
    // })

    // cy.getCookie("token").should('be.null')
    // cy.wait(5000);
    // cy.get("c-toast-container c-toast-container--top v--default-css")

  })
})