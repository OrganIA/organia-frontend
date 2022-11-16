
describe('Logout Test', () => {
    it('Tries to logout should succeed', () => {
        cy.visit(Cypress.config().baseUrl)

        cy.get('.cypress-to-login').click()

        cy.get('.cypress-email')
            .type('saber@saber.com')

        cy.get('.cypress-password')
            .type('saber')

        cy.get('.cypress-submit-login').click()

        cy.get('.cypress-app-navbar')
        cy.get('.cypress-user-dropdown').realClick()
        cy.get('.cypress-logout').click()
    })
})