describe('Add hospital success', () => {
    it('Tries to open modal in the receiver panel should succeed', () => {
      cy.visit('http://organia.savatier.fr/')
  
      cy.get('.cypress-to-register').click()

      cy.get('.cypress-to-login').click()
  
      cy.get('.cypress-email')
        .type('saber@saber.com')
        .should('have.value', 'saber@saber.com')
  
      cy.get('.cypress-password')
        .type('saber')
        .should('have.value', 'saber')
  
      cy.get('.cypress-login').click()
  
      cy.url().should('eq', 'http://organia.savatier.fr/')
  
      cy.getCookie("token").should('not.be.null')
  
      cy.get('.cypress-to-hospitals').click();
  
      cy.url().should('eq', 'http://organia.savatier.fr/hospitals')
  
      cy.get('.cypress-to-hospitals-add').click();
  
      cy.url().should('eq', 'http://organia.savatier.fr/hospitals/add')
  
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
        .type('0623049589')
        .should('have.value', '0623049589')
    
      cy.get('.cypress-add').click();
      
      cy.wait(5000);
  
      cy.url().should('eq', 'http://organia.savatier.fr/hospitals')
    })
  })