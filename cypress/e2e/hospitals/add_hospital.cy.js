var number = Math.floor(Math.random() * 9000000000) + 1000000000;

describe('Add hospital success', () => {
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

    cy.get('.cypress-to-hospitals-add').click()

    cy.get('.cypress-hospital-name')
      .type('Hopital Des Fleurs')
      .should('have.value', 'Hopital Des Fleurs')

    cy.get('.cypress-hospital-city')
      .type('CANNES')
      .should('have.value', 'CANNES')

    cy.get('.cypress-hospital-department')
      .type('06400')
      .should('have.value', '06400')

    cy.get('.cypress-hospital-phone-number')
      .type('04 59 35 62 00')
      .should('have.value', '04 59 35 62 00')

    cy.get('.cypress-hospital-add').click()

  })
})