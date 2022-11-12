var number = Math.floor(Math.random() * 9000000000) + 1000000000;

describe('Add hospital success', () => {
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
  
      cy.get('.cypress-hospital').click();
      cy.get('.cypress-hospital-dropdown').click()
      cy.url().should('eq', Cypress.config().baseUrl + 'hospitals')
  
      cy.get('.cypress-to-hospitals-add').click()
  
      cy.get('.cypress-hospital-name')
        .type('Hopital Des Fleurs')
        .should('have.value', 'Hopital Des Fleurs')
    
      cy.get('.cypress-hospital-city')
        .type('CANNES')
        .should('have.value', 'CANNES')

      cy.get('.cypress-hospital-department')
        .type('06400')
        .should('have.value', '06400')

      cy.get('.cypress-hospital-phone-number')
        .type('04 59 35 62 00')
        .should('have.value', '04 59 35 62 00')
    
      cy.get('.cypress-hospital-add').click()

      cy.get('.cypress-hospital-check').contains('Hopital Des Fleurs')
        
    })
  })