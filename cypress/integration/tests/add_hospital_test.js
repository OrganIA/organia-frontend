describe('Add receiver', () => {
    it('Tries to open modal in the receiver panel should succeed', () => {
      cy.visit('http://localhost:8080/')
  
      cy.get('.cypress-to-register').click()
  
      cy.get('.cypress-to-login').click()
  
      cy.get('.cypress-email')
        .type('nicolas.yapobi@epitech.eu')
        .should('have.value', 'nicolas.yapobi@epitech.eu')
  
      cy.get('.cypress-password')
        .type('string')
        .should('have.value', 'string')
  
      cy.get('.cypress-login').click()
  
      cy.url().should('eq', 'http://localhost:8080/')
  
      cy.getCookie("token").should('not.be.null')
  
      cy.get('.cypress-to-hospitals').click();
  
      cy.url().should('eq', 'http://localhost:8080/hospitals')
  
      cy.get('.cypress-to-hospitals-add').click();
  
      cy.url().should('eq', 'http://localhost:8080/hospitals/add')
  
      cy.get('.cypress-name')
        .type('Hopital Robert Ballanger')
        .should('have.value', 'Hopital Robert Ballanger')
    
      cy.get('.cypress-city')
        .type('Aulnay-sous-bois')
        .should('have.value', 'Aulnay-sous-bois')

      cy.get('.cypress-department')
        .type('93')
        .should('have.value', '93')

      cy.get('.cypress-phone-number')
        .type('0623049589')
        .should('have.value', '0623049589')
    
      cy.get('.cypress-add').click();
  
      cy.url().should('eq', 'http://localhost:8080/hospitals')
    })
  })