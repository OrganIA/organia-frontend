
describe('Add donor fail', () => {
  it('Tries to add a receiver should fail', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('.cypress-to-register').click()

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('saber@saber.com')
      .should('have.value', 'saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')
      .should('have.value', 'saber')

    cy.get('.cypress-login').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.getCookie("token").should('not.be.null')

    cy.get('.cypress-to-donors').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/donors/')
    cy.get('.cypress-to-add').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/donors/add')

    cy.get('.cypress-first-name')
      .type('Prénom')
      .should('have.value', 'Prénom')

    cy.get('.cypress-last-name')
      .type('Nom')
      .should('have.value', 'Nom')

    cy.get('.cypress-birth-date')
      .type('2000-10-22')
      .should('have.value', '2000-10-22')

    cy.get('.cypress-admission-date')
      .type('2000-10-22')
      .should('have.value', '2000-10-22')

    cy.get('.cypress-add').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/donors/add')
    })
})