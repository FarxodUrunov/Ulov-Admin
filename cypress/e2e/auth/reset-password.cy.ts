describe('Auth reset-password page', () => {
  it('navigate to login page', () => {
    cy.visit('/auth/reset-password')
    cy.get('[data-test="navigate-back"]').click()
    cy.url().should('eq', 'http://localhost:4173/auth/login')
  })

  it('visits reset page', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.visit('/auth/reset-password')
    cy.get('#telId').type('941234567')
    cy.get('[data-test="reset-submit-btn"]')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(`{"tel_number":"+998941234567"}`)
      })
    cy.url().should('eq', 'http://localhost:4173/auth/confirm')
  })
})
