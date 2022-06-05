/* eslint-disable no-undef */
describe('Logout', () => {
    it('Tries to logout should succeed', () => {
        cy.visit('http://organia.francecentral.cloudapp.azure.com/')

        cy.get('.cypress-email')
            .type('saber@saber.com')
            .should('have.value', 'saber@saber.com')

        cy.get('.cypress-password')
            .type('saber')
            .should('have.value', 'saber')

        cy.get('.cypress-login').click()

        cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/')

        cy.get(".cypress-logout").click({force: true})
        cy.url().should('eq', "http://organia.francecentral.cloudapp.azure.com/login")
        cy.getCookie("token").should('be.null')
    })
})