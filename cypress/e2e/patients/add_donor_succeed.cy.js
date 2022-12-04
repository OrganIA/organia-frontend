
describe('Add donor success', () => {
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

    cy.get('.cypress-patient').click()
    cy.get('.cypress-to-donors').click()
    cy.url().should('eq', Cypress.config().baseUrl + 'donors')

    cy.get('.cypress-add-donor').click()

    cy.get('.cypress-first-name-donor')
      .type('Alan')
      .should('have.value', 'Alan')

    cy.get('.cypress-last-name-donor')
      .type('Dubois')
      .should('have.value', 'Dubois')

    cy.get('.cypress-birth-date-donor')
      .type('2000-08-10')
      .should('have.value', '2000-08-10')

    cy.get('.cypress-organ-donor')
      .select('HEART')
      .should('have.value', 'HEART')

   cy.get('.cypress-admission-date-donor')
      .type('2021-06-22')
      .should('have.value', '2021-06-22')
    
    cy.get('.cypress-tumors-number-donor')
      .clear()
      .type('0')
      .should('have.value', '0')
    
    cy.get('.cypress-is-dialyse-donor')
      .select('true')
      .should('have.value', 'true')

    cy.get('.cypress-is-retransplantation-donor')
      .select('false')
      .should('have.value', 'false')
    
    cy.get('.cypress-beginning-dialyse-donor')
      .type('2021-06-22')
      .should('have.value', '2021-06-22')

    cy.get('.cypress-end-dialyse-donor')
      .type('2000-08-22')
      .should('have.value', '2000-08-22')

    cy.get('.cypress-description-donor')
      .type('Patient a besoin de coeur rapidement')
      .should('have.value', 'Patient a besoin de coeur rapidement')

    cy.get('.cypress-blood-donor')
      .select('A')
      .should('have.value', 'A')

    cy.get('.cypress-rhesus-donor')
      .select('+')
      .should('have.value', '+')

    cy.get('.cypress-gender-donor')
      .select('MALE')
      .should('have.value', 'MALE')

    cy.get('.cypress-note-donor')
      .type('RAS')
      .should('have.value', 'RAS')

    cy.intercept({ method: 'POST', url: '**/listings' }).as('listing')
    cy.intercept({ method: 'POST', url: '**/persons' }).as('person')
    cy.intercept({ method: 'GET', url: '**/listings/donors' }).as('donors')
    cy.get('.cypress-add-this-donor').click();

    cy.wait('@listing', { timeout: 20000 }).its('response.statusCode').should('equal', 307)
    cy.wait('@listing', { timeout: 20000 }).its('response.statusCode').should('equal', 200)
    cy.wait('@person', { timeout: 20000 }).its('response.statusCode').should('equal', 307)
    cy.wait('@person', { timeout: 20000 }).its('response.statusCode').should('equal', 201)
    cy.wait('@donors', { timeout: 20000 }).its('response.statusCode').should('equal', 200)  

    cy.get('.cypress-donor-list')
  })
})