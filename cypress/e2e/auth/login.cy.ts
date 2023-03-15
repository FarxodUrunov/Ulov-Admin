describe('Auth login page', () => {
  it('visits login page', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.visit('/auth/login')
    cy.get('#telId').type('941234567')
    cy.get('#passwordId').type('pass1234')
    cy.get('#authcheckbox').click()
    cy.get('[data-test="login-submit-btn"]')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          `{"tel_number":"+998941234567","password":"pass1234","remember_me":true}`
        )
      })
  })

  it('navigate to reset-password page', () => {
    cy.visit('/auth/login')
    cy.get('[data-test="login-link"]').click()
    cy.url().should('eq', 'http://localhost:4173/auth/reset-password')
  })
})
