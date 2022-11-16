describe('Update user', () => {
    it('Tries to update a user', () => {
        cy.visit(Cypress.config().baseUrl)

        cy.get('.cypress-to-login').click()

        cy.get('.cypress-email')
            .type('saber@saber.com')

        cy.get('.cypress-password')
            .type('saber')

        cy.get('.cypress-submit-login').click()

        cy.get('.cypress-admin-menu').realClick();
        cy.get('.cypress-to-users').click();

        cy.url().should('eq', Cypress.config().baseUrl + 'administrator')
        cy.get(".cypress-user-row").first().find(".cypress-user-edit").click()
        cy.get(".cypress-role-selector").select(0)
        cy.get(".cypress-submit").click()
    })
})