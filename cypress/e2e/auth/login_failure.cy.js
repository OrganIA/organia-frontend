/* eslint-disable no-undef */
describe('Login Test Fail', () => {
  it('Tries to login should Fail', () => {
    console.log(Cypress.config().baseUrl)
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('saber@saber.com')
      .should('have.value', 'saber@saber.com')

    cy.get('.cypress-submit-login').click()

    cy.url().should('eq', `${Cypress.config().baseUrl}login`)
    cy.getCookie("token").should('be.null')
  })
})