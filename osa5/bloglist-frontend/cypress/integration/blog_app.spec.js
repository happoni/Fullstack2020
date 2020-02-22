describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'corrupted',
      name: 'Darion Mograine',
      password: 'ashbringer'      
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Blogs')
    cy.contains('Please log in')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('corrupted')
      cy.get('#password').type('ashbringer')
      cy.get('#login-button').click()
  
      cy.contains('Darion Mograine logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('corrupted')
      cy.get('#password').type('deathbringer')
      cy.get('#login-button').click()
  
      cy.get('.error')
        .should('contain', 'Wrong username or password')

      cy.get('html').should('not.contain', 'Darion Mograine logged in')
    })
  })

})