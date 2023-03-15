describe('Subscription page', () => {
  beforeEach(() => {
    cy.visit('/subscriptions/statistics')
  })

  it('statistics card click', () => {
    cy.get('[data-test="statistics-card-2"]').click().should('have.class', 'bg-blue-500')
    cy.get('[data-test="statistics-card-1"]').should('have.class', 'bg-white')

    cy.get('[data-test="statistics-card-1"]').click().should('have.class', 'bg-blue-500')
    cy.get('[data-test="statistics-card-2"]').should('have.class', 'bg-white')
  })

  it('filter button click', () => {
    cy.contains('[data-test="filter-button"]', 'Фильтр').click()
    cy.get('[data-test="filters-section"]').should('be.visible')
    cy.contains('[data-test="filter-button"]', 'Фильтр').click()
  })
})
