/* eslint-disable no-undef */
import { emailGenerator } from "../../utils"
var email = emailGenerator();
describe('Register Test Fail', () => {
  it('Tries to register should fail', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-to-login').click()
    cy.get('.cypress-to-register').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}register`)

    cy.get('.cypress-lastname')
      .type("saber")
      .should('have.value', "saber")

    cy.get('.cypress-firstname')
      .type("saber")
      .should('have.value', "saber")

    cy.get('.cypress-email')
      .type(`${email}@test.com`)
      .should('have.value', `${email}@test.com`)

    cy.get('.cypress-password')
      .type('saber')
      .should('have.value', 'saber')

    cy.get('.cypress-register').click()
  })
})