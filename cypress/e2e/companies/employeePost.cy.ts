describe('tests creating and updating employee', () => {
  it('creates employee', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.visit('/companies/show/1/employees')

    cy.get('[data-test="showModal"]').click()
    cy.get('[data-test="dialog-panel"]').should('be.visible')

    cy.get('[data-test="file-input"]').selectFile('cypress/fixtures/profile.jpg', { force: true })
    cy.get('#firstName').type('John', { force: true })
    cy.get('#lastName').type('Doe', { force: true })
    cy.get('#telnumber').type('912345678', { force: true })
    cy.get('#datepicker').click({ force: true })
    cy.get(`#dp-menu-datepicker [data-test="${new Date('2023-01-05 00:00:00')}"]`).click()
    cy.get('#address').click({ force: true })
    cy.get('[aria-visible="true"][data-test="map"]').then((el) => {
      const center = { x: Number(el.innerHeight()) / 2, y: Number(el.innerWidth()) / 2 }
      cy.get('[data-test="map"]').click(center.x, center.y)
    })
    cy.get('[data-test="save-location-btn"]').click()
    cy.get('[data-test="password-generate"]').click()
    cy.get('#select-status').click({ force: true })
    cy.get('[data-test="select-status"] [data-test="list"]').first().find('[data-test="1"]').click()

    cy.get('#select-role').click({ force: true })
    cy.get('[data-test="select-role"] [data-test="list"]').last().find('[data-test="1"]').click()

    cy.get('#select-service').click({ force: true })
    cy.get('[data-test="select-service"] [data-test="list"]').last().find('[data-test="1"]').click()

    cy.get('#select-branch').click({ force: true })
    cy.get('[data-test="select-branch"] [data-test="list"]').last().find('[data-test="1"]').click()

    cy.get('[data-test="profile-form"]')
      .submit()
      .then(() => {
        const payload = JSON.parse(stub.getCall(0).args[0])
        expect(payload).to.have.property('first_name', 'John')
        expect(payload).to.have.property('last_name', 'Doe')
        expect(payload).to.have.property('tel_number', '+998912345678')
      })
  })
})
