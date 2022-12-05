
describe('Go to caledar', () => {
  it('Tries to go to the calendar page should succeed', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('.cypress-email')
      .type('saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')

    cy.intercept({ method: 'POST', url: '**/auth/login' }).as('login')
    cy.get('.cypress-submit-login').click()
    cy.wait('@login', { timeout: 20000 }).its('response.statusCode').should('equal', 200)

    cy.get('.cypress-event').click();
    cy.get('.cypress-to-calendar').click();

    cy.url().should('eq', Cypress.config().baseUrl + 'eventcalendar')
  })
})