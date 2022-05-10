/* eslint-disable no-undef */
describe('Add event fail', () => {
  it('Tries to open modal in the event panel should fail', () => {
    cy.visit('http://organia.savatier.fr/')

    cy.get('.cypress-to-register').click()

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('saber@saber.com')
      .should('have.value', 'saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')
      .should('have.value', 'saber')

    cy.get('.cypress-login').click()

    cy.url().should('eq', 'http://organia.savatier.fr/')

    cy.getCookie("token").should('not.be.null')

    cy.get('.cypress-to-eventlist').click();

    cy.url().should('eq', 'http://organia.savatier.fr/eventlist')

    cy.get('.cypress-to-add').click();

    cy.url().should('eq', 'http://organia.savatier.fr/eventlist/add')

    cy.get('.cypress-datetime')
      .type('2022-06-01T14:44')
      .should('have.value', '2022-06-01T14:44')

    cy.get('.cypress-add').click();

    cy.url().should('eq', 'http://organia.savatier.fr/eventlist/add')
  })
})