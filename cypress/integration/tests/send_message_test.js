/* eslint-disable no-undef */
import { emailGenerator } from "../utils"
var message = emailGenerator();

describe('Send Message', () => {
  it('Tries to send a message', () => {
    cy.visit('http://localhost:8080/')

    cy.get('.cypress-to-register').click()

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('saber@saber.com')
      .should('have.value', 'saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')
      .should('have.value', 'saber')

    cy.get('.cypress-login').click()

    cy.url().should('eq', 'http://localhost:8080/')

    cy.getCookie("token").should('not.be.null')

    cy.get('.cypress-to-chats').click();

    cy.url().should('eq', 'http://localhost:8080/chat')

    cy.get('.cypress-chat-room').first().click();

    cy.get('.cypress-chat-box').type(message);

    cy.get('.cypress-send-msg').click();

    cy.get('.cypress-message').last().contains(message);
  })
})