/* eslint-disable no-undef */
describe('Check Landing page element', () => {
  it('Tries to open modal in the receiver panel should succeed', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-email')
      .type('saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')

    cy.intercept({ method: 'POST', url: '**/auth/login' }).as('login')
    cy.get('.cypress-submit-login').click()
    cy.wait('@login', { timeout: 20000 }).its('response.statusCode').should('equal', 200)
    cy.url().should('eq', Cypress.config().baseUrl + 'landing')

    cy.get('.cypress-avatar')
    cy.get('.cypress-avatar-display')
    cy.get('.cypress-avatar-name')

    cy.get('.cypress-landing-title')

    cy.get('.cypress-raccourci')

    cy.get('.cypress-button-chat')
    cy.get('.cypress-chat-icon')
    cy.get('.cypress-chat-text')

    cy.get('.cypress-button-account')
    cy.get('.cypress-account-icon')
    cy.get('.cypress-account-text')

    cy.get('.cypress-event-list-title')
    cy.get('.cypress-event-card')
    cy.get('.cypress-event-header')
    cy.get('.cypress-event-header-title')
    cy.get('.cypress-event-date-box')
    cy.get('.cypress-event-date')

  })
})