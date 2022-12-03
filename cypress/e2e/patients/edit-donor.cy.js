/* eslint-disable no-undef */
describe('Add donor success', () => {
    it('Tries to open modal in the receiver panel should succeed', () => {
      cy.visit(Cypress.config().baseUrl)
  
      cy.get('.cypress-to-login').click()
  
      cy.get('.cypress-email')
        .type('test@irama.com')
        .should('have.value', 'test@irama.com')
  
      cy.get('.cypress-password')
        .type('irama')
        .should('have.value', 'irama')
  
      cy.get('.cypress-submit-login').click()
      cy.intercept('POST', '**/auth').as('login')
      //cy.wait('@login', { timeout: 10000 })
  
      cy.url().should('eq', 'http://localhost:8080/landing')
      cy.getCookie("token").should('not.be.null')
  
      cy.get('.cypress-patient').click()
      cy.get('.cypress-to-donors').click()
      cy.url().should('eq', Cypress.config().baseUrl + 'donors')

      cy.get('.cypress-edit-donor').first()
        .click()
    })
})