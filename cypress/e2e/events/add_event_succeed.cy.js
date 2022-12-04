
describe('Add Event', () => {
  it('Tries to open modal in the event panel should succeed', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('test@irama.com')
      .should('have.value', 'test@irama.com')

    cy.get('.cypress-password')
      .type('irama')
      .should('have.value', 'irama')

      cy.get('.cypress-submit-login').click()
      cy.intercept('POST', '**/auth').as('login')
      //cy.wait('@login', { timeout: 10000 })

      cy.url().should('eq', 'http://localhost:8080/landing')
      cy.getCookie("token").should('not.be.null')

    cy.get('.cypress-event').click()
    cy.get('.cypress-event-list').click()
    cy.url().should('eq', Cypress.config().baseUrl + 'eventlist')

    cy.get('.cypress-add-event').click()

    cy.get('.cypress-datetime')
      .type('2022-11-15T14:44')
      .should('have.value', '2022-11-15T14:44')

    cy.get('.cypress-textarea')
      .type('Ajout evenement pour un teste sur cypress')
      .should('have.value', 'Ajout evenement pour un teste sur cypress')

      cy.get('.cypress-add-this-event').click();
  })
})