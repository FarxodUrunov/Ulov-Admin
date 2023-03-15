describe('Clients Settings list page: brandAndModel tab', () => {
  it('creates new brandAndModel', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.visit('/clients/settings#brandAndModel')
    cy.get('[data-test="table-header-add"]').click()
    cy.get('[data-test="file-input"]').selectFile('cypress/fixtures/company.jpg', { force: true })
    cy.get('#carModel').type('Chevrolet', { force: true })
    cy.get('[data-test="setting-model-form"]')
      .submit()
      .then(() => {
        expect(stub.getCall(0).args[0]).to.equal(
          `{"models":[8,9,10],"photo":{"id":83194,"name":"company.jpg","size":83194,"path":"https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},"car_model":"Chevrolet"}`
        )
      })
  })
})
