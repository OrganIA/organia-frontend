/* eslint-disable no-undef */
describe('New Chat room Test Success', () => {
  it('Tries to edit chat room', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('test@irama.com')

    cy.get('.cypress-password')
      .type('irama')

    cy.get('.cypress-submit-login').click()
    cy.get('.cypress-to-chats').click()
    cy.get('.cypress-conversation').first().click()
    cy.get('.fa-edit').click()
    cy.get(".cypress-edit-chat-name").clear().type("test")
    cy.get('.cypress-edit-chat-save').click()
  })
})