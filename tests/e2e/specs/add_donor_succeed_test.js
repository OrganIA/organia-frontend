/* eslint-disable no-undef */
describe('Add donor success', () => {
  it('Tries to open modal in the receiver panel should succeed', () => {
    cy.visit('http://organia.francecentral.cloudapp.azure.com/')

    cy.get('.cypress-to-register').click()

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('saber@saber.com')
      .should('have.value', 'saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')
      .should('have.value', 'saber')

    cy.get('.cypress-login').click()

    cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/')

    cy.getCookie("token").should('not.be.null')

    cy.get('.cypress-to-donors').click();

    cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/donors')

    cy.get('.cypress-to-add').click();

    cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/donors/add')

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
      .clear()
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

    cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/donors')
  })
})