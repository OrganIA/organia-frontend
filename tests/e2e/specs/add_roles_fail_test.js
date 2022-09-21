/* eslint-disable no-undef */
import { emailGenerator } from "../utils"
var email = emailGenerator();

describe('Add roles success', () => {
    it('Tries to add a role should succeed', () => {
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

      cy.get('.cypress-to-roles').click();

      cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/administrator/role')

      cy.get('.cypress-to-add').click();

      cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/administrator/role/add')

      cy.get('.cypress-name')
        .type(`${email}`)
        .should('have.value', `${email}`)

      cy.get('.cypress-add').click();

      cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/administrator/role/add')
   })
})