/* eslint-disable no-undef */
import { emailGenerator } from "../utils"
var email = emailGenerator();

describe('Register Test Success', () => {
  it('Tries to register should succeed', () => {
    cy.visit('http://organia.francecentral.cloudapp.azure.com/')

    cy.get('.cypress-to-register').click()

    cy.get('.cypress-email')
      .type(`${email}@cypress.com`)
      .should('have.value', `${email}@cypress.com`)

    cy.get('.cypress-password')
      .type('cypress')
      .should('have.value', 'cypress')

    cy.get('.cypress-register').click()

    cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/')

    cy.getCookie("token").should('not.be.null')
  })
})
