var number = Math.floor(Math.random() * 9000000000) + 1000000000;

describe('Add hospital success', () => {
    it('Tries to open modal in the receiver panel should succeed', () => {
      cy.visit('http://organia.francecentral.cloudapp.azure.com/')  
      cy.get('.cypress-to-register').click()

      cy.get('.cypress-to-login').click()
      
      cy.get('.cypress-email')
        .type('saber@saber.com')
        .should('have.value', 'saber@saber.com')
  
      cy.get('.cypress-password')
        .type('saber')
        .should('have.value', 'saber')
    
      cy.get('.cypress-login').click()
      cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/') 
      cy.getCookie("token").should('not.be.null')
  
      cy.get('.cypress-to-hospitals').click();
  
      cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/hospitals')  
      cy.get('.cypress-to-hospitals-add').click();
  
      cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/hospitals/add')  
      cy.get('.cypress-name')
        .type('Hopital TEST')
        .should('have.value', 'Hopital TEST')
    
      cy.get('.cypress-city')
        .type('CITY TEST')
        .should('have.value', 'CITY TEST')

      cy.get('.cypress-department')
        .type('DEPARTMENT TEST')
        .should('have.value', 'DEPARTMENT TEST')

      cy.get('.cypress-phone-number')
        .type(number)
        .should('have.value', number)
    
      cy.get('.cypress-add').click();
      
      cy.wait(5000);
  
      cy.url().should('eq', 'http://organia.francecentral.cloudapp.azure.com/hospitals')
    })
  })