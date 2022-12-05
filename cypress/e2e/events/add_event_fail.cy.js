
describe('Add event fail', () => {
  it('Tries to open modal in the event panel should fail', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('.cypress-email')
      .type('saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')

    cy.intercept({ method: 'POST', url: '**/auth/login' }).as('login')
    cy.get('.cypress-submit-login').click()
    cy.wait('@login', { timeout: 20000 }).its('response.statusCode').should('equal', 200)

    cy.get('.cypress-event').click();
    cy.get('.cypress-event-list').click();

    cy.url().should('eq', Cypress.config().baseUrl + 'eventlist')
    cy.get('.cypress-add-event').click();

    cy.get('.cypress-start-date')
      .type('2022-06-01T14:44')
      .should('have.value', '2022-06-01T14:44')
    cy.get('.cypress-end-date')
      .type('2022-06-01T14:44')
      .should('have.value', '2022-06-01T14:44')
    cy.get('.cypress-event-description')
      .type('Test')
      .should('have.value', 'Test')

    cy.get('.cypress-event-type')
      .type('Test')
      .should('have.value', 'Test')
    cy.get('.cypress-add-this-event').click();

  })
})