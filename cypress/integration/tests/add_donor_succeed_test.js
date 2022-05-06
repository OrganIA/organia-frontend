/* eslint-disable no-undef */
describe('Add receiver', () => {
  it('Tries to open modal in the receiver panel should succeed', () => {
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

    cy.get('.cypress-admission-date')
      .type('2000-10-22')
      .should('have.value', '2000-10-22')

    cy.get('.cypress-organ')
      .select('HEART')
      .should('have.value', 'HEART')
    
    cy.get('.cypress-tumors-number')
      .type('3')
      .should('have.value', '3')
    
    cy.get('.cypress-is-dialyse')
      .select('true')
      .should('have.value', 'true')

    cy.get('.cypress-is-retransplantation')
      .select('false')
      .should('have.value', 'false')
    
    cy.get('.cypress-beginning-dialyse')
      .type('2000-10-22')
      .should('have.value', '2000-10-22')

    cy.get('.cypress-end-dialyse')
      .type('2000-10-22')
      .should('have.value', '2000-10-22')

    cy.get('.cypress-blood')
      .select('A')
      .should('have.value', 'A')

    cy.get('.cypress-rhesus')
      .select('+')
      .should('have.value', '+')

    cy.get('.cypress-gender')
      .select('MALE')
      .should('have.value', 'MALE')

    cy.get('.cypress-add').click();

    cy.url().should('eq', 'http://localhost:8080/donors')
  })
})