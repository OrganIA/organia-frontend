/* eslint-disable no-undef */
import { emailGenerator } from "../utils"
var email = emailGenerator();
describe('Register Test Success', () => {
  it('Tries to register should succeed', () => {
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

    cy.get('.cypress-phone-number')
      .type('+33769356787')

    cy.get('.cypress-email')
      .type(`${email}@test.com`)
      .should('have.value', `${email}@test.com`)

    cy.get('.cypress-password')
      .type('saber')
      .should('have.value', 'saber')

    cy.intercept('POST', '**/users/').as('register')
    cy.intercept('POST', '**/auth').as('login')
    cy.get('.cypress-register').click()
    cy.wait('@register', { timeout: 20000 })
    cy.wait('@login', { timeout: 20000 })

    cy.url().should('eq', `${Cypress.config().baseUrl}landing`)
    cy.getCookie("token").should('not.be.null')
  })
})