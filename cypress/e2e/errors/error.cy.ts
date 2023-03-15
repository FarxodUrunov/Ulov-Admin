describe('Error pages', () => {
  it('visits 401 page', () => {
    cy.visit('/401')
    cy.get('img').should('have.attr', 'src', '/src/shared/assets/img/401.svg')
    cy.get('[data-test="error-type"]').should('contain', '401')
    cy.get('[data-test="error-title"]').should('contain', 'ошибка несанкционированный')
    cy.get('[data-test="error-desc"]').should(
      'contain',
      'Запрос завершился неудачно, так как он не содержал действительной аутентификационной информации для целевого ресурса.'
    )
    cy.get('[data-test="navigate-home"]').click()
    cy.url().should('eq', 'http://localhost:4173/')
  })

  it('visits 403 page', () => {
    cy.visit('/403')
    cy.get('img').should('have.attr', 'src', '/src/shared/assets/img/403.svg')
    cy.get('[data-test="error-type"]').should('contain', '403')
    cy.get('[data-test="error-title"]').should('contain', 'Доступ запрещен')
    cy.get('[data-test="error-desc"]').should(
      'contain',
      'Доступ к этому ресурсу на сервере запрещен'
    )
    cy.get('[data-test="navigate-home"]').click()
    cy.url().should('eq', 'http://localhost:4173/')
  })

  it('visits 404 page', () => {
    cy.visit('/404')
    cy.get('img').should('have.attr', 'src', '/src/shared/assets/img/404.svg')
    cy.get('[data-test="error-type"]').should('contain', '404')
    cy.get('[data-test="error-title"]').should('contain', 'Извините! Страница не найдена')
    cy.get('[data-test="error-desc"]').should(
      'contain',
      'Страница, которую вы ищете, не существует. Возможно, он был перемещен или удален.'
    )
    cy.get('[data-test="navigate-home"]').click()
    cy.url().should('eq', 'http://localhost:4173/')
  })

  it('visits 500 page', () => {
    cy.visit('/500')
    cy.get('img').should('have.attr', 'src', '/src/shared/assets/img/500.svg')
    cy.get('[data-test="error-type"]').should('contain', '500')
    cy.get('[data-test="error-title"]').should('contain', 'Внутренняя ошибка сервера')
    cy.get('[data-test="error-desc"]').should(
      'contain',
      'Сервер столкнулся с непредвиденной ситуацией, из-за которой он не смог выполнить запрос'
    )
    cy.get('[data-test="navigate-home"]').click()
    cy.url().should('eq', 'http://localhost:4173/')
  })
})
