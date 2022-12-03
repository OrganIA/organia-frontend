describe('Create chat from donor', () => {
    it('Try to create chat from a donor', () => {
        cy.visit(Cypress.config().baseUrl)

        cy.get('.cypress-to-login').click()

        cy.get('.cypress-email')
            .type('test@irama.com')

        cy.get('.cypress-password')
            .type('irama')

        cy.get('.cypress-submit-login').click()

        cy.get('.cypress-patient-gestionary').realClick();
        cy.get('.cypress-to-donors').click();
        cy.get('.cypress-donor-row').first().find(".cypress-info-donor-modal").click();
        cy.get(".cypress-info-donor-modal")
        cy.get(".cypress-info-body").scrollTo("bottom")
        cy.get(".cypress-donor-chat-modal").click()

        cy.get('.cypress-chat-title')
            .type('Conversation : Doneurs')
            .should('have.value', 'Conversation : Doneurs')
  
        cy.get('.cypress-nonadd-user').first().select(0)
  
        cy.get('.cypress-save').click()
    })
})