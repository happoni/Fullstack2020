const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('basic api returns', () => {
  test('blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })

  test('correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
})

describe('blogs have correct format in', () => {
  test('field id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('adding blogs', () => {
  test('is possible', async () => {
    await api
      .post('/api/blogs')
      .send(helper.singleBlog)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'How to add blogs'
    )
  })

  test('without likes will set likes to zero', async () => {
    await api
      .post('/api/blogs')
      .send(helper.singleBlogWithoutLikes)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    const likes = blogsAtEnd.map(b => b.likes)
    expect(likes[blogsAtEnd.length - 1]).toBe(0)
  })

  test('without title or author will return bad request', async () => {
    await api
      .post('/api/blogs')
      .send(helper.singleBlogWithoutTitleOrAuthor)
      .expect(400)
  })
})

describe('editing database', () => {
  test('by removing blog by id removes blog', async () => {
    const blogs = await helper.blogsInDB()
    const firstId = blogs[0].id

    await api
      .delete(`/api/blogs/${firstId}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd.length).toBe(5)
  })

  test('by updating likes of blog returns new amount of likes', async () => {
    const blogs = await helper.blogsInDB()
    const firstId = blogs[0].id

    await api
      .put(`/api/blogs/${firstId}`)
      .send(helper.firstBlogLikesUpdated)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd[0].likes).toBe(99)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'salainen' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'deemus',
      name: 'Dee Mus',
      password: 'hyshys',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salaisuus',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})