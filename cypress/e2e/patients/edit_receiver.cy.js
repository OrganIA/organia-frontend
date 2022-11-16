
describe('Delete receiver ', () => {
  it('Tries to remove a receiver should succeed', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('saber@saber.com')
      .should('have.value', 'saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')
      .should('have.value', 'saber')

    cy.intercept({ method: 'POST', url: '**/auth' }).as('login')
    cy.get('.cypress-submit-login').click()
    cy.wait('@login', { timeout: 20000 })

    cy.url().should('eq', `${Cypress.config().baseUrl}landing`)
    cy.getCookie("token").should('not.be.null')

    cy.get('#patients').click();
    cy.get('.cypress-to-receivers').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}receivers`)

    cy.get('.cypress-receiver-row').first().find('.cypress-edit-receiver-modal').click()
    cy.get(".cypress-receiver-edit-firstname").clear().type("Bernard")
    cy.get(".cypress-receiver-edit-submit").click()
  })
})