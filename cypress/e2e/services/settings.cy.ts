describe('Setting page', () => {
  beforeEach(() => {
    cy.visit('/services/settings')
  })

  it('visible Setting page', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.get('[data-test="services-settings-title"]').should('be.visible')
    cy.get('[data-test="filter-button"]').click()
    cy.get('[data-test="apply-filters"]').should('be.visible')
    cy.get('[data-test="filter-button"]').click()
  })

  it('submits add button modal form', () => {
    cy.get('[data-test="table-header-add"]').click()
    cy.get('[data-test="dialog-panel"]').should('be.visible')

    cy.get('[data-test="confirm-button"]').click()

    cy.get('[data-test="file-input"]').selectFile('cypress/fixtures/profile.jpg', { force: true })

    cy.get('input[name="service"]').click({ force: true })
    cy.contains('[data-test="1"]', 'Эвакуатор').click()

    cy.get('input[name="serviceName"]').type('Двигатель', { force: true })

    cy.get('input[name="subServices"]').type('Замена масло фильтра{enter}', { force: true })
    cy.get('input[name="subServices"]').type('Ремень ГРМ{enter}', { force: true })
    cy.get('input[name="subServices"]').type('Свечи зажигания{enter}', { force: true })
    cy.get('input[name="subServices"]').type('Поршень {enter}', { force: true })
  })
})
