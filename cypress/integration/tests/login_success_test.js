describe('Login Test Success', () => {
    it('Tries to login should succeed', () => {
      cy.visit('http://localhost:8080/')
      cy.get('.action-to-register').click()
      cy.get('.action-to-login').click()
      cy.get('.action-email')
      .type('saber@saber.com')
      .should('have.value', 'saber@saber.com')  
      cy.get('.action-password')
      .type('saber')
      .should('have.value', 'saber')  
  
      cy.get('.action-login').click()
      cy.url().should('eq', 'http://localhost:8080/')
      cy.getCookie("token").should('not.be.null')
      })
  })