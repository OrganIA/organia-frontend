/* eslint-disable no-undef */
describe('Login Test Success', () => {
  it('Tries to login should succeed', () => {
    cy.visit('http://localhost:8080/')

    cy.get('.cypress-to-register').click()

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('saber@saber.com')
      .should('have.value', 'saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')
      .should('have.value', 'saber')

    cy.get('.cypress-login').click()

    cy.url().should('eq', 'http://localhost:8080/')

    cy.getCookie("token").should('not.be.null')
  })
})