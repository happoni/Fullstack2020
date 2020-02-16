const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }
]

const singleBlog =
  {
    title: "How to add blogs",
    author: "Hanihani",
    url: "www.fi",
    likes: 1
  }

const singleBlogWithoutLikes =
  {
    title: "No one likes this",
    author: "Deemus",
    url: "nolikes.io"
  }

const singleBlogWithoutTitleOrAuthor =
  {
    url: "www.noname.com",
    likes: 0
  }

const firstBlogLikesUpdated = {
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 99,
}

const nonExistingId = async () => {
  const blog = new Blog({ title: "Poistouhan alla", author: "Hanihani", url: "www.fi", likes: 0 })
  await blog.save()
  await blog.remove()

  return blog.id
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, singleBlog,
  singleBlogWithoutLikes, singleBlogWithoutTitleOrAuthor,
  firstBlogLikesUpdated, nonExistingId, blogsInDB,
  usersInDB,
}