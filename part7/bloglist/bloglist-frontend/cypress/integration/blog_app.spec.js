describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      userName: 'tester',
      password: 'testingpass',
      name: 'test',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    const user1 = {
      userName: 'newTester',
      password: 'newTesterpass',
      name: 'newTest',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user1)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('.togbtn').contains('Log in').click()
    cy.contains('cancel')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('.togbtn').contains('Log in').click()
      cy.get('#username').type('tester')
      cy.get('#Password').type('testingpass')
      cy.get('.loginbtn').click()
      cy.contains('tester logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('.togbtn').contains('Log in').click()
      cy.get('#username').type('tester')
      cy.get('#Password').type('wrongpass')
      cy.get('.loginbtn').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ userName: 'tester', password: 'testingpass' })
      cy.get('.togbtn').contains('Log in').click()
      cy.get('#username').type('tester')
      cy.get('#Password').type('testingpass')
      cy.get('.loginbtn').click()
    })

    it('Checking create new blog form', function () {
      cy.contains('Create blog').click()
      cy.contains('title')
      cy.contains('cancel')
    })

    it('A blog can be created', function () {
      cy.createBlog({
        title: 'test title',
        author: 'tester',
        url: 'https://testerurl.com',
      })
      cy.get('#blogs').get('.blog').should('exist')
    })

    describe('changes can be made to a blog', function () {
      beforeEach(() => {
        cy.createBlog({
          title: 'test title',
          author: 'tester',
          url: 'https://testerurl.com',
        })
      })

      it('like a blog', function () {
        cy.get('.viewbtn').click()
        cy.get('.likebtn').click()
        cy.contains('1')
      })
    })
  })
})

describe('remove a blog', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      userName: 'tester',
      password: 'testingpass',
      name: 'test',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    const user1 = {
      userName: 'newTester',
      password: 'newTesterpass',
      name: 'newTest',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user1)
    cy.login({ userName: 'tester', password: 'testingpass' })
    cy.createBlog({
      title: 'test title',
      author: 'tester',
      url: 'https://testerurl.com',
    })
    cy.visit('http://localhost:3000')
    cy.get('.togbtn').contains('Log in').click()
    cy.get('#username').type('tester')
    cy.get('#Password').type('testingpass')
    cy.get('.loginbtn').click()
  })

  it('user who created can delete', () => {
    cy.contains('test title by tester').find('.viewbtn').click()
    cy.contains('test title by tester').find('.removebtn').click()
    cy.get('#blogs').should('not.contain', 'test title by tester')
  })

  it('unauthorized user cannot delete a blog', () => {
    cy.get('.logoutbtn').click()
    cy.get('.togbtn').contains('Log in').click()
    cy.login({ userName: 'newTester', password: 'newTesterpass' })
    cy.get('.togbtn').contains('Log in').click()
    cy.get('#username').type('newTester')
    cy.get('#Password').type('newTesterpass')
    cy.get('.loginbtn').click()
    cy.contains('test title by tester').find('.viewbtn').click()
    cy.contains('test title by tester').should('not.contain', 'remove')
  })

})

describe('check the blogs are ordered according to likes', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      userName: 'tester',
      password: 'testingpass',
      name: 'test',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.login({ userName: 'tester', password: 'testingpass' })

    const blog1 = {
      title: 'test1',
      author: 'tester1',
      url: 'www.test1.com',
      likes: 30,
    }
    cy.createBlog(blog1)
    const blog2 = {
      title: 'test2',
      author: 'tester2',
      url: 'www.test2.com',
      likes: 45,
    }
    cy.createBlog(blog2)
    const blog3 = {
      title: 'test3',
      author: 'tester3',
      url: 'www.test3.com',
      likes: 10,
    }
    cy.createBlog(blog3)

    cy.visit('http://localhost:3000')
    cy.get('.togbtn').contains('Log in').click()
    cy.get('#username').type('tester')
    cy.get('#Password').type('testingpass')
    cy.get('.loginbtn').click()
  })

  it('first blog should have maximum likes', () => {
    cy.contains('view').click()
    cy.contains(45)
  })
})
