/* eslint-disable no-undef */
describe('Login Test Failure', () => {
  it('Tries to login should fail', () => {
    cy.visit('http://localhost:8080/')

    cy.get('.cypress-to-register').click()

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('jexistePasWsh@cypress.com')
      .should('have.value', 'jexistePasWsh@cypress.com')

    cy.get('.cypress-password')
      .type('caca')
      .should('have.value', 'caca')

    cy.get('.cypress-login').click()

    cy.url().should('eq', 'http://localhost:8080/login')

    cy.getCookie("token").should('be.null')
  })
})