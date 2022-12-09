import { emailGenerator } from "../../utils"
var email = emailGenerator();

describe('Add role', () => {
  it('Tries to add a role should succeed', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-email')
      .type('saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')

    cy.intercept({ method: 'POST', url: '**/auth/login' }).as('login')
    cy.get('.cypress-submit-login').click()
    cy.wait('@login', { timeout: 20000 }).its('response.statusCode').should('equal', 200)

    cy.get('.cypress-admin-menu').realClick();

    cy.get('.cypress-to-roles').click();
    cy.get('.create-new-role').click();
    cy.get('.cypress-name')
      .type('admin')
      .should('have.value', 'admin')
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
    cy.get('.cypress-listings')
      .select("Oui")
      .should('have.value', 'true')
    cy.intercept({ method: 'POST', url: '**/roles/' }).as('add')
    cy.get('.cypress-add').click();
    cy.wait('@add', { timeout: 20000 }).its('response.statusCode').should('equal', 422)
    cy.get(".c-toast")
    cy.get(".cypress-close").click()

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
    cy.get('.cypress-listings')
      .select("Oui")
      .should('have.value', 'true')
    cy.intercept({ method: 'POST', url: '**/roles/' }).as('add')
    cy.get('.cypress-add').click();
    cy.wait('@add', { timeout: 20000 }).its('response.statusCode').should('equal', 200)
    cy.get(".c-toast")
  })
})