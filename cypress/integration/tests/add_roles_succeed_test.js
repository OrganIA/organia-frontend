/* eslint-disable no-undef */
import { emailGenerator } from "../utils"
var email = emailGenerator();

describe('Add roles success', () => {
    it('Tries to add a role should succeed', () => {
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

      cy.get('.cypress-to-roles').click();

      cy.url().should('eq', 'http://organia.savatier.fr/administrator/role')

      cy.get('.cypress-to-add').click();

      cy.url().should('eq', 'http://organia.savatier.fr/administrator/role/add')

      cy.get('.cypress-name')
        .type(`${email}`)
        .should('have.value', `${email}`)
    
      cy.get('.cypress-users')
        .select('false')
        .should('have.value', 'false')
    
      cy.get('.cypress-persons')
      .select('false')
      .should('have.value', 'false')
  
      cy.get('.cypress-roles')
        .select('true')
        .should('have.value', 'true')
    
      cy.get('.cypress-hospitals')
        .select('false')
        .should('have.value', 'false')
  
      cy.get('.cypress-invitation')
        .select('false')
        .should('have.value', 'false')

      cy.get('.cypress-add').click();

      cy.url().should('eq', 'http://organia.savatier.fr/administrator/role')
   })
})