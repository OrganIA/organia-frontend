/* eslint-disable no-undef */
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

    /*cy.url().should('eq', Cypress.config().baseUrl + '/eventlist')
    cy.get('.cypress-to-add').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/eventlist/add')
    cy.get('.cypress-datetime')
      .type('2022-01-17T14:44')
      .should('have.value', '2022-01-17T14:44')

    cy.get('.cypress-textarea')
      .type('cypress evenement test')
      .should('have.value', 'cypress evenement test')

    cy.get('.cypress-add').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/eventlist')*/
  })
})