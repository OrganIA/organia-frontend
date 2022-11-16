import { emailGenerator } from "../../utils"
var email = emailGenerator();

describe('Add roles success', () => {
  it('Tries to add a role should succeed', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')

    cy.get('.cypress-submit-login').click()

    cy.get('.cypress-admin-menu').realClick();
    cy.get('.cypress-to-roles').click();

    cy.url().should('eq', Cypress.config().baseUrl + 'administrator/role')
    cy.get('.create-new-role').click();
    cy.get('.cypress-name')
      .type(email)
      .should('have.value', email)
    cy.get('.cypress-users')
      .select("Oui")
      .should('have.value', 'true')
    cy.get('.cypress-persons')
      .select("Oui")
      .should('have.value', 'true')
    cy.get('.cypress-roles')
      .select("Oui")
      .should('have.value', 'true')
    cy.get('.cypress-hospitals')
      .select("Oui")
      .should('have.value', 'true')
    cy.get('.cypress-invitation')
      .select("Oui")
      .should('have.value', 'true')
    cy.intercept({ method: 'POST', url: '**/roles' }).as('add')
    cy.intercept({ method: 'POST', url: '**/roles/' }).as('add')
    cy.get('.cypress-add').click();
    cy.wait('@add', { timeout: 20000 }).its('response.statusCode').should('equal', 307)
    cy.wait('@add', { timeout: 20000 }).its('response.statusCode').should('equal', 201)
    cy.get(".c-toast")
  })
})