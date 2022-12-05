describe('Create chat from donor', () => {
    it('Try to create chat from a reciever', () => {
        cy.visit(Cypress.config().baseUrl)

        cy.get('.cypress-to-login').click()

        cy.get('.cypress-email')
            .type('test@irama.com')

        cy.get('.cypress-password')
            .type('irama')

        cy.get('.cypress-submit-login').click()

        cy.get('.cypress-patient-gestionary').realClick();
        cy.get('.cypress-to-receivers').click();
        cy.get('.cypress-receivers-row').first().find(".cypress-receiver-modal").click();
        cy.get(".cypress-receiver-modal")
        cy.get(".cypress-info-body-receiver").scrollTo("bottom")
        cy.get(".cypress-reciever-chat-modal").click()

        cy.get('.cypress-receiver-chat-title')
            .type('Conversation : Receveur')
            .should('have.value', 'Conversation : Receveur')
  
        cy.get('.cypress-receiver-nonadd-user').first().select(0)
  
        cy.get('.cypress-receiver-save').click()
    })
})