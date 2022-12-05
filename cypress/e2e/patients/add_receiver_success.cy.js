
describe('Add receiver success', () => {
  it('Tries to add a receiver should succeed', () => {
    cy.visit(Cypress.config().baseUrl)

    cy.get('.cypress-to-login').click()

    cy.get('.cypress-email')
      .type('saber@saber.com')
      .should('have.value', 'saber@saber.com')

    cy.get('.cypress-password')
      .type('saber')
      .should('have.value', 'saber')

    cy.intercept({ method: 'POST', url: '**/auth' }).as('login')
    cy.get('.cypress-submit-login').click()
    cy.wait('@login', { timeout: 20000 })

    cy.url().should('eq', `${Cypress.config().baseUrl}landing`)
    cy.getCookie("token").should('not.be.null')

    cy.get('#patients').click();
    cy.get('.cypress-to-receivers').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}receivers`)

    cy.get('.cypress-new-modal.is-invisible')

    cy.get('.cypress-to-add').click();

    cy.get('.cypress-new-modal.is-active')

    cy.get('.cypress-new-close').click();

    cy.get('.cypress-new-modal.is-invisible')

    cy.get('.cypress-to-add').click();

    cy.get('.cypress-new-modal.is-active')

    cy.get('.cypress-new-first-name')
      .type('Patient first name')
      .should('have.value', 'Patient first name')

    cy.get('.cypress-new-last-name')
      .type('Patient last name')
      .should('have.value', 'Patient last name')

    cy.get('.cypress-new-birth-date')
      .type('2000-10-22')
      .should('have.value', '2000-10-22')

    cy.get('.cypress-new-organ')
      .select('HEART')
      .should('have.value', 'HEART')

    cy.get('.cypress-new-admission-date')
      .type('2000-10-22')
      .should('have.value', '2000-10-22')

    cy.get('.cypress-new-tumors-number')
      .clear()
      .type('3')
      .should('have.value', '3')

    cy.get('.cypress-new-is-dialyse')
      .select('true')
      .should('have.value', 'true')

    cy.get('.cypress-new-is-retransplantation')
      .select('false')
      .should('have.value', 'false')

    cy.get('.cypress-new-beginning-dialyse')
      .type('2000-10-22')
      .should('have.value', '2000-10-22')

    cy.get('.cypress-new-end-dialyse')
      .type('2000-10-22')
      .should('have.value', '2000-10-22')

    cy.get('.cypress-new-description')
      .type('Une description')
      .should('have.value', 'Une description')

    cy.get('.cypress-new-blood')
      .select('A')
      .should('have.value', 'A')

    cy.get('.cypress-new-rhesus')
      .select('+')
      .should('have.value', '+')

    cy.get('.cypress-new-gender')
      .select('MALE')
      .should('have.value', 'MALE')

    cy.get('.cypress-new-notes')
      .type('Des notes')
      .should('have.value', 'Des notes')

    cy.intercept({ method: 'POST', url: '**/listings' }).as('listing')
    cy.intercept({ method: 'POST', url: '**/persons' }).as('person')
    cy.intercept({ method: 'GET', url: '**/listings/receivers' }).as('receivers')
    cy.get('.cypress-new-add').click();
    cy.wait('@listing', { timeout: 20000 }).its('response.statusCode').should('equal', 307)
    cy.wait('@listing', { timeout: 20000 }).its('response.statusCode').should('equal', 200)
    cy.wait('@person', { timeout: 20000 }).its('response.statusCode').should('equal', 307)
    cy.wait('@person', { timeout: 20000 }).its('response.statusCode').should('equal', 201)
    cy.wait('@receivers', { timeout: 20000 }).its('response.statusCode').should('equal', 200)
  })
})