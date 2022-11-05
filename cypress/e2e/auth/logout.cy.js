/* eslint-disable no-undef */
describe('Logout Test', () => {
    it('Tries to logout should succeed', () => {
        cy.visit(Cypress.config().baseUrl)

        cy.get('.cypress-to-login').click()

        cy.get('.cypress-email')
            .type('saber@saber.com')
            .should('have.value', 'saber@saber.com')

        cy.get('.cypress-password')
            .type('saber')
            .should('have.value', 'saber')

        cy.intercept({method:'POST', url:'**/auth'}).as('login')
        cy.get('.cypress-submit-login').click()
        cy.wait('@login', { timeout: 20000 })

        console.log("Here")
        cy.url().should('eq', `${Cypress.config().baseUrl}landing`)
        cy.getCookie("token").should('not.be.null')

        cy.get('.cypress-app-navbar')
        cy.get('.cypress-user-dropdown').realHover()
        cy.get('.cypress-logout').click()
    })
})