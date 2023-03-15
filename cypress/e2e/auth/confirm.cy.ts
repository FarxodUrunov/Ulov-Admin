describe('Auth confirm page', () => {
  it('navigate to reset-password page', () => {
    cy.visit('/auth/confirm')
    cy.get('[data-test="navigate-back"]').click()
    cy.url().should('eq', 'http://localhost:4173/auth/reset-password')
  })

  it('submit confirmation code', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.visit('/auth/confirm')
    cy.get('[data-test="1"]').type('1')
    cy.get('[data-test="2"]').type('2')
    cy.get('[data-test="3"]').type('3')
    cy.get('[data-test="4"]').type('4')
    cy.get('[data-test="5"]').type('5')
    cy.get('[data-test="6"]').type('6')
    cy.get('[data-test="confirm-submit-btn"]')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(`123456`)
      })
    cy.url().should('eq', 'http://localhost:4173/auth/send')
  })
})
