
describe('Download PDF', () => {
  it('Try to generate and download the PDF information', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')

    cy.get('.cypress-submit-login').click()

    cy.get('.cypress-patients-menu').realClick();
    cy.get('.cypress-to-receivers').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}receivers`)
    cy.get('.cypress-receiver-row').first().find(".cypress-info-receiver-modal").click();
    cy.get(".cypress-info-modal")
    cy.get(".cypress-info-body").scrollTo("bottom")
    cy.get(".cypress-pdf").click()
  })
})