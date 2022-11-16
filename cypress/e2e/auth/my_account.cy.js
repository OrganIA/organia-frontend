
describe('Login Test Success', () => {
  it('Tries to login should succeed', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')

    cy.get('.cypress-submit-login').click()

    cy.get('.cypress-user-dropdown').realClick()

    cy.get('.cypress-to-account').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}account`)
  })
})