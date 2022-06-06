/* eslint-disable no-undef */
describe('Login Test Failure', () => {
  it('Tries to login should fail', () => {
    cy.visit('http://organia.savatier.fr/')

    cy.get('.cypress-to-register').click()

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('jexistePasWsh@cypress.com')
      .should('have.value', 'jexistePasWsh@cypress.com')

    cy.get('.cypress-password')
      .type('caca')
      .should('have.value', 'caca')

    cy.get('.cypress-login').click()

    cy.url().should('eq', 'http://organia.savatier.fr/login')
    cy.wait(1000)
    cy.get('c-toast-container c-toast-container--bottom v--default-css').find('div').find('div').contains("Erreur lors de la connexion").invoke('text')
    .then((text)=>{
      const toastText = text;
      expect(toastText).to.equal("Erreur lors de la connexion : User not Found");
    })

    cy.getCookie("token").should('be.null')
  })
})