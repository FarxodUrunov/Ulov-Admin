describe('Auth send page', () => {
  it('navigate to confirm page', () => {
    cy.visit('/auth/send')
    cy.get('[data-test="navigate-back"]').click()
    cy.url().should('eq', 'http://localhost:4173/auth/confirm')
  })

  it('save new password', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.visit('/auth/send')
    cy.get('#passwordId').type('paSS1234#')
    cy.get('#confirmpasswordId').type('paSS1234#')
    cy.get('[data-test="send-submit-btn"]')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          `{"password":"paSS1234#","confirm_password":"paSS1234#"}`
        )
      })
  })
})
