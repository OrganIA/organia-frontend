
import { emailGenerator } from "../../utils"
var message = emailGenerator();

describe('Send Message', () => {
  it('Tries to send a message', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-email')
      .type('saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')

    cy.intercept({ method: 'POST', url: '**/auth/login' }).as('login')
    cy.get('.cypress-submit-login').click()
    cy.wait('@login', { timeout: 20000 }).its('response.statusCode').should('equal', 200)

    cy.get('.cypress-to-chats').click()
    cy.get('.cypress-conversation').first().click()
    cy.get(".cypress-message-input").type("test")
    cy.get('.fa-paper-plane').click()
  })
})