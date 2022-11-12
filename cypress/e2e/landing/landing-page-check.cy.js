/* eslint-disable no-undef */
describe('Check Landing page element', () => {
    it('Tries to open modal in the receiver panel should succeed', () => {
        cy.visit(Cypress.config().baseUrl)

        cy.get('.cypress-to-login').click()
    
        cy.get('.cypress-email')
          .type('test@irama.com')
          .should('have.value', 'test@irama.com')
    
        cy.get('.cypress-password')
          .type('irama')
          .should('have.value', 'irama')
    
        cy.get('.cypress-submit-login').click()
        cy.intercept('POST', '**/auth').as('login')
        //cy.wait('@login', { timeout: 10000 })
    
        cy.url().should('eq', 'http://localhost:8080/landing')
        cy.getCookie("token").should('not.be.null')

        cy.get('.cypress-avatar')
        cy.get('.cypress-avatar-display')
        cy.get('.cypress-avatar-name')

        cy.get('.cypress-landing-title')

        cy.get('.cypress-raccourci')

        cy.get('.cypress-button-chat')
        cy.get('.cypress-chat-icon')
        cy.get('.cypress-chat-text')

        cy.get('.cypress-button-account')
        cy.get('.cypress-account-icon')
        cy.get('.cypress-account-text')

        cy.get('.cypress-event-list-title')
        cy.get('.cypress-event-card')
        cy.get('.cypress-event-header')
        cy.get('.cypress-event-header-title')
        cy.get('.cypress-event-date-box')
        cy.get('.cypress-event-date')

        cy.get('.cypress-sidebar-container')

        cy.get('.cypress-admin-dropdown')
        cy.get('.cypress-admin-icon')
        cy.get('.cypress-admin-title')
        cy.get('.cypress-admin-dropdown-icon')
        cy.get('.cypress-admin-dropdown').click()
        cy.get('.cypress-sidebar-btn-dropdown')
        cy.get('.cypress-admin-icon2')
        cy.get('.cypress-admin-texte')
        cy.get('.cypress-history')
        cy.get('.cypress-history-icon')
        cy.get('.cypress-history-text')
        cy.get('.cypress-rule')
        cy.get('.cypress-rule-icon')
        cy.get('.cypress-rule-text')

        cy.get('.cypress-patient-gestionary')
        cy.get('.cypress-patient-gestionary-icon')
        cy.get('.cypress-patient-gestionary-text')
        cy.get('.cypress-patient-gestionary-chevron')
        cy.get('.cypress-patient-gestionary').click()
        cy.get('.cypress-patient-recievers')
        cy.get('.cypress-patient-recievers-icon')
        cy.get('.cypress-patient-recievers-text')
        cy.get('.cypress-patient-donors')
        cy.get('.cypress-patient-donors-icon')
        cy.get('.cypress-patient-donors-text')
        cy.get('.cypress-patient-dialyse')
        cy.get('.cypress-patient-dialyse-icon')
        cy.get('.cypress-patient-dialyse-text')
        cy.get('.cypress-patient-tumor')
        cy.get('.cypress-patient-tumor-icon')
        cy.get('.cypress-patient-tumor-text')

        cy.get('.cypress-hospital')
        cy.get('.cypress-hospital-icon')
        cy.get('.cypress-hospital-text')
        cy.get('.cypress-hospital-chevron')
        cy.get('.cypress-hospital').click()
        cy.get('.cypress-map')
        cy.get('.cypress-map-icon')
        cy.get('.cypress-map-text')
        cy.get('.cypress-hospital-dropdown')
        cy.get('.cypress-hospital-dropdown-icon')
        cy.get('.cypress-hospital-dropdown-text')

        cy.get('.cypress-event')
        cy.get('.cypress-event-icon')
        cy.get('.cypress-event-text')
        cy.get('.cypress-event-chevron')
        cy.get('.cypress-event').click()
        cy.get('.cypress-event-calendar')
        cy.get('.cypress-event-calendar-icon')
        cy.get('.cypress-event-calendar-text')
        cy.get('.cypress-event-list')
        cy.get('.cypress-event-list-icon')
        cy.get('.cypress-event-list-text')

        cy.get('.cypress-invitation')
        cy.get('.cypress-invitation-icon')
        cy.get('.cypress-invitation-text')

        cy.get('.cypress-chat')
        cy.get('.cypress-chat-icon')
        cy.get('.cypress-chat-text')
    
    })
})