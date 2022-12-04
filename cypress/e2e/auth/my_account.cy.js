
describe('Login Test Success', () => {
  it('Tries to login should succeed', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-email')
      .type('saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')

    cy.intercept({ method: 'POST', url: '**/auth/login' }).as('login')
    cy.get('.cypress-submit-login').click()
    cy.wait('@login', { timeout: 20000 }).its('response.statusCode').should('equal', 200)

    cy.get('.cypress-app-navbar')
    cy.get('.cypress-user-dropdown').realClick()
    cy.get('.cypress-to-account').realClick()
    cy.url().should('eq', `${Cypress.config().baseUrl}account`)
  })
})