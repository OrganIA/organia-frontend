
describe('Go to caledar', () => {
  it('Tries to go to the calendar page should succeed', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('saber@saber.com')
      .should('have.value', 'saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')
      .should('have.value', 'saber')

    cy.get('.cypress-login').click()

    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.getCookie("token").should('not.be.null')

    cy.get('.cypress-to-calendar').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/eventcalendar')
  })
})