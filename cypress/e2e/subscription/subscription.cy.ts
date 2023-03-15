describe('Subscription page', () => {
  it('visits the subscription page', () => {
    cy.visit('/subscriptions')
    cy.contains('[data-test="subscription-e2e"]', 'Добавить')
  })

  it('open the add subscription modal', () => {
    cy.contains('[data-test="subscription-e2e"]', 'Добавить').click()
    cy.get('[data-test="subscription-modal"]').contains('Добавить тарыф')
    cy.get('input').should('have.value', '')
  })

  it('fill out the form', () => {
    cy.get('input[name="tariffName"]').type('Gold').should('have.value', 'Gold')

    cy.get('input[name="price"]').type('250 000').should('have.value', '250 000')
    cy.get('input[name="time"]').click()
    cy.contains('[data-test="0"]', 'John').click()

    cy.get('[data-test="add-button"]').click()
    cy.get('input[name="features[0].feature_name"]').type('Plus').should('have.value', 'Plus')

    cy.get('input[name="features[0].feature"]').click({ force: true })
    cy.contains('Select All').click()
    cy.get('[data-test="confirm-button"]').click()
  })

  it('delete dynamic form', () => {
    cy.get('[data-test="add-button"]').click()
    cy.get('[data-test="features"]').should('have.length', 2)

    cy.get('[data-test="delete-button-1"]').click()
  })

  it('close the add subscription modal', () => {
    cy.get('[data-test="cancel-button"]').click()
    cy.get('input').should('have.value', '')
  })
})
