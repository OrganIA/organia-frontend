/* eslint-disable no-undef */

describe('Check logs page', () => {
  it('Tries to register should succeed', () => {
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
    cy.get('.cypress-to-logs').click()

  })
})
