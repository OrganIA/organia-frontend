
import { emailGenerator } from "../../utils"
var message = emailGenerator();

describe('Send Message', () => {
  it('Tries to send a message', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('test@irama.com')

    cy.get('.cypress-password')
      .type('irama')

    cy.get('.cypress-submit-login').click()
    cy.get('.cypress-to-chats').click()
    cy.get('.cypress-conversation').first().click()
    cy.get(".cypress-message-input").type("test")
    cy.get('.fa-paper-plane').click()
  })
})