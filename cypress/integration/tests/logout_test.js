/* eslint-disable no-undef */
describe('Logout', () => {
    it('Tries to logout should succeed', () => {
        cy.visit('http://localhost:8080/')

        cy.get('.cypress-email')
            .type('saber@saber.com')
            .should('have.value', 'saber@saber.com')

        cy.get('.cypress-password')
            .type('saber')
            .should('have.value', 'saber')

        cy.get('.cypress-login').click()

        cy.url().should('eq', 'http://localhost:8080/')

        cy.get(".cypress-logout").click({force: true})
        
        cy.url().should('eq', "http://localhost:8080/login")
        cy.getCookie("token").should('be.null')
    })
})