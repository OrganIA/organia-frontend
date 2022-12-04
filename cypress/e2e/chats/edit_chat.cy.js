/* eslint-disable no-undef */
describe('New Chat room Test Success', () => {
  it('Tries to edit chat room', () => {
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
    cy.get('.fa-edit').click()
    cy.get(".cypress-edit-chat-name").clear().type("test")
    cy.get('.cypress-edit-chat-save').click()
  })
})