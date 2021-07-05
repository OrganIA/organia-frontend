import { emailGenerator } from "../utils"
var email = emailGenerator();

describe('Register Test Success', () => {
  it('Tries to register should succeed', () => {
    cy.visit('http://localhost:8080/')

    cy.get('.action-to-register').click()

    cy.get('.action-name')
    .type(`${email}`)
    .should('have.value', `${email}`)  

    cy.get('.action-email')
    .type(`${email}`)
    .should('have.value', `${email}`)  

    cy.get('.action-password')
    .type('cypress')
    .should('have.value', 'cypress')  

    cy.get('.action-register').click()
    cy.url().should('eq', 'http://localhost:8080/register')
    cy.getCookie("token").should('be.null')
  })
})
