describe('Create chat from receiver', () => {
    it('Try to create chat from a receiver', () => {
        cy.visit(Cypress.config().baseUrl)

        cy.get('.cypress-email')
            .type('saber@saber.com')

        cy.get('.cypress-password')
            .type('saber')

        cy.intercept({ method: 'POST', url: '**/auth/login' }).as('login')
        cy.get('.cypress-submit-login').click()
        cy.wait('@login', { timeout: 20000 }).its('response.statusCode').should('equal', 200)

        cy.get('.cypress-patient-gestionary').realClick();
        cy.get('.cypress-to-receivers').click();
        cy.get('.cypress-receiver-row').first().find(".cypress-edit-receiver").click();
        cy.get(".edit-receiver-modal")
        cy.get(".cypress-edit-body").scrollTo("bottom")
        cy.get(".cypress-receiver-chat-modal").click()

        cy.get('.cypress-chat-title')
            .type('Receiver')
            .should('have.value', 'Receiver')

        cy.get('.cypress-non-add-user').first().click()

        cy.get('.cypress-save').click()
    })
})