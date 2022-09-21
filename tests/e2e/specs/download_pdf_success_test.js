/* eslint-disable no-undef */
describe('Download PDF', () => {
    it('Try to generate and download the PDF information', () => {
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
  
      cy.get('.cypress-pdf').click();
  
      cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/donors')
    })
  })