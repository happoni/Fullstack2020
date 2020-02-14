const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

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
})



afterAll(() => {
  mongoose.connection.close()
})