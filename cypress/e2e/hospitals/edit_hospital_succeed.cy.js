
/* execute if there is only one hospital */

describe('Edit hospital failed', () => {
  it('Tries to open modal in the receiver panel should succeed', () => {
    cy.visit(Cypress.config().baseUrl)  
    cy.get('.cypress-email')
    .type('saber@saber.com')

  cy.get('.cypress-password')
    .type('saber')

  cy.intercept({ method: 'POST', url: '**/auth/login' }).as('login')
  cy.get('.cypress-submit-login').click()
  cy.wait('@login', { timeout: 20000 }).its('response.statusCode').should('equal', 200)

  cy.get('.cypress-hospital').click();
  cy.get('.cypress-hospital-dropdown').click()
  cy.url().should('eq', Cypress.config().baseUrl + 'hospitals')

    cy.get('.cypress-to-hospitals-edit').first().click();
    cy.get('.cypress-name').clear().type('Hopital Des Fleurs');

    cy.get('.cypress-add').click();
  })
})