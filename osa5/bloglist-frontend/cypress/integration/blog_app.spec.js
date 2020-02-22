describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'corru',
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
})