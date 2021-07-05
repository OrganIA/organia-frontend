import { emailGenerator } from "../utils"
var email = emailGenerator();

describe('Register Test', () => {
  it('Tries to register', () => {
    cy.visit('http://localhost:8080/')

    cy.get('.action-to-register').click()

    cy.get('.action-name')
    .type(`${email}`)
    .should('have.value', `${email}`)  

    cy.get('.action-email')
    .type(`${email}@cypress.com`)
    .should('have.value', `${email}@cypress.com`)  

    cy.get('.action-password')
    .type('cypress')
    .should('have.value', 'cypress')  

    cy.get('.action-register').click()
  })
})
