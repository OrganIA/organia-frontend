describe('Update role', () => {
  it('Tries to update a role should succeed', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-email')
      .type('saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')

    cy.intercept({ method: 'POST', url: '**/auth/login' }).as('login')
    cy.get('.cypress-submit-login').click()
    cy.wait('@login', { timeout: 20000 }).its('response.statusCode').should('equal', 200)

    cy.url().should('eq', `${Cypress.config().baseUrl}landing`)

    cy.visit(Cypress.config().baseUrl + 'administrator/role')

    cy.url().should('eq', Cypress.config().baseUrl + 'administrator/role')
    cy.get(".cypress-roles-row").eq(2).find(".cypress-manage-users").click()
    cy.get(".cypress-roles-row").eq(2).find(".cypress-manage-persons").click()
    cy.get(".cypress-roles-row").eq(2).find(".cypress-manage-roles").click()
    cy.get(".cypress-roles-row").eq(2).find(".cypress-manage-hospitals").click()
    cy.get(".cypress-roles-row").eq(2).find(".cypress-manage-listings").click()
    cy.intercept({ method: 'POST', url: '**/roles/**' }).as('updateRole')
    cy.get(".cypress-update").click()
    cy.wait('@updateRole', { timeout: 20000 }).its('response.statusCode').should('equal', 200)
  })
})