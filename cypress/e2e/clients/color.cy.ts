describe('Clients Settings list page: color tab', () => {
  it('creates new color', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.visit('/clients/settings#color')
    cy.get('[data-test="table-header-add"]').click()
    cy.get('#colorName').type('Белый', { force: true }).trigger('keydown', { key: 'Enter' })
    cy.get('#colorName').type('Серый', { force: true }).trigger('keydown', { key: 'Enter' })
    cy.get('#colorName').type('Черный', { force: true }).trigger('keydown', { key: 'Enter' })
    cy.get('[data-test="confirm-button"]')
      .click()
      .then(() => expect(stub.getCall(0).args[0]).to.equal(`{"colours":[8,9,10]}`))
  })
})
