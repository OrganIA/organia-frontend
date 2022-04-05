/* eslint-disable no-undef */
describe('Add receiver', () => {
  it('Tries to add a receiver should fail', () => {
    cy.visit('http://localhost:8080/')

    cy.get('.cypress-to-register').click()

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('nicolas.yapobi@epitech.eu')
      .should('have.value', 'nicolas.yapobi@epitech.eu')

    cy.get('.cypress-password')
      .type('test')
      .should('have.value', 'test')


    cy.get('.cypress-login').click()

    cy.url().should('eq', 'http://localhost:8080/')

    cy.getCookie("token").should('not.be.null')

    cy.get('.cypress-to-receivers').click();

    cy.url().should('eq', 'http://localhost:8080/receivers')

    cy.get('.cypress-to-add').click();

    cy.url().should('eq', 'http://localhost:8080/receivers/add')

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

    cy.url().should('eq', 'http://localhost:8080/receivers/add')
  })
})