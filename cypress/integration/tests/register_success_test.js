/* eslint-disable no-undef */
import { emailGenerator } from "../utils"
var email = emailGenerator();

describe('Register Test Success', () => {
  it('Tries to register should succeed', () => {
    cy.visit('http://localhost:8080/')

    cy.get('.cypress-to-register').click()

    cy.get('.cypress-name')
      .type(`${email}`)
      .should('have.value', `${email}`)

    cy.get('.cypress-email')
      .type(`${email}@cypress.com`)
      .should('have.value', `${email}@cypress.com`)

    cy.get('.cypress-password')
      .type('cypress')
      .should('have.value', 'cypress')

    cy.get('.cypress-register').click()

    cy.url().should('eq', 'http://localhost:8080/')

    cy.getCookie("token").should('not.be.null')
  })
})
