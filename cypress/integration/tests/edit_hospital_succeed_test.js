describe('Edit hospital sucesss', () => {
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

      cy.wait(10000)

      cy.get('.cypress-to-hospitals-edit-1').click();
  
      cy.url().should('eq', 'http://organia.savatier.fr/hospitals/edit/1')
  
      cy.get('.cypress-name').clear() 
      cy.get('.cypress-city').clear()
      cy.get('.cypress-department').clear()
      cy.get('.cypress-phone-number').clear()

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
  
      cy.url().should('eq', 'http://organia.savatier.fr/hospitals')
    })
  })