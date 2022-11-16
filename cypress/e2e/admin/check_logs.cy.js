describe('Check logs page', () => {
  it('Check logs page', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')

    cy.get('.cypress-submit-login').click()

    cy.get('.cypress-admin-menu').realClick();
    cy.intercept({ method: 'GET', url: '**/logs' }).as('logs')
    cy.intercept({ method: 'GET', url: '**/logs/' }).as('logs')
    cy.get('.cypress-to-logs').click();
    cy.wait('@logs', { timeout: 20000 }).its('response.statusCode').should('equal', 307)
    cy.wait('@logs', { timeout: 20000 }).its('response.statusCode').should('equal', 200)

  })
})
