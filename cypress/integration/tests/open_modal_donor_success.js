/* eslint-disable no-undef */
describe('Add donor', () => {
  it('Tries to add a donor should succeed', () => {
    cy.visit('http://localhost:8080/')

    cy.get('.cypress-to-register').click()

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('saber@saber.com')
      .should('have.value', 'saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')
      .should('have.value', 'saber')

    cy.get('.cypress-login').click()

    cy.url().should('eq', 'http://localhost:8080/')

    cy.getCookie("token").should('not.be.null')

    cy.get('.cypress-to-donors').click();

    cy.url().should('eq', 'http://localhost:8080/donors')

    cy.get('.cypress-to-add').click();

    cy.url().should('eq', 'http://localhost:8080/donors/add')

    cy.get('.cypress-first-name')
      .type('Prénom')
      .should('have.value', 'Prénom')

    cy.get('.cypress-last-name')
      .type('Nom')
      .should('have.value', 'Nom')

    cy.get('.cypress-birth-date')
      .type('2000-10-22')
      .should('have.value', '2000-10-22')

    cy.get('.cypress-organ')
      .select('HEART')
      .should('have.value', 'HEART')

    cy.get('.cypress-admission-date')
      .type('2000-10-22')
      .should('have.value', '2000-10-22')

    cy.get('.cypress-add').click();

    cy.get('.cypress-to-donors').click()
    
    cy.url().should('eq', 'http://localhost:8080/donors')

    cy.get('.cypress-donor-modal').first().click()

  })
})