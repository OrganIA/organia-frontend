
import { emailGenerator } from "../../utils"
var email = emailGenerator();
describe('Register Test Success', () => {
  it('Tries to register should succeed', () => {
    cy.visit(Cypress.config().baseUrl + "register")

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
      .type(`saber@saber.com`)
      .should('have.value', `saber@saber.com`)

    cy.get('.cypress-password')
      .type('saber')
      .should('have.value', 'saber')

    cy.intercept({ method: 'POST', url: '**/auth/register' }).as('register')
    cy.get('.cypress-register').click()
    cy.wait('@register', { timeout: 20000 }).its('response.statusCode').should('equal', 422)
    cy.getCookie("token").should('be.null')

    cy.get('.cypress-lastname')
    .clear()
      .type("saber")
      .should('have.value', "saber")

    cy.get('.cypress-firstname')
      .clear()
      .type("saber")
      .should('have.value', "saber")

    cy.get('.cypress-phone-number')
      .clear()
      .type('+33769356787')

    cy.get('.cypress-email')
      .clear()
      .type(`${email}@test.com`)
      .should('have.value', `${email}@test.com`)

    cy.get('.cypress-password')
      .clear()
      .type('saber')
      .should('have.value', 'saber')

    cy.intercept({ method: 'POST', url: '**/auth/register' }).as('register')
    cy.get('.cypress-register').click()
    cy.wait('@register', { timeout: 20000 }).its('response.statusCode').should('equal', 201)

    cy.url().should('eq', `${Cypress.config().baseUrl}landing`)
    cy.getCookie("token").should('not.be.null')
  })
})