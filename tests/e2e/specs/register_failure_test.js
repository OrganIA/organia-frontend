/* eslint-disable no-undef */
import { emailGenerator } from "../utils"
var email = emailGenerator();

describe('Register Test Failure', () => {
  it('Tries to register should succeed', () => {
    cy.visit('http://organia.francecentral.cloudapp.azure.com/')
    cy.get('.cypress-to-register').click()

    cy.url().should('eq', 'http://localhost:8081/register')

    cy.get('.cypress-email')
      .type(`${email}@toto1`)
      .should('have.value', `${email}@toto1`)

    cy.get('.cypress-password')
      .type('cypress')
      .should('have.value', 'cypress')

    cy.get('.cypress-register').click()

    cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/register')
    cy.getCookie("token").should('be.null')
  })
})
