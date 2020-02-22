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
      cy.createBlog({ title: "Not so fun stuff", author: "Boring Panda", url: "www.meh.de"})
      cy.createBlog({ title: "Most hyped blogs", author: "Coolio", url: "www.bestblogs.eu"})
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

    it('An own blog can be removed', function() {
      cy.contains('Automated blog creating')
        .get('#show-button')
        .click()

      cy.contains('Automated blog creating')
        .get('#remove-button')
        .click()

      cy.contains('Blog was deleted')
      cy.get('html').should('not.contain', 'Automated blog creating')
    })

    
    it.only('Blogs shall be ordered by likes', function() {
      // Annetaan muutamat tykkäykset
      cy.contains('Coolio').find('#show-button').click()  
      cy.contains('Coolio').find('#like-button').click()
      cy.wait(1000)
      cy.contains('A. U. Tomat').find('#show-button').click() 
      cy.contains('A. U. Tomat').find('#like-button').click()
      cy.wait(1000)
      cy.contains('Coolio').find('#like-button').click()
      cy.wait(1000)
      
      // hae kaikki blogit ja tutki niiden järkkää...
      cy.get('[id="blog-div"]').then( blogs => {
        console.log('amount of blogs', blogs.length)
        cy.wrap(blogs[0]).should('contain', 'Coolio')
        cy.wrap(blogs[1]).should('contain', 'A. U. Tomat')
        cy.wrap(blogs[2]).should('contain', 'Boring Panda')
      })
    })
  })
})