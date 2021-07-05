describe('Login Test', () => {
  it('Visits the login page', () => {
    cy.visit('http://localhost:8080/login')
    cy.get('email')
    .type('fake@email.com')
    .should('have.value', 'fake@email.com')  
    cy.contains('Se connecter')
  })
})