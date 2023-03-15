describe('Profile list page', () => {
  it('submits profile form', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.visit('/profile')

    cy.get('[data-test="actions-edit"]').click()
    cy.get('[data-test="dialog-panel"]').should('be.visible')

    cy.get('[data-test="file-input"]').selectFile('cypress/fixtures/profile.jpg', { force: true })
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#telnumber').type('912345678')
    cy.get('#datepicker').click()
    cy.get(`#dp-menu-datepicker [data-test="${new Date('2023-01-05 00:00:00')}"]`).click()
    cy.get('#address').click()
    cy.get('[aria-visible="true"][data-test="map"]').then((el) => {
      const center = { x: Number(el.innerHeight()) / 2, y: Number(el.innerWidth()) / 2 }
      cy.get('[data-test="map"]').click(center.x, center.y)
    })
    cy.get('[data-test="save-location-btn"]').click()
    cy.get('[data-test="password-generate"]').click()
    cy.get('#select-status').click()
    cy.get('[data-test="select-status"] [data-test="list"]').first().find('[data-test="1"]').click()

    cy.get('#select-role').click()
    cy.get('[data-test="select-role"] [data-test="list"]').last().find('[data-test="1"]').click()

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
