describe('Add roles fail', () => {
  it('Tries to add a role should fail', () => {
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

    cy.url().should('eq', Cypress.config().baseUrl + 'administrator/role')
    cy.get('.create-new-role').click();
    cy.get('.cypress-name')
      .type('fail')
      .should('have.value', 'fail')
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
    cy.wait('@add', { timeout: 20000 }).its('response.statusCode').should('equal', 422)
    cy.get(".c-toast")
  })
})