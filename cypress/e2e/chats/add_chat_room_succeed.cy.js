
describe('Add chat room', () => {
  it('Tries to add a chat room should succeed', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-email')
      .type('saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')

    cy.intercept({ method: 'POST', url: '**/auth/login' }).as('login')
    cy.get('.cypress-submit-login').click()
    cy.wait('@login', { timeout: 20000 }).its('response.statusCode').should('equal', 200)

    cy.get('.cypress-to-chats').click()
    cy.url().should('eq', Cypress.config().baseUrl + 'chat')

    cy.get('.header-chat')
    cy.get('.icon').click()

    cy.get('.cypress-chat-title')
      .type('Conversation de test')
      .should('have.value', 'Conversation de test')

    cy.get('.cypress-nonadd-user').select(0)

    cy.get('.cypress-save').click()

  })
})