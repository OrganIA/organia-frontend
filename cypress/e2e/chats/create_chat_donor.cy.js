describe('Create chat from donor', () => {
    it('Try to create chat from a donor', () => {
        cy.visit(Cypress.config().baseUrl)

        cy.get('.cypress-email')
            .type('saber@saber.com')

        cy.get('.cypress-password')
            .type('saber')

        cy.intercept({ method: 'POST', url: '**/auth/login' }).as('login')
        cy.get('.cypress-submit-login').click()
        cy.wait('@login', { timeout: 20000 }).its('response.statusCode').should('equal', 200)

        cy.get('.cypress-patient-gestionary').realClick();
        cy.get('.cypress-to-donors').click();
        cy.get('.cypress-donor-row').first().find(".cypress-edit-donor").click();
        cy.get(".edit-donor-modal")
        cy.get(".cypress-edit-body").scrollTo("bottom")
        cy.get(".cypress-donor-chat-modal").click()

        cy.get('.cypress-chat-title')
            .type('Doneurs')
            .should('have.value', 'Doneurs')

        cy.get('.cypress-non-add-user').first().click()

        cy.get('.cypress-save').click()
    })
})