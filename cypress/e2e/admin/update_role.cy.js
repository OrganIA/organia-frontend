describe('Add roles success', () => {
  it('Tries to update a role should succeed', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')

    cy.get('.cypress-submit-login').click()

    cy.url().should('eq', `${Cypress.config().baseUrl}landing`)
    cy.getCookie("token").should('not.be.null')

    cy.get('.cypress-admin-menu').realClick();
    cy.get('.cypress-to-roles').click();

    cy.url().should('eq', Cypress.config().baseUrl + 'administrator/role')
    cy.get(".cypress-roles-row").eq(2).find(".cypress-manage-users").click()
    cy.get(".cypress-roles-row").eq(2).find(".cypress-manage-persons").click()
    cy.get(".cypress-roles-row").eq(2).find(".cypress-manage-roles").click()
    cy.get(".cypress-roles-row").eq(2).find(".cypress-manage-hospitals").click()
    cy.get(".cypress-roles-row").eq(2).find(".cypress-manage-invite").click()
    cy.get(".cypress-update").click()
  })
})