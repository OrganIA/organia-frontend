/* eslint-disable no-undef */
import { emailGenerator } from "../utils"
var email = emailGenerator();

describe('Register Test Failure', () => {
  it('Tries to register should succeed', () => {
    cy.visit('http://organia.francecentral.cloudapp.azure.com/')

    cy.get('.cypress-to-register').click()

    cy.get('.cypress-email')
      .type(`${email}`)
      .should('have.value', `${email}`)

    cy.get('.cypress-password')
      .type('cypress')
      .should('have.value', 'cypress')

    cy.get('.cypress-register').click()

    cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/register')

    cy.getCookie("token").should('be.null')
  })
})
