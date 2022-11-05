/* eslint-disable no-undef */
describe('Add chat room', () => {
    it('Tries to add a chat room should fail', () => {
      cy.visit(Cypress.config().baseUrl)
  
      cy.get('.cypress-to-register').click()
  
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

      cy.get('.cypress-to-chats').click();
  
      cy.url().should('eq', Cypress.config().baseUrl + '/chat')
  
      cy.get('.cypress-add').click();
  
      cy.get('.cypress-create').click();
  
      cy.url().should('eq', Cypress.config().baseUrl + '/chat')
    })
  })