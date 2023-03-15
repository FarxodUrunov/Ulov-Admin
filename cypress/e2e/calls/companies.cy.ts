describe('Calls companies page', () => {
  it('visible Calls companies page', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.visit('/calls/companies')
    cy.get('[role="tablist"]').should('be.visible')
  })

  it('Car service', () => {
    cy.get('[data-test="car-service"] [data-test="filter-button"]').click()
    cy.get('[data-test="car-service"] [data-test="filters-section"]').should('be.visible')

    cy.get('[data-test="car-service"] [data-test="table-header-add"]').click()

    cy.get('[data-test="car-service-form"] input[id="select-company-name-id"]').click({
      force: true
    })
    cy.get('[data-test="car-service-form"] [data-test="list"]')
      .first()
      .find('[data-test="2"]')
      .click({ force: true })

    cy.get('[data-test="car-service-form"] input[type="tel"]').type('979959498')

    cy.get('[data-test="car-service-form"] input[name="price"]').type('15000', { force: true })

    cy.get('[data-test="car-service-form"] input[name="select-payment-method"]').click({
      force: true
    })
    cy.get('[data-test="car-service-form"] [data-test="list"]')
      .last()
      .find('[data-test="0"]')
      .click({ force: true })

    cy.get(`[data-test="car-service-form"] input[name="datepicker"]`).click({ force: true })
    cy.get(`#dp-menu-datepicker [data-test="${new Date('2023-01-20 00:00:00')}"]`).click()

    cy.get('[data-test="car-service-form"] #address').click({ force: true })
    cy.get('[aria-visible="true"][data-test="map"]').then((el) => {
      const center = { x: Number(el.innerHeight()) / 2, y: Number(el.innerWidth()) / 2 }
      cy.get('[data-test="map"]').click(center.x, center.y)
    })
    cy.get('[data-test="save-location-btn"]').click()

    cy.get('[data-test="car-service-form"] input[name="arrival-time"]').type('40 min', {
      force: true
    })

    cy.get('[data-test="car-service-form"] textarea[data-test="textarea"]').type(
      'Salom xammaga qalesilar',
      {
        force: true
      }
    )
    cy.get('[data-test="dialog-footer"] [data-test="confirm-button"]').click()
    cy.get('[data-test="dialog-footer"] [data-test="cancel-button"]').click()
  })

  it('Tow truck', () => {
    cy.get('[data-test="tab-1"]').click()

    cy.get('[data-test="tow-truck"] [data-test="filter-button"]').click()
    cy.get('[data-test="tow-truck"] [data-test="filters-section"]').should('be.visible')

    cy.get('[data-test="tow-truck"] [data-test="table-header-add"]').click()

    cy.get('[data-test="tow-truck-form"] input[id="select-company-name-id"]').click({
      force: true
    })
    cy.get('[data-test="tow-truck-form"] [data-test="list"]')
      .first()
      .find('[data-test="0"]')
      .click({ force: true })

    cy.get('[data-test="tow-truck-form"] input[type="tel"]').type('939959498')

    cy.get(`[data-test="tow-truck-form"] input[name="datepicker"]`).click({ force: true })
    cy.get(`#dp-menu-datepicker [data-test="${new Date('2023-01-21 00:00:00')}"]`).click()

    cy.get('[data-test="tow-truck-form"] input[name="select-vehicle-type"]').click({
      force: true
    })
    cy.get('[data-test="tow-truck-form"] [id="select-select-vehicle-type-id-0"]').click({
      force: true
    })

    cy.get('[data-test="tow-truck-form"] input[name="price"]').type('25 000', { force: true })

    cy.get('[data-test="tow-truck-form"] input[name="select-payment-method"]').click({
      force: true
    })
    cy.get('[data-test="tow-truck-form"] [data-test="list"]')
      .last()
      .find('[data-test="2"]')
      .click({ force: true })

    cy.get('[data-test="tow-truck-form"] #address').click({ force: true })
    cy.get('[aria-visible="true"][data-test="map"]').then((el) => {
      const center = { x: Number(el.innerHeight()) / 2, y: Number(el.innerWidth()) / 2 }
      cy.get('[data-test="map"]').click(center.x, center.y)
    })
    cy.get('[data-test="save-location-btn"]').click()

    cy.get('[data-test="tow-truck-form"] textarea[data-test="textarea"]').type(
      'Salom xammaga qalesilar',
      {
        force: true
      }
    )
    cy.get('[data-test="dialog-footer"] [data-test="confirm-button"]').click()
    cy.get('[data-test="dialog-footer"] [data-test="cancel-button"]').click()
  })
})
