describe('Update user', () => {
    it('Tries to update a user', () => {
        cy.visit(Cypress.config().baseUrl)

        cy.get('.cypress-email')
            .type('saber@saber.com')

        cy.get('.cypress-password')
            .type('saber')

        cy.intercept({ method: 'POST', url: '**/auth/login' }).as('login')
        cy.get('.cypress-submit-login').click()
        cy.wait('@login', { timeout: 20000 }).its('response.statusCode').should('equal', 200)

        cy.visit(Cypress.config().baseUrl + 'administrator')

        cy.url().should('eq', Cypress.config().baseUrl + 'administrator')
        cy.get(".cypress-user-row").first().find(".cypress-user-edit").click()
        cy.get(".cypress-role-selector").select(0)
        cy.intercept({ method: 'POST', url: '**/users/**' }).as('user')
        cy.get(".cypress-submit").click()
        cy.wait('@user', { timeout: 20000 }).its('response.statusCode').should('equal', 200)
    })
})