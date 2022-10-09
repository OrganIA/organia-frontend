/* eslint-disable no-undef */
import { emailGenerator } from "../utils"
var email = emailGenerator();

describe('Register Test Failure', () => {
  it('Tries to register should succeed', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('.cypress-to-register').click()

    cy.url().should('eq', 'http://localhost:8081/register')

    cy.get('.cypress-email')
      .type(`${email}@toto1`)
      .should('have.value', `${email}@toto1`)

    cy.get('.cypress-password')
      .type('cypress')
      .should('have.value', 'cypress')

    cy.get('.cypress-register').click()

    cy.url().should('eq', Cypress.config().baseUrl + '/register')
    cy.getCookie("token").should('be.null')
  })
})
