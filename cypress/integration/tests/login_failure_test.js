describe('Login Test Failure', () => {
  it('Tries to login should fail', () => {
    cy.visit('http://localhost:8080/')
    cy.get('.action-to-register').click()
    cy.get('.action-to-login').click()
    cy.get('.action-email')
    .type('jexistePasWsh@cypress.com')
    .should('have.value', 'jexistePasWsh@cypress.com')  
    cy.get('.action-password')
    .type('caca')
    .should('have.value', 'caca')  

    cy.get('.action-login').click()
    cy.url().should('eq', 'http://localhost:8080/login')
    cy.getCookie("token").should('be.null')
    })
})