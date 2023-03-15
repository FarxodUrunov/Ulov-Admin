describe('Roles page', () => {
  it('visits the roles list page', () => {
    cy.visit('/settings/roles')
    cy.contains('[data-test="link-to-create"]', 'Добавить')
  })

  it('redirects to role create page', () => {
    cy.visit('/settings/roles')
    cy.get('[data-test="link-to-create"]').click()

    cy.url().should('include', '/settings/roles/create')
  })

  it('submits role create form', function () {
    cy.visit('/settings/roles/create')
    cy.fixture('settings/role').then((data: any) => {
      cy.get('#role').type(data.role, { force: true })
      cy.get('#description').type(data.description, { force: true })
    })

    cy.get('[data-test="permissions-table"] thead input[type="checkbox"]')
      .first()
      .check({ force: true })
    cy.get('[data-test="permissions-table"] thead input[type="checkbox"]')
      .last()
      .check({ force: true })

    cy.get('#permission-search').type('roles', { force: true })
  })
})
