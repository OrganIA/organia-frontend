/* eslint-disable no-undef */
describe('New Chat room Test Success', () => {
  it('Tries to create a new chat room and should succeed', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('test@irama.com')
      .should('have.value', 'test@irama.com')

    cy.get('.cypress-password')
      .type('irama')
      .should('have.value', 'irama')

    cy.intercept('POST', '**/auth').as('login')
    cy.get('.cypress-submit-login').click()
    cy.wait('@login', { timeout: 10000 })

    cy.url().should('eq', 'http://localhost:8080/landing')
    cy.getCookie("token").should('not.be.null')

    cy.get('.cypress-to-chats').click()
    cy.url().should('eq', Cypress.config().baseUrl + 'chat')

    cy.get('.header-chat')
    cy.get('.icon')
    cy.get('.icon').click()

    cy.get('.cypress-chat-title')
      .type('Conversation de test')
      .should('have.value', 'Conversation de test')

    cy.get('.cypress-nonadd-user').first().select(0)

    cy.get('.cypress-save').click()
  
    cy.get('.discussions').first().contains('Conversation de test')
  })
})