/* eslint-disable no-undef */
describe('Add chat room', () => {
  it('Tries to add a chat room should succeed', () => {
    cy.visit('http://organia.savatier.fr/')

    cy.get('.cypress-to-register').click()

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('saber@saber.com')
      .should('have.value', 'saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')
      .should('have.value', 'saber')

    cy.get('.cypress-login').click()

    cy.url().should('eq', 'http://organia.savatier.fr/')

    cy.getCookie("token").should('not.be.null')

    cy.get('.cypress-to-chats').click();
    
    cy.url().should('eq', 'http://organia.savatier.fr/chat')
    
    cy.intercept({
      method: 'GET',
      url: 'http://localhost:8000/api/chats/',
    }).as('getChats');

    cy.get('.cypress-add').click();

    cy.get('.cypress-invite').eq(0).click();

    cy.get('.cypress-create').click();

    cy.url().should('eq', 'http://organia.savatier.fr/chat')
  })
})