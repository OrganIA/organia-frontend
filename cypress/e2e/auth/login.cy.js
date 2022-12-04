
describe('Login Test', () => {
  it('Tries to login should succeed', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('.cypress-email')
      .type('existpas@gmail.com')
      .should('have.value', 'existpas@gmail.com')

    cy.get('.cypress-password')
      .type('motdepassequiexistepas')
      .should('have.value', 'motdepassequiexistepas')

    cy.get('.cypress-submit-login').click()

    cy.url().should('eq', `${Cypress.config().baseUrl}`)
    cy.getCookie("token").should('be.null')

    cy.get('.cypress-email')
      .clear()
      .type('saber@saber.com')
      .should('have.value', 'saber@saber.com')

    cy.get('.cypress-password')
      .clear()
      .type('saber')
      .should('have.value', 'saber')

    cy.intercept({ method: 'POST', url: '**/auth/login' }).as('login')
    cy.get('.cypress-submit-login').click()
    cy.wait('@login', { timeout: 20000 }).its('response.statusCode').should('equal', 200)

    cy.url().should('eq', `${Cypress.config().baseUrl}landing`)
    cy.getCookie("token").should('not.be.null')
  })
})