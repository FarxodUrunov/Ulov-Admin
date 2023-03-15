describe('Notifications page', () => {
  beforeEach(() => {
    cy.visit('/notifications')
  })

  it('click the do not disturb', () => {
    cy.get('[data-test="switch"]').should('have.class', 'bg-gray-dark')
    cy.get('[aria-checked="false"]').should('be.visible')
    cy.get('[data-test="doNotDisturb"]').click()
    cy.get('[data-test="switch"]').should('have.class', 'bg-primary')
    cy.get('[aria-checked="false"]').should('not.be.visible')
    cy.get('[aria-checked="true"]').should('be.visible')
  })
})
