describe('Users show page', () => {
  it('checks users data', () => {
    cy.visit('/settings/users/show/1')

    cy.get('[data-test="sectionInfo-image"]').should(
      'have.attr',
      'src',
      'https://images.pexels.com/photos/13986931/pexels-photo-13986931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    )
    cy.get('[data-test="header"]').should('have.text', 'Абдулазиз Абдуқаххоров')
    cy.get('td[data-test="key"]').should('have.length', 6)
    cy.get('td[data-test="value"]').should('have.length', 6)

    cy.get('td[data-test="key"]').first().should('have.text', 'Номер телефона:')
    cy.get('td[data-test="value"]').first().should('have.text', '+998901234567')

    cy.get('td[data-test="key"]').last().should('have.text', 'Статус:')
    cy.get('td[data-test="value"]').last().should('have.text', 'Актив')
  })

  it('deletes user', () => {
    cy.visit('/settings/users/show/1')
    cy.get('[data-test="actions-delete"]').click()
    cy.get('[data-test="dialog-panel"]').should('be.visible')
    cy.get('[data-test="dialog-header"]').should('have.text', 'Удалить')
  })
})
