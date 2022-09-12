/* eslint-disable no-undef */
import { emailGenerator } from "../utils"
var email = emailGenerator();

//http://localhost:8081/
//http://organia.francecentral.cloudapp.azure.com/

  
var number = Math.floor(Math.random() * 9000000000) + 1000000000;

describe('Register Test Success', () => {
  it('Tries to register should succeed', () => {
    cy.visit('http://localhost:8081/')

    cy.get('.cypress-to-register').click()

    cy.url().should('eq', 'http://localhost:8081/register')

    cy.get('.cypress-lastname')
      .type(`${email}_lastname`)
      .should('have.value', `${email}_lastname`)

    cy.get('.cypress-firstname')
      .type(`${email}_name`)
      .should('have.value', `${email}_name`)

    cy.get('.cypress-phone-number')
      .type(number)
      .should('have.value', ``)

    cy.get('.cypress-email')
      .type(`${email}@cypress.com`)
      .should('have.value', `${email}@cypress.com`)

    cy.get('.cypress-password')
      .type('cypress')
      .should('have.value', 'cypress')

    cy.get('.cypress-register').click()

    cy.url().should('eq', 'http://localhost:8081/')

    cy.getCookie("token").should('not.be.null')
  })
})
