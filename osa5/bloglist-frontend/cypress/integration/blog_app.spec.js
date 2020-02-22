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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: "corrupted", password: "ashbringer" })
      cy.createBlog({ title: "Automated blog creating", author: "A. U. Tomat", url: "www.automat.ed"})
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('How to create blogs with Cypress')
      cy.get('#author').type('Deemus')
      cy.get('#url').type('www.cypressblogs.com')
      cy.get('#add-button').click()
      cy.contains('How to create blogs with Cypress')
    })

    it('A blog can be liked', function() {
      cy.contains('Automated blog creating')
        .get('#show-button')
        .click()
        .get('#like-button')
        .click()        
        
      cy.contains('Automated blog creating')
        .contains('Likes: 1')        
    })
  })

})